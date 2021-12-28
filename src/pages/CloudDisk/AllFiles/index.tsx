/*
 * @Author: your name
 * @Date: 2021-12-23 20:19:17
 * @LastEditTime: 2021-12-28 20:58:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\AllFiles\index.tsx
 */

import React, { FC, useRef, useImperativeHandle } from 'react';
import HistoryBar from '../components/HistoryBar';
import BreadCrumbNode from 'utils/BreadCrumbNode';

import styles from './index.less';

const AllFiles: FC<any> = (props) => {
  const { cRef } = props;

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

  useImperativeHandle(cRef, () => ({
    addHistory,
  }));

  return (
    <div>
      <div className={styles.historyBar}>
        <div>
          {/* 传递cRef，用于获取子组件添加历史记录方法 addHistory */}
          <HistoryBar cRef={HistoryBarRef} history={historyList} />
        </div>
      </div>
    </div>
  );
};

export default AllFiles;
