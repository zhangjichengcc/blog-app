/*
 * @Author: zhangjicheng
 * @Date: 2022-02-11 10:10:46
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-02-11 19:02:49
 * @FilePath: \blog-app\src\components\FilePlayer\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import React, { FC, useState, useEffect, useMemo } from 'react';
import PdfRender from './components/PdfRender';
import MediaRender from './components/MediaRender';
import ImgRender from './components/ImgRender';
import { getType, getCategory } from 'utils/filesType';

import styles from './index.less';

const FilePlayer: FC<any> = (props: any) => {
  const { name, url, visible, onCancel } = props;

  const type = getType(name);
  const categoty = getCategory(type);

  function onMediaCancel() {
    onCancel();
  }

  switch (categoty) {
    case 'img':
      return (
        <ImgRender
          name={name}
          url={url}
          visible={visible}
          onCancel={onMediaCancel}
        />
      );
    case 'media':
      return (
        <MediaRender
          name={name}
          url={url}
          visible={visible}
          onCancel={onMediaCancel}
        />
      );
    case 'pdf':
      return (
        <PdfRender
          name={name}
          url={url}
          visible={visible}
          onCancel={onMediaCancel}
        />
      );
    default:
      return null;
  }
};

export default FilePlayer;
