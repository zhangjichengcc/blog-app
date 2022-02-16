/*
 * @Author: zhangjicheng
 * @Date: 2022-02-16 18:40:36
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-02-16 19:04:12
 * @FilePath: \blog-app\src\pages\CloudDisk\AllFiles\components\PopoverContent\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import React, { FC, useMemo, useState, useEffect } from 'react';
import { getType } from 'utils/filesType';

import styles from './index.less';

const PopoverContent: FC<any> = (props) => {
  const { data, onDelete, onOpen, onNew, onRename } = props;

  const { name } = data;
  const type = getType(name);

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
  }

  function onHandleDelete() {
    onDelete(data);
  }

  function onHandleOpen(e: React.MouseEvent<HTMLDivElement>) {
    onOpen(data);
  }

  function onHandleNew() {
    onNew(data);
  }

  function onHandleRename() {
    onRename(data);
  }

  function onHandleDownLoad() {}

  return (
    <div className={styles.popoverContent} onClick={onClick}>
      <span data-type="popover" onClick={onHandleOpen}>
        打开
      </span>
      <span data-type="popover" onClick={onHandleDelete}>
        删除
      </span>
      <span data-type="popover" onClick={onHandleRename}>
        重命名
      </span>
      {/* <span>复制</span> */}
      {/* <span>发送到</span> */}
      {/* <span>分享</span> */}
      {type !== 'dir' && <span onClick={onHandleDownLoad}>下载</span>}
      <span data-type="popover" onClick={onHandleNew}>
        新建文件夹
      </span>
    </div>
  );
};

export default PopoverContent;
