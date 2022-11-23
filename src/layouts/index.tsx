/*
 * @Author: zhangjicheng
 * @Date: 2022-08-24 18:55:18
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-14 17:45:02
 * @FilePath: \blog5.0_front-end\src\layouts\index.tsx
 */
import { Outlet } from 'umi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from '@/store';

import styles from './index.less';

const queryClient = new QueryClient()

export default function Layout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </Provider>
  );
}
