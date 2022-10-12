/*
 * @Author: zhangjicheng
 * @Date: 2022-08-29 11:40:01
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-12 15:51:15
 * @FilePath: \blog5.0_front-end\src\layouts\BaseLayout\index.tsx
 */
import { FC, ReactNode } from 'react';
import { Outlet } from 'umi';
import Menu from '@/components/PageMenu';


import styles from './index.less';

const Layout: FC<{children: ReactNode}> = () => {

  return (
    <div className={styles.layouts}>
      <Menu />
      <Outlet />
    </div>
  );
}

export default Layout;
