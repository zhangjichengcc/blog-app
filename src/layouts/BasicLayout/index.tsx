/*
 * @Author: your name
 * @Date: 2021-12-16 15:05:50
 * @LastEditTime: 2022-03-02 11:06:07
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\layouts\BasicLayout\index.tsx
 */

import React, { FC, useState, useEffect, useMemo } from 'react';
import { Layout, Drawer } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { onWindowResize } from '@utils';
import { history } from 'umi';
import Routes2Menu from 'components/Routes2Menu';
import MenuLogo from 'components/MenuLogo';
import UserMenu from 'components/UserMenu';
import { getBreakpointWidth } from 'utils/attribute';

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
  const [drawerVisiable, setDrawerVisiable] = useState(false);

  // 页面大小变化触发
  function handleResize() {
    let clientW = document.documentElement.clientWidth;
    // 获取md相应宽度
    const md = getBreakpointWidth('md');
    setMenuMode(clientW < md ? 'inline' : 'horizontal');
  }

  const DrawerTitle = useMemo(
    function () {
      return (
        <div className={styles.drawerTitle}>
          <span>Veigar</span>
          {menuMode === 'inline' && (
            <>
              {drawerVisiable ? (
                <MenuFoldOutlined
                  className={styles.menuIcon}
                  onClick={() => setDrawerVisiable(false)}
                />
              ) : (
                <MenuUnfoldOutlined
                  className={styles.menuIcon}
                  onClick={() => setDrawerVisiable(true)}
                />
              )}
            </>
          )}
        </div>
      );
    },
    [drawerVisiable],
  );

  function onLogoClick() {
    history.push('/');
  }

  useEffect(function () {
    onWindowResize(handleResize);
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
          onClose={() => setDrawerVisiable(false)}
          visible={drawerVisiable}
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
            {drawerVisiable ? (
              <MenuFoldOutlined
                className={styles.menuIcon}
                onClick={() => setDrawerVisiable(false)}
              />
            ) : (
              <MenuUnfoldOutlined
                className={styles.menuIcon}
                onClick={() => setDrawerVisiable(true)}
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
