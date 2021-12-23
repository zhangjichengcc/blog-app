/*
 * @Author: your name
 * @Date: 2021-12-23 20:38:14
 * @LastEditTime: 2021-12-23 20:47:13
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

const HistoryBar: FC<any> = (props) => {
  return (
    <div className={styles.historyBar}>
      <div className={styles.leftBar}>
        <LeftOutlined />
        <RightOutlined />
        <ReloadOutlined />
      </div>
      <i />
      <div className={styles.rightBar}>
        <span className={styles.filder}>全部文件</span>
        <CaretRightOutlined style={{ margin: '0 5px' }} />
        <span className={styles.filder}>我的收藏</span>
      </div>
    </div>
  );
};

export default HistoryBar;
