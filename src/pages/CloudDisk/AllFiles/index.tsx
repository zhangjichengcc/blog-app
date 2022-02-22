/*
 * @Author: zhangjicheng
 * @Date: 2021-12-23 20:19:17
 * @LastEditTime: 2022-02-22 17:21:02
 * @LastEditors: zhangjicheng
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
import avi from 'assets/cloudDisk/avi.png';
import classnames from 'classnames';
import moment from 'js-moment';
import fileDownload from 'js-file-download';
import { Modal } from 'antd';
import FilesTable from './components/FilesTable';
import HistoryBar from '../components/HistoryBar';
import FilePlayer from 'components/FilePlayer';
import {
  getDistMenu,
  insertDir,
  deleteFile,
  renameFile,
  uploadFile,
} from '@/services/cloudDist';
import BreadCrumbNode from 'utils/BreadCrumbNode';
import to from 'utils/promiseTools';
import { sleep } from 'utils/utils';
import { getCategory } from 'utils/filesType';

import styles from './index.less';

const AllFiles: FC<any> = (props) => {
  const { cRef, onSelectedChange } = props;

  const HistoryBarRef = useRef(null);
  const fileRef = useRef(null);

  const [fileList, setFileList] = useState<fileDataProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentNode, setCurrentNode] = useState<BreadCrumbNode>();
  const [visibleFile, setVisibleFile] = useState<any>({ visiable: false });

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
    // onHistoryChange(node);
    push(node);
  }

  // 面包屑导航变化触发
  async function onMenuChange(node: BreadCrumbNode) {
    await fetchData(node.id);
    // onHistoryChange(node);
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

  /**
   * 打开文件夹
   * @param {record}
   */
  async function openDir(record: fileDataProps) {
    const { _id, name, attribute } = record;
    if (attribute.type === 'dir') {
      const node = new BreadCrumbNode(_id, name, currentNode?.id);
      node.current = record;
      const [err, res] = await to(fetchData(_id));
      if (err) {
        console.error(err);
        return;
      }
      // onHistoryChange(node);
      push(node);
      setCurrentNode(node);
    }
  }

  function openMedia(record: fileDataProps) {
    setVisibleFile({ ...record, visible: true });
    console.log(currentNode);
  }

  function onMediaCancel() {
    setVisibleFile({ ...visibleFile, visible: false });
    sleep(300).then(() => {
      // 处理关闭动画效果，延迟移除文件属性，否则将失去关闭动画
      setVisibleFile({ visible: false });
    });
  }

  /**
   * 打开文件判断
   * @param {record}
   */
  function onOpen(record: fileDataProps) {
    const {
      attribute: { type },
    } = record;
    const _type = getCategory(type);
    switch (_type) {
      case 'dir':
        openDir(record);
        break;
      case 'img':
        openMedia(record);
        break;
      case 'media':
        openMedia(record);
        break;
      case 'pdf':
        openMedia(record);
        break;
      default:
        return;
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
        size: 0,
        type: 'dir',
        url: '',
        create_time: moment().format('YYYY-MM-DD HH:mm'),
      },
    };
    setFileList([item, ..._list]);
  }

  /**
   * 触发上传文件
   * @param record
   * @returns
   */
  function upload() {
    const { current }: { current: any } = fileRef;
    current?.click();
  }
  // 上传文件
  function onFileChange(e: any) {
    const { files = [] } = e.target;
    const { id = null } = currentNode as any;
    const [file] = files;
    uploadFile({ id, file })
      .then((res) => {
        fetchData(id);
      })
      .catch((err) => {
        console.warn(err);
      });
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
    // onHistoryChange(node);
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
  function onNameOk(payload: fileDataProps) {
    const { parent_id, name, _id } = payload;
    const isRepeat = fileList.filter((item) => item.name === name).length > 1;
    if (isRepeat) {
      Modal.error({
        title: '文件重名',
        content: `此目标已包含名为"${name}"的文件夹，请修改名称重试！`,
      });
      return;
    }
    // 新建文件
    if (_id === '_new') {
      insertDir({ id: parent_id, name })
        .then((res) => {
          fetchData(parent_id);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // 重命名
      renameFile({ id: _id, name })
        .then((res) => {
          fetchData(parent_id);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  /**
   * 修改文件名
   * 修改edit状态，使名称可编辑
   */
  function onFileRename(payload: fileDataProps) {
    const { _id } = payload;
    const _list = fileList.map((item) => ({
      ...item,
      edit: item._id === _id,
    }));
    setFileList(_list);
  }

  /**
   * 文件下载
   * @param payload
   */
  function onDownLoad(payload: fileDataProps) {
    const { attribute, name } = payload;
    const { url } = attribute;
    fetch(url)
      .then((res) => res.blob())
      .then((res) => {
        fileDownload(res, name);
      });
    // fileDownload(url, name);
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

  // 透传方法，父元素通过 ref.current 获取子元素方法
  useImperativeHandle(cRef, () => ({
    addHistory,
    newDir,
    upload,
  }));

  useEffect(function () {
    init();
  }, []);

  return (
    <div className={styles.view}>
      <input
        type="file"
        ref={fileRef}
        onChange={onFileChange}
        style={{ position: 'absolute', width: 0, height: 0 }}
      />
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
          onDoubleClick={onOpen}
          onDelete={onFileDelete}
          onNew={onFileNew}
          onOpen={onOpen}
          onNameOk={onNameOk}
          onRename={onFileRename}
          onDownLoad={onDownLoad}
          loading={loading}
        />
      </div>
      <FilePlayer
        url={visibleFile?.attribute?.url}
        name={visibleFile?.name}
        visible={visibleFile.visible}
        onCancel={onMediaCancel}
      />
    </div>
  );
};

export default AllFiles;
