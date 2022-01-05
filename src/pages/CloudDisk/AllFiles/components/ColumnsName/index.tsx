/*
 * @Author: your name
 * @Date: 2022-01-04 15:43:02
 * @LastEditTime: 2022-01-05 18:40:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\AllFiles\components\ColumnsName\index.tsx
 */

import React, { FC, useState, useEffect } from 'react';
import { Input } from 'antd';
import FileIcon, { getFileType } from '../../../components/FileIcon';
import {
  ContainerOutlined,
  CloudDownloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import styles from './index.less';

const ColumnsName: FC<any> = (props) => {
  const { record, addNewDir, onNameChanged } = props;

  const [_name, setName] = useState('');

  const { name, id, edit = false } = record;

  function handleOk() {
    if (id === '_new') {
      addNewDir({ ...record, name: _name, edit: false });
    } else {
      onNameChanged({ ...record, edit: false });
    }
  }

  function handleCancel() {}

  useEffect(
    function () {
      setName(record.name);
    },
    [record],
  );

  if (edit) {
    return (
      <div className={styles.newDirName}>
        <FileIcon
          type={getFileType(name)}
          style={{ fontSize: 16, marginRight: 4 }}
        />
        {/* <Input size="small" placeholder="Basic usage" /> */}
        <input style={{ fontSize: 12 }} placeholder="新建文件夹" />
        <CheckCircleOutlined className={styles.icon} onClick={handleOk} />
        <CloseCircleOutlined className={styles.icon} onClick={handleCancel} />
      </div>
    );
  }

  if (id === 'resources') {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <ContainerOutlined style={{ fontSize: 16, marginRight: 4 }} />
        {name}
      </span>
    );
  }

  if (id === 'public') {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <CloudDownloadOutlined style={{ fontSize: 16, marginRight: 4 }} />
        {name}
      </span>
    );
  }

  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <FileIcon
        type={getFileType(name)}
        style={{ fontSize: 16, marginRight: 4 }}
      />
      {name}
    </span>
  );
};

export default ColumnsName;
