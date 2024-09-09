/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-09-09 19:03:31
 * @FilePath: /blog5.0_front-end/src/pages/Home/Portfolio/index.tsx
 */

import { CSSProperties, forwardRef } from 'react';
import styles from './index.less';

const Portfolio = forwardRef<
  HTMLDivElement,
  { style?: CSSProperties; id?: string }
>((props, ref) => {
  const { style, id } = props;

  return (
    <div id={id} ref={ref} className={styles.portfolio} style={style}></div>
  );
});

export default Portfolio;
