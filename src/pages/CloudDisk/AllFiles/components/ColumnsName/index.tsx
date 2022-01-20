/*
 * @Author: your name
 * @Date: 2022-01-04 15:43:02
 * @LastEditTime: 2022-01-20 20:12:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\AllFiles\components\ColumnsName\index.tsx
 */

import React, { FC, useState, useEffect, useRef } from 'react';
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
  const { record, addNewDir } = props;

  const [_name, setName] = useState(record.name);
  const inputRef = useRef(null);

  const { name, _id, lock } = record;

  function onBlur() {
    addNewDir({ ...record, name: _name });
  }

  function onInputChange(e: { target: { value: string } }) {
    const { value } = e.target;
    setName(value);
  }

  function onKeyDown(e: { code: string }) {
    const { code } = e;
    if (code === 'Enter') {
      onBlur();
    }
  }

  useEffect(
    function () {
      if (_id === '_new') {
        const { current }: { current: any } = inputRef;
        current?.focus();
      }
    },
    [record],
  );

  if (_id === '_new') {
    return (
      <div className={styles.newDirName}>
        <FileIcon
          type={getFileType(name)}
          style={{ fontSize: 16, marginRight: 4 }}
        />
        {/* <Input size="small" placeholder="Basic usage" /> */}
        <input
          ref={inputRef}
          style={{ fontSize: 12 }}
          value={_name}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          placeholder="新建文件夹"
          onBlur={onBlur}
        />
      </div>
    );
  }

  if (lock) {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <ContainerOutlined style={{ fontSize: 16, marginRight: 4 }} />
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
