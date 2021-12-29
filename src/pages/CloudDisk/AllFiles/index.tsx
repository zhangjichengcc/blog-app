/*
 * @Author: your name
 * @Date: 2021-12-23 20:19:17
 * @LastEditTime: 2021-12-29 17:56:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\AllFiles\index.tsx
 */

import React, { FC, useRef, useEffect, useImperativeHandle } from 'react';
import request from 'utils/request';
import HistoryBar from '../components/HistoryBar';
import BreadCrumbNode from 'utils/BreadCrumbNode';

import styles from './index.less';

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
    </div>
  );
};

export default AllFiles;
