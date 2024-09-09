/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-09-09 19:04:06
 * @FilePath: /blog5.0_front-end/src/pages/Home/Service/index.tsx
 */

import { CSSProperties, forwardRef } from 'react';
import styles from './index.less';

const Service = forwardRef<
  HTMLDivElement,
  { style?: CSSProperties; id?: string }
>((props, ref) => {
  const { style, id } = props;

  return <div id={id} style={style} ref={ref} className={styles.service}></div>;
});

export default Service;
