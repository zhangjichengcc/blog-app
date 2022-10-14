/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-14 18:39:38
 * @FilePath: \blog5.0_front-end\src\pages\Home\Banner\index.tsx
 */

import { FC, forwardRef } from 'react';
import styles from './index.less';

// eslint-disable-next-line react/display-name
const Banner: FC = forwardRef((_props, ref) => {

  return (
    <div ref={ref} className={styles.banner}>
      
    </div>
  )
})

export default Banner;