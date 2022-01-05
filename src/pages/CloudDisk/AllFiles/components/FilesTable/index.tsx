/*
 * @Author: your name
 * @Date: 2022-01-05 15:00:10
 * @LastEditTime: 2022-01-05 15:22:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\AllFiles\components\FilesTable\index.tsx
 */

import React, { FC } from 'react';
import classnames from 'classnames';
import ColumnsName from '../ColumnsName';

import styles from './index.less';

const FilesTable: FC<any> = (props) => {
  const { data, onNameOk } = props;

  return (
    <div className={styles.fileTable}>
      <div className={classnames(styles.tr, styles.header)}>
        <span className={styles.td}>名称</span>
        <span className={styles.td}>修改时间</span>
        <span className={styles.td}>类型</span>
        <span className={styles.td}>大小</span>
      </div>
      <div className={styles.tbody}>
        {data.map((item: fileDataProps) => {
          const { name, createTime, size, id } = item;
          const type = name.includes('.')
            ? name.replace(/.*\.(\w+)$/, '$1')
            : '文件夹';
          return (
            <div key={id} className={styles.tr}>
              <span className={styles.td}>
                <ColumnsName
                  record={item}
                  addNewDir={onNameOk}
                  onNameChanged={onNameOk}
                />
              </span>
              <span className={styles.td}>{createTime}</span>
              <span className={styles.td}>{type}</span>
              <span className={styles.td}>{size}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilesTable;
