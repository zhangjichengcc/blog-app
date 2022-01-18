/*
 * @Author: your name
 * @Date: 2021-12-23 20:19:17
 * @LastEditTime: 2022-01-18 18:10:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\AllFiles\index.tsx
 */

import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { Table, Input } from 'antd';
import FilesTable from './components/FilesTable';
import HistoryBar from '../components/HistoryBar';
import FileIcon, { getFileType } from '../components/FileIcon';
import ColumnsName from './components/ColumnsName';
import { getDistMenu } from '@/services/cloudDist';
import BreadCrumbNode from 'utils/BreadCrumbNode';

import styles from './index.less';

const AllFiles: FC<any> = (props) => {
  const { cRef, onHistoryChange, onSelectedChange } = props;

  const HistoryBarRef = useRef(null);

  const [fileList, setFileList] = useState<fileDataProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [newDirectory, setNewDirectory] = useState({
    id: '_new',
    name: '新建文件夹',
    size: 0,
    type: 'directory',
    createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
  });
  const [currentNode, setCurrentNode] = useState<BreadCrumbNode>();
  const [historyList, setHistoryList] = useState<BreadCrumbNode[]>([]);

  /**
   * 调用 HistoryBar 内部方法 添加记录
   * @param node
   */
  function push(node: BreadCrumbNode) {
    const { current }: { current: any } = HistoryBarRef;
    current?.push?.(node);
  }

  // 添加历史记录
  async function addHistory(node: BreadCrumbNode) {
    const { id } = node;
    await fetchData(id);
    onHistoryChange(node);
    push(node);
  }

  // 面包屑导航变化触发
  async function onMenuChange(node: BreadCrumbNode) {
    await fetchData(node.id);
    onHistoryChange(node);
    setCurrentNode(node);
  }

  // 页面刷新
  function onReload(node: BreadCrumbNode) {
    fetchData(node.id);
  }

  // 获取数据
  function fetchData(id?: string) {
    setLoading(true);
    console.log(id);
    // return new Promise<void>((resolve, reject) => {
    //   setTimeout(() => {
    //     setFileList(data);
    //     setLoading(false);
    //     resolve();
    //   }, 2500);
    // });
    getDistMenu({ id }).then((res) => {
      const { data, code } = res;
      if (code === 0) {
        setFileList(data.files);
        if (!id) setCurrentNode(new BreadCrumbNode(data._id, '全部文件'));
        setLoading(false);
      }
    });
  }

  function onTableChange() {
    debugger;
  }

  /**
   * 打开文件夹
   * @param record
   */
  async function openDir(record: fileDataProps) {
    const { _id, name, attribute } = record;
    if (attribute.type === 'dir') {
      const node = new BreadCrumbNode(_id, name, currentNode.id);
      await fetchData(_id);
      onHistoryChange(node);
      push(node);
      setCurrentNode(node);
    }
  }

  /**
   * 选择table项
   * @param selectedKey
   */
  function onRowClick(item: fileDataProps) {
    // onSelectedChange(selectedRowKeys);
    setSelectedKeys([item._id]);
  }

  /**
   * 新建文件夹
   */
  function newDir() {
    const item: fileDataProps = {
      _id: '_new', // ! 约定 新建文件夹id为_new
      parent_id: currentNode.id,
      name: '新建文件夹',
      lock: false,
      attribute: {
        name: '新建文件夹',
        size: 0,
        type: 'dir',
        url: '',
        create_time: moment().format('YYYY-MM-DD HH:mm'),
      },
    };
    setFileList([item, ...fileList]);
  }

  /**
   * 新建文件夹确认
   */
  function newDirSuccess(item: fileDataProps) {
    const [editItem, releaseItem, downloadItem, ...others] = fileList;
    setFileList([releaseItem, downloadItem, item, ...others]);
  }

  /**
   * 修改文件名
   */
  function onNameChanged() {}

  /**
   * 初始化
   */
  function init() {
    setLoading(true);
    getDistMenu({})
      .then((res) => {
        const { data, code } = res;
        if (code === 0) {
          setFileList(data.files);
          const rootNode = new BreadCrumbNode(data._id, '全部文件');
          setCurrentNode(rootNode);
          push(rootNode);
        }
      })
      .catch((e) => {
        console.warn(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useImperativeHandle(cRef, () => ({
    addHistory,
    onNameChanged,
    newDir,
  }));

  useEffect(function () {
    init();
  }, []);

  return (
    <div className={styles.view}>
      <div className={styles.topBar}>
        {/* 传递cRef，用于获取子组件添加历史记录方法 addHistory */}
        <HistoryBar
          cRef={HistoryBarRef}
          onChange={onMenuChange}
          onReload={onReload}
        />
        <span>
          共<span className={styles.activeText}>{fileList.length}</span>个
        </span>
      </div>
      <div>
        <FilesTable
          data={fileList}
          selectedKeys={selectedKeys}
          onClick={onRowClick}
          onDoubleClick={openDir}
          loading={loading}
          // onNameOk
          // onNameCancel
        />
      </div>
    </div>
  );
};

export default AllFiles;
