/*
 * @Author: your name
 * @Date: 2021-12-23 20:19:17
 * @LastEditTime: 2021-12-29 18:29:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\AllFiles\index.tsx
 */

import React, { FC, useRef, useEffect, useImperativeHandle } from 'react';
import request from 'utils/request';
import { Table } from 'antd';
import HistoryBar from '../components/HistoryBar';
import BreadCrumbNode from 'utils/BreadCrumbNode';

import styles from './index.less';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];

const AllFiles: FC<any> = (props) => {
  const { cRef, onHistoryChange } = props;

  const HistoryBarRef = useRef(null);

  const historyList = [new BreadCrumbNode('all', '全部文件')];

  /**
   * 调用 HistoryBar 内部方法 添加记录
   * @param node
   */
  function addHistory(node: BreadCrumbNode) {
    const { current }: { current: any } = HistoryBarRef;
    current?.push?.(node);
  }

  function onMenuChange(node: BreadCrumbNode) {
    onHistoryChange(node);
  }

  useImperativeHandle(cRef, () => ({
    addHistory,
  }));

  /**
   * 初始化
   */
  function init() {
    fetch('/api/user').then((res) => {
      debugger;
    });
  }

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
        />
        <span>
          共<span className={styles.activeText}>{12}</span>个
        </span>
      </div>
      <div>
        <Table
          rowSelection={{
            type: 'checkbox',
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default AllFiles;
