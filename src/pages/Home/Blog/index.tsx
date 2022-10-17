/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-17 18:47:55
 * @FilePath: \blog5.0_front-end\src\pages\Home\Blog\index.tsx
 */

import { forwardRef } from 'react';
import styles from './index.less';

const Blog = forwardRef<HTMLDivElement>((_props, ref) => {

  return (
    <div ref={ref} className={styles.blog}>
      
    </div>
  )
})

export default Blog;