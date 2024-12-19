/*
 * @Author: zhangjicheng
 * @Date: 2022-08-24 18:55:18
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-08-21 15:58:09
 * @FilePath: /blog5.0_front-end/src/layouts/index.tsx
 */
import { Outlet } from 'umi';
import { Provider } from 'react-redux';
import store from '@/store';

import styles from './index.less';


export default function Layout() {
  return (
    <Provider store={store}>
        <Outlet />
    </Provider>
  );
}
