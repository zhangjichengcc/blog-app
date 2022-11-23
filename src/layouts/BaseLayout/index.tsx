/*
 * @Author: zhangjicheng
 * @Date: 2022-08-29 11:40:01
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-26 10:35:20
 * @FilePath: \blog5.0_front-end\src\layouts\BaseLayout\index.tsx
 */
import { FC, ReactNode } from 'react';
import { Outlet } from 'umi';
import { useAppSelector } from '@/store';
import Header from '@/components/Header';

import styles from './index.less';

const Layout: FC<{children: ReactNode}> = () => {

  const menu = useAppSelector(state => state.home.homeMenu);

  return (
    <div className={styles.layouts}>
      <Header menu={menu} />
      <Outlet />
    </div>
  );
}

export default Layout;
