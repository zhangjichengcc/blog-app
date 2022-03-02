/*
 * @Author: zhangjicheng
 * @Date: 2022-03-01 22:59:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-02 23:51:56
 * @FilePath: \blog-app\src\components\UserMenu\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import { FC } from 'react';
import { Menu, Avatar, Modal } from 'antd';
import { UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
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
  const { username = '' } = userInfo;

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
          <Menu.Item key="center">User center</Menu.Item>
          <Menu.Item key="settings">Personal settings</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="logout" onClick={logout}>
            Log out
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login" onClick={() => history.push('/user/login')}>
            Sign in
          </Menu.Item>
          <Menu.Item
            key="register"
            onClick={() => history.push('/user/register')}
          >
            Sign up
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <div className={styles.userMenu} style={style}>
        <Avatar size={size} icon={<UserOutlined />} />
        <span className={styles.userName}>{username || '游客'}</span>
      </div>
    </HeaderDropdown>
  );
};

export default UserMenu;
