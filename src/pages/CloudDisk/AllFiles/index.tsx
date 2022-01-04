/*
 * @Author: your name
 * @Date: 2021-12-23 20:19:17
 * @LastEditTime: 2022-01-04 11:36:57
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
import request from 'utils/request';
import { Table } from 'antd';
import { ContainerOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import HistoryBar from '../components/HistoryBar';
import FileIcon, { getFileType } from '../components/FileIcon';
import BreadCrumbNode from 'utils/BreadCrumbNode';

import styles from './index.less';

interface DataType {
  id: string;
  // pId: string;
  name: string;
  size: number;
  type: 'file' | 'directory';
  createTime: string;
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: string, record: DataType) => {
      switch (record.id) {
        case 'resources':
          return (
            <a style={{ display: 'flex', alignItems: 'center' }}>
              <ContainerOutlined style={{ fontSize: 20, marginRight: 8 }} />
              {text}
            </a>
          );
        case 'public':
          return (
            <a style={{ display: 'flex', alignItems: 'center' }}>
              <CloudDownloadOutlined style={{ fontSize: 20, marginRight: 8 }} />
              {text}
            </a>
          );
        default:
          return (
            <a style={{ display: 'flex', alignItems: 'center' }}>
              <FileIcon
                type={getFileType(text)}
                style={{ fontSize: 20, marginRight: 8 }}
              />
              {text}
            </a>
          );
      }
    },
  },
  {
    title: 'Size',
    dataIndex: 'size',
  },
  {
    title: 'CreateTime',
    dataIndex: 'createTime',
  },
];

const data: DataType[] = [
  {
    id: 'resources',
    // pId: 'all',
    name: '我的资源',
    size: 10249,
    type: 'directory',
    createTime: '2021/12/29 12:00:00',
  },
  {
    id: 'public',
    // pId: 'all',
    name: '共享文件',
    size: 10249,
    type: 'directory',
    createTime: '2021/12/29 12:00:00',
  },
  {
    id: 'myasd',
    // pId: 'all',
    name: '我的收藏',
    size: 10249,
    type: 'directory',
    createTime: '2021/12/29 12:00:00',
  },
  {
    id: '2',
    // pId: ''
    name: 'test.txt',
    size: 10249,
    type: 'directory',
    createTime: '2021/12/29 12:00:00',
  },
  {
    id: '3',
    name: 'test.png',
    size: 10249,
    type: 'directory',
    createTime: '2021/12/29 12:00:00',
  },
  {
    id: '4',
    name: 'test.pdf',
    size: 10249,
    type: 'directory',
    createTime: '2021/12/29 12:00:00',
  },
  {
    id: '5',
    name: 'test.docx',
    size: 10249,
    type: 'directory',
    createTime: '2021/12/29 12:00:00',
  },
  {
    id: '6',
    name: 'test.xlsx',
    size: 10249,
    type: 'directory',
    createTime: '2021/12/29 12:00:00',
  },
  {
    id: '7',
    name: 'test.zip',
    size: 10249,
    type: 'directory',
    createTime: '2021/12/29 12:00:00',
  },
];

const AllFiles: FC<any> = (props) => {
  const { cRef, onHistoryChange, onSelectedChange } = props;

  const HistoryBarRef = useRef(null);

  const [fileList, setFileList] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const historyList = [new BreadCrumbNode('all', '全部文件')];
  const [currentNode, setCurrentNode] = useState<BreadCrumbNode>(
    new BreadCrumbNode('all', '全部文件'),
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
  }

  // 页面刷新
  function onReload(node: BreadCrumbNode) {
    fetchData(node.id);
  }

  // 获取数据
  function fetchData(id: string) {
    setLoading(true);
    console.log(id);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        setFileList(data);
        setLoading(false);
        resolve();
      }, 2500);
    });
  }

  /**
   * 初始化
   */
  function init() {
    fetchData('all');
  }

  function onTableChange() {
    debugger;
  }

  /**
   * 打开文件夹
   * @param record
   */
  async function openDir(record: DataType) {
    const { type, id, name } = record;
    if (type === 'directory') {
      const node = new BreadCrumbNode(id, name, currentNode.id);
      await fetchData(id);
      onHistoryChange(node);
      push(node);
      setCurrentNode(node);
    }
  }

  /**
   * 选择table项
   * @param selectedRowKeys
   * @param selectedRows
   */
  function onSelectedRowKeysChange(
    selectedRowKeys: React.Key[],
    selectedRows: DataType[],
  ) {
    onSelectedChange(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  }

  useImperativeHandle(cRef, () => ({
    addHistory,
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
          history={historyList}
          onChange={onMenuChange}
          onReload={onReload}
        />
        <span>
          共<span className={styles.activeText}>{12}</span>个
        </span>
      </div>
      <div>
        <Table
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectedRowKeysChange,
          }}
          onRow={(record) => {
            return {
              // onMouseEnter: e => this.tableRowMouseEnter(e, record),
              // onMouseLeave: e => this.tableRowMouseLeave(e, record),
              onDoubleClick: () => openDir(record),
            };
          }}
          loading={loading}
          onChange={onTableChange}
          columns={columns}
          dataSource={fileList}
        />
      </div>
    </div>
  );
};

export default AllFiles;
