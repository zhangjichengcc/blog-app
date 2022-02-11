/*
 * @Author: zhangjicheng
 * @Date: 2022-02-11 10:10:46
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-02-11 15:43:18
 * @FilePath: \blog-app\src\components\MediaPlayer\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import React, { FC, useState, useEffect, useMemo } from 'react';
import { Image, Modal } from 'antd';
import Player from 'griffith';
import { getType, getCategory } from 'utils/filesType';

import styles from './index.less';

const MediaPlayer: FC<any> = (props: any) => {
  const { name, url, visible, onCancel } = props;

  const type = getType(name);
  const categoty = getCategory(type);

  const ImgComponent = (
    <Image
      width={200}
      style={{ display: 'none' }}
      src={url}
      preview={{
        visible,
        src: url,
        onVisibleChange: onImgVisibleChange,
      }}
    />
  );

  const MediaComponent = useMemo(
    function () {
      const sources = {
        hd: {
          play_url: url,
        },
      };

      return (
        <Modal
          title={name}
          visible={visible}
          footer={null}
          onCancel={onMediaCancel}
          width="80vw"
          centered
          bodyStyle={{ width: '80vw', height: '78vh' }}
        >
          <Player id="mediaPlayer" sources={sources} />
        </Modal>
      );
    },
    [visible, url],
  );

  function onImgVisibleChange() {
    onCancel();
  }

  function onMediaCancel() {
    onCancel();
  }

  switch (categoty) {
    case 'img':
      return ImgComponent;
    case 'media':
      return MediaComponent;
    default:
      return null;
  }
};

export default MediaPlayer;
