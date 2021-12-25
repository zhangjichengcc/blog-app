/*
 * @Author: your name
 * @Date: 2021-12-23 20:38:14
 * @LastEditTime: 2021-12-25 18:05:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\components\HistoryBar\index.tsx
 */

import React, { FC } from 'react';
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

const list = [
  { key: 'title', value: '全部文件', label: '全部文件' },
  { key: 'my', value: '我的文件', label: '我的文件' },
];

const HistoryBar: FC<any> = (props) => {
  const { history = list } = props;

  return (
    <div className={styles.historyBar}>
      <div className={styles.leftBar}>
        <LeftOutlined />
        <RightOutlined />
        <ReloadOutlined />
      </div>
      <i />
      <div className={styles.rightBar}>
        {history.map((item: { key: any; label: any }, idx: number) => {
          const { key, label } = item;
          return (
            <span key={key}>
              {idx !== 0 && <CaretRightOutlined style={{ margin: '0 5px' }} />}
              <span className={styles.filder}>{label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryBar;
