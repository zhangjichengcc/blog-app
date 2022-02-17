/*
 * @Author: zhangjicheng
 * @Date: 2022-02-17 10:44:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-02-17 11:30:48
 * @FilePath: \blog-app\src\components\Icon\Img\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import { FC } from 'react';

import styles from './index.less';

const Img: FC<any> = (props) => {
  const { src, style = {} } = props;

  return (
    <i
      className={styles.imgIcon}
      style={{ ...style, backgroundImage: `url(${src})` }}
    />
  );
};

export default Img;
