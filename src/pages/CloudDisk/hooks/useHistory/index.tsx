/*
 * @Author: zhangjc
 * @Date: 2021-12-28 16:19:25
 * @LastEditTime: 2022-01-04 10:23:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\hooks\useHistory\index.tsx
 */

import React, { useState, useEffect } from 'react';
import BreadCrumbNode from '@/utils/BreadCrumbNode';

export type useHistoryReturnProps = [
  Array<BreadCrumbNode>,
  number,
  Array<BreadCrumbNode>,
  (count: number) => void,
  (node: BreadCrumbNode) => void,
];

const useHistory = function (
  historyList: Array<BreadCrumbNode> = [],
): useHistoryReturnProps {
  const [history, setHistory] = useState<Array<BreadCrumbNode>>(historyList);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [visualHistory, setVisualHistory] = useState<Array<BreadCrumbNode>>([]);

  /**
   * 历史变化
   * @param count
   */
  function go(count: number): void {
    const _currentIdx = currentIdx + count;
    if (_currentIdx > history.length - 1 || _currentIdx < 0) {
      console.warn('historyChange(count: number)：当前count不合法');
    } else {
      setCurrentIdx(_currentIdx);
    }
  }

  /**
   * 跳转指定路由
   * @param route
   */
  function push(node: BreadCrumbNode): void {
    const { pId } = node;
    let _history = [];
    if (!pId) {
      // 若不存在previous则代表根节点
      _history.push(node);
    } else {
      for (let i = 0; i < history.length; i++) {
        const item = history[i];
        if (node.pId === item.id) {
          _history.push(item, node);
          break;
        }
        _history.push(item);
      }
    }
    setHistory(_history);
    setCurrentIdx(_history.length - 1);
  }

  useEffect(
    function () {
      setVisualHistory(history.slice(0, currentIdx + 1));
    },
    [currentIdx, history],
  );

  return [history, currentIdx, visualHistory, go, push];
};

export default useHistory;
