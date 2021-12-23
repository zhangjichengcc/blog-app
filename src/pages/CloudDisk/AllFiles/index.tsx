/*
 * @Author: your name
 * @Date: 2021-12-23 20:19:17
 * @LastEditTime: 2021-12-23 20:39:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\AllFiles\index.tsx
 */

import React, { FC } from 'react';
import HistoryBar from '../components/HistoryBar';

import styles from './index.less';

const AllFiles: FC<any> = (props) => {
  return (
    <div>
      <div className={styles.historyBar}>
        <div>
          <HistoryBar />
        </div>
      </div>
    </div>
  );
};

export default AllFiles;
