/*
 * @Author: your name
 * @Date: 2021-12-17 10:37:56
 * @LastEditTime: 2022-02-28 18:03:25
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\components\TopMenu\index.tsx
 */

import React, { FC } from 'react';
import { history, IRoute } from 'umi';
import MenuLogo from 'components/MenuLogo';
import Routes2Menu from 'components/Routes2Menu';
import TopUserBar from 'components/TopUserBar';

import styles from './index.less';

const TopMenu: FC<any> = (props) => {
  const { mode, route, routes } = props;

  const baseUrl = '/'; // 设定baseUrl = / 取routes中 path = / 中的路由生成导航

  const baseRoutes =
    routes.find((route: IRoute) => route.path === baseUrl)?.routes || [];

  function onLogoClick() {
    history.push('/');
  }

  return (
    <Routes2Menu routes={baseRoutes} mode={mode} />
    // <div className={styles.topMenu}>
    //   <MenuLogo onClick={onLogoClick} style={{paddingRight: '3vw'}}/>
    //   <TopUserBar />
    // </div>
  );
};

export default TopMenu;
