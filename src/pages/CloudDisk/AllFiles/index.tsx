/*
 * @Author: your name
 * @Date: 2021-12-23 20:19:17
 * @LastEditTime: 2022-01-20 23:06:30
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
import { Table, Input, Modal } from 'antd';
import FilesTable from './components/FilesTable';
import HistoryBar from '../components/HistoryBar';
import FileIcon, { getFileType } from '../components/FileIcon';
import ColumnsName from './components/ColumnsName';
import { getDistMenu, insertDir, deleteFile } from '@/services/cloudDist';
import BreadCrumbNode from 'utils/BreadCrumbNode';
import to from 'utils/promiseTools';

import styles from './index.less';

const AllFiles: FC<any> = (props) => {
  const { cRef, onHistoryChange, onSelectedChange } = props;

  const HistoryBarRef = useRef(null);

  const [fileList, setFileList] = useState<fileDataProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<BreadCrumbNode>();

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
  async function fetchData(id?: string): Promise<fileDataProps[]> {
    setLoading(true);
    const [err, res] = await to(getDistMenu({ id }));
    setLoading(false);
    if (err) return Promise.reject(err);
    const { data } = res;
    if (!id) setCurrentNode(new BreadCrumbNode(data._id, '全部文件'));
    setFileList(data.files);
    return data.files;
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
      const node = new BreadCrumbNode(_id, name, currentNode?.id);
      const [err, res] = await to(fetchData(_id));
      if (err) {
        console.error(err);
        return;
      }
      onHistoryChange(node);
      push(node);
      setCurrentNode(node);
    }
  }

  /**
   * 新建文件夹
   * 入参 list、node 为可选，兼容右键新建文件夹方法调用
   */
  function newDir(list?: fileDataProps[], node?: BreadCrumbNode) {
    const _list = list || fileList;
    const _node = node || currentNode;
    const item: fileDataProps = {
      _id: '_new', // ! 约定 新建文件夹id为_new
      parent_id: _node?.id as string,
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
    setFileList([item, ..._list]);
  }

  /**
   * 右键表格项，新建文件夹
   * 进入文件夹，然后新建文件夹
   * ! 注意此处方法无法复用 openDir fetchData, fetchData中写入表格数据为异步，会导致添加新建元素延迟，需要单独处理 filesList
   * @param record
   */
  async function onFileNew(record: fileDataProps) {
    const { _id, name } = record;
    setLoading(true);
    const [err, res] = await to(getDistMenu({ id: _id }));
    setLoading(false);
    const node = new BreadCrumbNode(_id, name, currentNode?.id);
    if (err) {
      console.error(err);
      return;
    }
    const { data } = res;
    onHistoryChange(node);
    push(node);
    setCurrentNode(node);
    // 此处传入新的filesList、currentNode, 以规避setFilesList及currentNode的延迟
    newDir(data.files, node);
  }

  /**
   * 删除文件
   * @param item
   */
  function onFileDelete(item: fileDataProps) {
    const { _id, parent_id } = item;
    deleteFile({ id: _id })
      .then((_res) => {
        fetchData(parent_id);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * 重命名/新建文件完成
   */
  function onNameOk(payload: { parent_id: any; name: any }) {
    const { parent_id, name } = payload;
    const isRepeat = fileList.filter((item) => item.name === name).length > 1;
    if (isRepeat) {
      Modal.error({
        title: '文件重名',
        content: `此目标已包含名为"${name}"的文件夹，请修改名称重试！`,
      });
      return;
    }
    insertDir({ id: parent_id, name })
      .then((res) => {
        fetchData(parent_id);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * 初始化
   */
  function init() {
    setLoading(true);
    getDistMenu({})
      .then((res) => {
        const { data } = res;
        setFileList(data.files);
        const rootNode = new BreadCrumbNode(data._id, '全部文件');
        setCurrentNode(rootNode);
        push(rootNode);
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
          onDoubleClick={openDir}
          onDelete={onFileDelete}
          onNew={onFileNew}
          loading={loading}
          onNameOk={onNameOk}
        />
      </div>
    </div>
  );
};

export default AllFiles;
