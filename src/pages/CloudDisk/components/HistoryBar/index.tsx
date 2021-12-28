/*
 * @Author: your name
 * @Date: 2021-12-23 20:38:14
 * @LastEditTime: 2021-12-29 00:19:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\components\HistoryBar\index.tsx
 */

import React, { FC, RefObject, ReactElement, useImperativeHandle } from 'react';
import BreadCrumbNode from '@/utils/BreadCrumbNode';
import useHistory from '../../hooks/useHistory';
import {
  ReloadOutlined,
  LeftOutlined,
  RightOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';

import styles from './index.less';

type HistoryBarProps = {
  /**
   * 接收子组件ref，用于父组件调用子组件方法
   * cRef.current.addHistory() // 添加历史记录
   */
  cRef: RefObject<ReactElement>;
  /**
   * 默认历史记录列表
   */
  history?: BreadCrumbNode[];
  /**
   * @node
   */
  onChange?: (node: BreadCrumbNode) => void;
};

const HistoryBar: FC<HistoryBarProps> = (props): ReactElement => {
  const { history: _history = [], cRef, onChange } = props;
  const [history, currentIdx, visualHistory, go, push] = useHistory(_history);

  const leftActive = currentIdx > 0;
  const rightActive = currentIdx < history.length - 1;

  /**
   * 后退
   */
  function goBack() {
    leftActive && go(-1);
    // ! 注意 currentIdx 需要 -1, 方法触发时，currentIdx 并未更新
    typeof onChange === 'function' && onChange(history[currentIdx - 1]);
  }

  /**
   * 前进
   */
  function forward() {
    rightActive && go(1);
    typeof onChange === 'function' && onChange(history[currentIdx + 1]);
  }

  /**
   * 刷新
   */
  function reload() {}

  /**
   * 点击指定目录触发
   * @param item
   */
  function onHandleClick(item: BreadCrumbNode) {
    push(item);
    typeof onChange === 'function' && onChange(item);
  }

  useImperativeHandle(cRef, (): any => ({
    push,
  }));

  return (
    <div className={styles.historyBar}>
      <div className={styles.leftBar}>
        <LeftOutlined
          className={leftActive ? styles.active : ''}
          onClick={goBack}
        />
        <RightOutlined
          className={rightActive ? styles.active : ''}
          onClick={forward}
        />
        <ReloadOutlined className={styles.active} onClick={reload} />
      </div>
      <i />
      <div className={styles.rightBar}>
        {visualHistory.map((item: BreadCrumbNode, idx: number) => {
          const { id, name } = item;
          return (
            <span key={id}>
              {idx !== 0 && <CaretRightOutlined style={{ margin: '0 5px' }} />}
              <span
                className={styles.filder}
                onClick={(_e) => onHandleClick(item)}
              >
                {name}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryBar;
