/*
 * @Author: zhangjicheng
 * @Date: 2024-08-26 16:31:55
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-08-26 16:48:21
 * @FilePath: /blog5.0_front-end/src/components/GridContainer/index.tsx
 * @Description: 栅格化布局容器
 */

import { FC, ReactNode } from 'react';

import { useGrid } from '@/utils/hooks';
import { setGird } from '@/store/features/global/globalSlice';
import { useAppDispatch } from '@/store';

const Layout: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  const appDispatch = useAppDispatch();
  const grid = useGrid();

  appDispatch(setGird(grid));

  return children;
};

export default Layout;
