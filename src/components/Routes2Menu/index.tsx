/*
 * @Author: your name
 * @Date: 2021-12-17 15:37:31
 * @LastEditTime: 2022-02-28 18:35:26
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\components\Routes2Menu\index.tsx
 */

import React, { FC, useCallback, useState, useEffect } from 'react';
import { history, IRoute } from 'umi';
import { Menu, Drawer } from 'antd';

import styles from './index.less';

const { SubMenu, Item: MenuItem } = Menu;

interface Routes2MenuProps {
  /**
   * 需要生成导航的路由列表
   */
  routes: IRoute[];
  /**
   * 当前路由前缀，如在 '/user' 下的子路由列表，则传 '/user' 该字段用于生成key，默认 '/'
   */
  prefix?: string;
  mode?: 'inline' | 'horizontal';
}

const Routes2Menu: FC<Routes2MenuProps> = (props) => {
  const { routes, prefix = '/', mode = 'inline' } = props;

  function openView(e: { keyPath: any }) {
    const { keyPath } = e;
    history.push(keyPath[0]);
  }

  // 根据routes 生成 menu dom
  const initMenu = useCallback(
    (routes: IRoute[], _path = prefix) =>
      routes
        .filter((route) => route.title) // 过滤掉无title路由，不展示
        .map((route) =>
          route?.routes?.length ? (
            <SubMenu key={`${_path}${route.path}`} title={route.title}>
              {initMenu(route.routes, route.path)}
            </SubMenu>
          ) : (
            <MenuItem key={route.path}>{route.title}</MenuItem>
          ),
        ),
    [],
  );

  return (
    <Menu mode={mode} theme="dark" onClick={openView}>
      {initMenu(routes)}
    </Menu>
  );
};

export default Routes2Menu;
