/*
 * @Author: zhangjicheng
 * @Date: 2022-03-01 22:59:24
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-03-08 22:02:59
 * @FilePath: \blog-app\src\components\UserMenu\index.tsx
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
import { getUserInfo } from 'utils/authority';
import { removeToken, removeUserInfo } from 'utils/authority';
import HeaderDropdown from 'components/HeaderDropdown';

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
};

const UserMenu: FC<UserMenuProps> = (props) => {
  const { size = 30, style = {} } = props;

  const userInfo = getUserInfo();
  const { username = '', avatar } = userInfo;

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
      {username ? (
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
          <Menu.Item key="login" onClick={() => history.push('/user/login')}>
            <LoginOutlined style={{ marginRight: 6 }} />
            Sign in
          </Menu.Item>
          <Menu.Item
            key="register"
            onClick={() => history.push('/user/register')}
          >
            <SolutionOutlined style={{ marginRight: 6 }} />
            Sign up
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <div className={styles.userMenu} style={style}>
        {avatar ? (
          <Avatar size={size} src={avatar} />
        ) : (
          <Avatar size={size} icon={<UserOutlined />} />
        )}
        <span className={styles.userName}>{username || '游客'}</span>
      </div>
    </HeaderDropdown>
  );
};

export default UserMenu;
