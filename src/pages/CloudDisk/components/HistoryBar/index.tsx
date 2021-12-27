/*
 * @Author: your name
 * @Date: 2021-12-23 20:38:14
 * @LastEditTime: 2021-12-27 17:35:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\components\HistoryBar\index.tsx
 */

import React, { FC, useState, useEffect, useCallback } from 'react';
import EventEmitter from 'utils/eventEmitter';
import {
  ReloadOutlined,
  LeftOutlined,
  RightOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';

import styles from './index.less';
interface historyItemProps {
  key: string;
  label: string;
  value: string;
}

const eventEmitter = new EventEmitter();

type useHistoryReturnProps = [
  Array<historyItemProps>,
  number,
  Array<historyItemProps>,
  (item: historyItemProps) => void,
  (count: number) => void,
];

const useHistory = function (
  historyList: Array<historyItemProps> = [],
): useHistoryReturnProps {
  const [history, setHistory] = useState<Array<historyItemProps>>(historyList);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [visualHistory, setVisualHistory] = useState<Array<historyItemProps>>(
    [],
  );

  function historyChange(count: number): void {
    const _currentIdx = currentIdx + count;
    if (_currentIdx > history.length - 1 || _currentIdx < 0) {
      console.warn('historyChange(count: number)：当前count不合法');
    } else {
      setCurrentIdx(_currentIdx);
    }
  }

  // function addHistory(item: historyItemProps) : void {
  //   setHistory(visualHistory.concat(item));
  //   setCurrentIdx(currentIdx + 1);
  // }

  const addHistory = (item: historyItemProps): void => {
    setHistory(visualHistory.concat(item));
    setCurrentIdx(currentIdx + 1);
  };

  useEffect(
    function () {
      setVisualHistory(history.slice(0, currentIdx + 1));
    },
    [currentIdx, history],
  );

  return [history, currentIdx, visualHistory, addHistory, historyChange];
};

const list = [
  { key: 'title', value: '全部文件', label: '全部文件' },
  { key: 'my', value: '我的文件', label: '我的文件' },
];

const HistoryBar: FC<any> = (props) => {
  const { history: _history = list } = props;
  const [
    history,
    currentIdx,
    visualHistory,
    addHistory,
    historyChange,
  ] = useHistory(_history);

  const leftActive = currentIdx > 0;
  const rightActive = currentIdx < history.length - 1;

  function goBack() {
    leftActive && historyChange(-1);
  }

  function forward() {
    rightActive && historyChange(1);
  }

  function reload() {}

  function test() {
    const now = Date.now();
    addHistory({ label: 'a', key: String(now), value: String(now) });
  }

  useEffect(function () {
    eventEmitter.on('CloudDist_HistoryBar_addHistory', addHistory);
    console.log(eventEmitter);
    global.eventEmitter = eventEmitter;
    return function () {
      eventEmitter.off('CloudDist_HistoryBar_addHistory');
    };
  }, []);

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
        {visualHistory.map((item: { key: any; label: any }, idx: number) => {
          const { key, label } = item;
          return (
            <span key={key}>
              {idx !== 0 && <CaretRightOutlined style={{ margin: '0 5px' }} />}
              <span className={styles.filder}>{label}</span>
            </span>
          );
        })}
      </div>
      <span onClick={test}>test</span>
    </div>
  );
};

function addHistory(item: historyItemProps) {
  eventEmitter.emit('CloudDist_HistoryBar_addHistory', item);
}

export default HistoryBar;
export { addHistory };
