/*
 * @Author: your name
 * @Date: 2021-12-17 15:37:31
 * @LastEditTime: 2021-12-17 16:03:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\components\Routes2Menu\index.tsx
 */

import React, { FC, useCallback } from 'react';
import { history, IRoute } from 'umi';
import { Menu } from 'antd';

import styles from './index.less';

const { SubMenu, Item: MenuItem } = Menu;

interface Routes2MenuProps {
  routes: IRoute[],
}

const Routes2Menu: FC<Routes2MenuProps> = (props) => {

  const { routes } = props;

  // 根据routes 生成 menu dom 
  const initMenu = useCallback((routes: IRoute[]) => 
    routes.map(route => 
      route?.routes?.length ? 
      <SubMenu key={route.path} title={route.title}>
        {initMenu(route.routes)}
      </SubMenu> : 
      <MenuItem key={route.path}>{route.title}</MenuItem>
    )
  , [])

  return (
    <Menu
      mode="horizontal"
      theme="dark"
    >
      {initMenu(routes)}
    </Menu>
  )
}

export default Routes2Menu;