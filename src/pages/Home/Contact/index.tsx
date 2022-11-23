/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-17 18:47:39
 * @FilePath: \blog5.0_front-end\src\pages\Home\Contact\index.tsx
 */

import { forwardRef } from 'react';
import styles from './index.less';

const Contact = forwardRef<HTMLDivElement>((_props, ref) => {

  return (
    <div ref={ref} className={styles.contact}>
      
    </div>
  )
})

export default Contact;