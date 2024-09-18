/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-09-18 18:34:25
 * @FilePath: /blog5.0_front-end/src/pages/Home/Contact/index.tsx
 */

import { CSSProperties, forwardRef } from 'react';
import styles from './index.less';
import { formatDataset } from '@/utils/tools';

const Contact = forwardRef<
  HTMLDivElement,
  { style?: CSSProperties; id?: string; dataset?: Record<string, any> }
>((props, ref) => {
  const { style, id, dataset = {} } = props;

  const datasetMap = formatDataset(dataset);

  return (
    <div
      id={id}
      style={style}
      ref={ref}
      className={styles.contact}
      {...datasetMap}
    >
      <h2>contact</h2>
    </div>
  );
});

export default Contact;
