/*
 * @Author: your name
 * @Date: 2021-12-16 15:05:50
 * @LastEditTime: 2024-12-19 11:48:54
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /blog5.0_front-end/src/layouts/BasicLayout/index.tsx
 */

import React, { FC, useState, useEffect, useMemo } from 'react';
import { Layout, Drawer } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { useSize } from 'ahooks';
import Routes2Menu from 'components/Routes2Menu';
import MenuLogo from 'components/MenuLogo';
import UserMenu from 'components/UserMenu';
import { matchScreenModel } from 'utils/theme';

import styles from './index.less';

const { Header, Content, Footer } = Layout;

const BasicLayout: FC<any> = (props) => {
  const { children, routes, route } = props;
  /**
   * @params: inline
   */
  const [menuMode, setMenuMode] = useState<'inline' | 'horizontal'>(
    'horizontal',
  );
  const [drawerVisible, setDrawerVisible] = useState(false);

  // 页面大小变化触发
  function handleResize() {
    const include_sm = matchScreenModel('screen_sm');
    setMenuMode(include_sm ? 'inline' : 'horizontal');
  }

  const DrawerTitle = useMemo(
    function () {
      return (
        <div className={styles.drawerTitle}>
          <span>Veigar</span>
          {menuMode === 'inline' && (
            <>
              {drawerVisible ? (
                <MenuFoldOutlined
                  className={styles.menuIcon}
                  onClick={() => setDrawerVisible(false)}
                />
              ) : (
                <MenuUnfoldOutlined
                  className={styles.menuIcon}
                  onClick={() => setDrawerVisible(true)}
                />
              )}
            </>
          )}
        </div>
      );
    },
    [drawerVisible],
  );

  function onLogoClick() {
    history.push('/');
  }

  useEffect(function () {
    handleResize();
  }, []);

  return (
    <Layout className={styles.basicLayout}>
      {/* 移动端侧边栏菜单 */}
      {menuMode === 'inline' && (
        <Drawer
          title={DrawerTitle}
          className={styles.drawerClass}
          placement="left"
          closable={false}
          width={200}
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
        >
          <Routes2Menu routes={routes} route={route} theme="light" />
        </Drawer>
      )}
      {/* pc端顶部菜单 */}
      <Header className={styles.basicLayoutHeader}>
        <MenuLogo
          onClick={onLogoClick}
          style={{ paddingRight: 10 }}
          label={menuMode === 'inline' ? '' : 'Veigar'}
        />
        {menuMode === 'inline' && (
          <>
            {drawerVisible ? (
              <MenuFoldOutlined
                className={styles.menuIcon}
                onClick={() => setDrawerVisible(false)}
              />
            ) : (
              <MenuUnfoldOutlined
                className={styles.menuIcon}
                onClick={() => setDrawerVisible(true)}
              />
            )}
          </>
        )}
        {menuMode === 'horizontal' && (
          <Routes2Menu routes={routes} route={route} mode="horizontal" />
        )}
        <UserMenu style={{ marginLeft: 'auto' }} />
      </Header>
      <Content>
        <div>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child);
          })}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        zhangjc's blog ©2022 Created by jichengZhang
      </Footer>
    </Layout>
  );
};

export default BasicLayout;
