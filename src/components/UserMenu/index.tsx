/*
 * @Author: zhangjicheng
 * @Date: 2022-03-01 22:59:24
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-12-19 17:38:04
 * @FilePath: /blog5.0_front-end/src/components/UserMenu/index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import { FC } from 'react';
import { Menu, Avatar, Modal } from 'antd';
import {
  UserOutlined,
  ExclamationCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  SolutionOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import { getUserInfo, goLogin, goRegister } from 'utils/authority';
import { removeToken, removeUserInfo } from 'utils/authority';
import HeaderDropdown from 'components/HeaderDropdown';
import { ReactComponent as UserSvg } from 'assets/global/user.svg';

import styles from './index.less';

const { confirm } = Modal;

type UserMenuProps = {
  /**
   * icon 大小, 默认30
   */
  size?: number;
  /**
   * @style: 样式
   */
  style?: object;
  /**
   * @redirect: 登录后跳转的地址
   */
  redirect?: string;
};

const UserMenu: FC<UserMenuProps> = (props) => {
  const { size = 30, style = {}, redirect } = props;

  const userInfo = getUserInfo();
  const { username = '', avatar } = userInfo;

  const isLogin = !!username;

  function logout() {
    confirm({
      title: 'Do you want logout?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, You will be logged out',
      onOk() {
        removeToken();
        removeUserInfo();
        history.push('/');
      },
      onCancel() {},
    });
  }

  const menuHeaderDropdown = (
    <Menu selectedKeys={[]}>
      {isLogin ? (
        <>
          <Menu.Item key="center">
            <UserOutlined style={{ marginRight: 6 }} />
            User center
          </Menu.Item>
          <Menu.Item key="settings">
            <SettingOutlined style={{ marginRight: 6 }} />
            Personal settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="logout" onClick={logout}>
            <LogoutOutlined style={{ marginRight: 6 }} />
            Log out
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login" onClick={() => goLogin(redirect || window.location.pathname)}>
            <LoginOutlined style={{ marginRight: 6 }} />
            Sign in
          </Menu.Item>
          <Menu.Item
            key="register"
            onClick={() => goRegister(redirect || window.location.pathname)}
          >
            <SolutionOutlined style={{ marginRight: 6 }} />
            Sign up
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown} placement="topRight">
      <div className={styles.userMenu} style={style}>
        {avatar ? (
          <Avatar size={size} src={avatar} />
        ) : (
          <Avatar size={size} style={{ fontSize: 20 }} icon={<UserSvg />} />
        )}
        <span className={styles.userName}>{username || '游客'}</span>
      </div>
    </HeaderDropdown>
  );
};

export default UserMenu;
