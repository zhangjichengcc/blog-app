/*
 * @Author: zhangjicheng
 * @Date: 2022-02-11 16:27:13
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-02-11 18:28:10
 * @FilePath: \blog-app\src\components\FilePlayer\components\ImgRender\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import { FC } from 'react';
import { Image } from 'antd';

// import styles from './index.less';

interface PdfRenderProps {
  name: string;
  url: string;
  visible: boolean;
  onCancel: () => void;
}

const PdfRender: FC<PdfRenderProps> = (props: any) => {
  const { name, url, visible, onCancel } = props;

  return (
    <Image
      width={200}
      style={{ display: 'none' }}
      src={url}
      title={name}
      alt={name}
      preview={{
        visible,
        src: url,
        onVisibleChange: onCancel,
      }}
    />
  );
};

export default PdfRender;
