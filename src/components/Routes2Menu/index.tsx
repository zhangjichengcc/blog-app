/*
 * @Author: your name
 * @Date: 2021-12-17 15:37:31
 * @LastEditTime: 2022-03-01 17:52:20
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\components\Routes2Menu\index.tsx
 */

import React, { FC, useCallback, useState, useEffect } from 'react';
import { history, IRoute } from 'umi';
import { Menu, Drawer } from 'antd';

import styles from './index.less';

const { SubMenu, Item: MenuItem } = Menu;

// 根据routes 生成 menu dom
function initMenu(routes: IRoute[]): any {
  return routes
    .filter((item: IRoute) => item.title || item.routes)
    .map((route: IRoute) => {
      const { title, routes, path } = route;
      if (routes?.length) {
        return title ? (
          <SubMenu key={path} title={title}>
            {initMenu(routes)}
          </SubMenu>
        ) : (
          initMenu(routes)
        );
      }
      return <MenuItem key={path}>{title}</MenuItem>;
    });
}

interface Routes2MenuProps {
  /**
   * 需要生成导航的路由列表
   */
  routes: IRoute[];
  /**
   * 当前路由前缀，如在 '/user' 下的子路由列表，则传 '/user' 该字段用于生成key，默认 '/'
   */
  prefix?: string;
  route: IRoute;
  mode?: 'inline' | 'horizontal';
  theme?: 'light' | 'dark';
}

const Routes2Menu: FC<Routes2MenuProps> = (props) => {
  const { routes, mode = 'inline', theme = 'dark' } = props;

  const { pathname = '/' } = window.location;

  function openView(e: { keyPath: any }) {
    const { keyPath } = e;
    history.push(keyPath[0]);
  }

  return (
    <Menu
      selectedKeys={[pathname]}
      mode={mode}
      theme={theme}
      onClick={openView}
    >
      {initMenu(routes)}
    </Menu>
  );
};

export default Routes2Menu;
