/*
 * @Author: zhangjicheng
 * @Date: 2022-03-01 22:59:24
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-03-02 18:45:24
 * @FilePath: \blog-app\src\components\UserMenu\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import { FC } from 'react';
import { Menu, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { getUserInfo } from 'utils/authority';
import HeaderDropdown from 'components/HeaderDropdown';

import styles from './index.less';

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

  const menuHeaderDropdown = (
    <Menu selectedKeys={[]}>
      {username ? (
        <>
          <Menu.Item key="center">个人中心</Menu.Item>
          <Menu.Item key="settings">个人设置</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="logout">退出登录</Menu.Item>
        </>
      ) : (
        <Menu.Item key="login" onClick={() => history.push('/login')}>
          登录/注册
        </Menu.Item>
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
