/*
 * @Author: zhangjicheng
 * @Date: 2022-02-11 16:27:13
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-02-11 18:24:19
 * @FilePath: \blog-app\src\components\FilePlayer\components\MediaRender\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import React, { FC } from 'react';
import { Modal } from 'antd';
import Player from 'griffith';

// import styles from './index.less';

interface MediaRenderProps {
  name: string;
  url: string;
  visible: boolean;
  onCancel: () => void;
}

const MediaRender: FC<MediaRenderProps> = (props: any) => {
  const { name, url, visible, onCancel } = props;

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
      onCancel={onCancel}
      width="80vw"
      centered
      bodyStyle={{ width: '80vw', height: '78vh' }}
    >
      <Player id="mediaRender" sources={sources} />
    </Modal>
  );
};

export default MediaRender;
