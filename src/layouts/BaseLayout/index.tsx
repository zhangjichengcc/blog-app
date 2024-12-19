/*
 * @Author: zhangjicheng
 * @Date: 2022-08-29 11:40:01
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-08-26 16:43:27
 * @FilePath: /blog5.0_front-end/src/layouts/BaseLayout/index.tsx
 */
import { FC, ReactNode } from 'react';
import { Outlet } from 'umi';

const Layout: FC<{ children: ReactNode }> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
