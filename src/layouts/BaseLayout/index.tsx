/*
 * @Author: zhangjicheng
 * @Date: 2022-08-29 11:40:01
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-14 19:10:27
 * @FilePath: \blog5.0_front-end\src\layouts\BaseLayout\index.tsx
 */
import { FC, ReactNode } from 'react';
import { Outlet } from 'umi';
import { selectHomeMenu } from '@/store/features/home/homeSlice';
import store from '@/store';
// import { useSelector } from 'react-redux';
import Header from '@/components/Header';


import styles from './index.less';

// const state = useSelector((store) => store);
// console.log(state)

const state = selectHomeMenu(store.getState());

// console.log(state)

console.log(state)


const menus = [
  {label: 'Home'},
  {label: 'About'},
  {label: 'Portfolio'},
  {label: 'Service'},
  {label: 'Contact'},
  {label: 'Blog'},
]

const Layout: FC<{children: ReactNode}> = () => {

  return (
    <div className={styles.layouts}>
      <Header menu={menus} />
      <Outlet />
    </div>
  );
}

export default Layout;
