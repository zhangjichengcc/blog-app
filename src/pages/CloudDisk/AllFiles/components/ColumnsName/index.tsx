/*
 * @Author: your name
 * @Date: 2022-01-04 15:43:02
 * @LastEditTime: 2022-11-10 23:00:45
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /blog5.0_front-end/src/pages/CloudDisk/AllFiles/components/ColumnsName/index.tsx
 */

import { FC, useState, useEffect, useRef } from 'react';
import { Input } from 'antd';
import FileIcon, { getFileType } from 'components/FileIcon';
import { ContainerOutlined } from '@ant-design/icons';

import styles from './index.less';

const ColumnsName: FC<any> = (props) => {
  const { record, addNewDir } = props;

  const [_name, setName] = useState(record.name);
  const inputRef = useRef(null);

  const { name, _id, lock, edit } = record;

  const _edit = edit || _id === '_new';

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
      if (_edit) {
        const { current }: { current: any } = inputRef;
        current?.focus();
      }
    },
    [record],
  );

  if (_edit) {
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
      <span className={styles['columns-name']} style={{ display: 'flex', alignItems: 'center' }}>
        <ContainerOutlined style={{ fontSize: 16, marginRight: 4 }} />
        <span className={styles.text}>{name}</span>
      </span>
    );
  }

  return (
    <span className={styles['columns-name']} style={{ display: 'flex', alignItems: 'center' }}>
      <FileIcon
        type={getFileType(name)}
        style={{ fontSize: 16, marginRight: 4 }}
      />
      <span className={styles.text}>{name}</span>
    </span>
  );
};

export default ColumnsName;
