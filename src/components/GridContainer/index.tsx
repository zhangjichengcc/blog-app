/*
 * @Author: zhangjicheng
 * @Date: 2024-08-26 16:31:55
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-09-09 16:32:09
 * @FilePath: /blog5.0_front-end/src/components/GridContainer/index.tsx
 * @Description: 栅格化布局容器
 */

import { FC, ReactNode, useEffect } from 'react';

import { useGrid } from '@/utils/hooks';
import { setGird } from '@/store/features/global/globalSlice';
import { useAppDispatch } from '@/store';

const Layout: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  const appDispatch = useAppDispatch();
  const grid = useGrid();

  // 使用 useEffect 在 grid 变化时更新状态
  useEffect(() => {
    appDispatch(setGird(grid));
  }, [grid, appDispatch]);

  return children;
};

export default Layout;
