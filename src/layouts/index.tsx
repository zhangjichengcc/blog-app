/*
 * @Author: zhangjicheng
 * @Date: 2022-08-24 18:55:18
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-12 11:21:11
 * @FilePath: \blog5.0_front-end\src\layouts\index.tsx
 */
import { Outlet } from 'umi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import styles from './index.less';

const queryClient = new QueryClient()

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
