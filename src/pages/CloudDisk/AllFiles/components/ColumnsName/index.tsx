/*
 * @Author: your name
 * @Date: 2022-01-04 15:43:02
 * @LastEditTime: 2022-01-04 17:13:10
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
        <Input placeholder="Basic usage" />
        <CheckCircleOutlined onClick={handleOk} />
        <CloseCircleOutlined onClick={handleCancel} />
      </div>
    );
  }

  if (id === 'resources') {
    return (
      <a style={{ display: 'flex', alignItems: 'center' }}>
        <ContainerOutlined style={{ fontSize: 20, marginRight: 8 }} />
        {name}
      </a>
    );
  }

  if (id === 'public') {
    return (
      <a style={{ display: 'flex', alignItems: 'center' }}>
        <CloudDownloadOutlined style={{ fontSize: 20, marginRight: 8 }} />
        {name}
      </a>
    );
  }

  return (
    <a style={{ display: 'flex', alignItems: 'center' }}>
      <FileIcon
        type={getFileType(name)}
        style={{ fontSize: 20, marginRight: 8 }}
      />
      {name}
    </a>
  );
};

export default ColumnsName;
