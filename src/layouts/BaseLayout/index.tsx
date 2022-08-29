/*
 * @Author: zhangjicheng
 * @Date: 2022-08-29 11:40:01
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-08-29 16:10:06
 * @FilePath: \taxLargeScreen\src\layouts\BaseLayout\index.tsx
 */
import { FC, ReactNode } from 'react';
import { Outlet } from 'umi'
import styles from './index.less';

const Layout: FC<{children: ReactNode}> = () => {

  return (
    <div className={styles.layouts}>
      <Outlet />
    </div>
  );
}

export default Layout;
