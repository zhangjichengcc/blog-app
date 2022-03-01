/*
 * @Author: zhangjicheng
 * @Date: 2022-03-01 22:59:24
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-03-01 23:06:05
 * @FilePath: \blog-app\src\components\UserMenu\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import { FC } from 'react';
import { Menu, Dropdown } from 'antd';
import HeaderDropdown from 'components/HeaderDropdown';

const menuHeaderDropdown = (
  <Menu selectedKeys={[]}>
    <Menu.Item key="center">个人中心</Menu.Item>
    <Menu.Item key="settings">个人设置</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">退出登录</Menu.Item>
  </Menu>
);

const UserMenu: FC = () => {
  return <Dropdown overlay={menuHeaderDropdown}>hover 展示菜单</Dropdown>;
};

export default UserMenu;
