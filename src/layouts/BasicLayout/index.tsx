/*
 * @Author: your name
 * @Date: 2021-12-16 15:05:50
 * @LastEditTime: 2022-02-28 19:00:55
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\layouts\BasicLayout\index.tsx
 */

import React, { FC, useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Drawer } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { onWindowResize } from '@utils';
import { getBreakpointWidth } from 'utils/attribute';

import TopMenu from '@/components/TopMenu';

import styles from './index.less';

const { Header, Content, Footer, Sider } = Layout;

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

  useEffect(function () {
    onWindowResize(handleResize);
  });

  return (
    // <div className={styles.basicLayout}>
    //   <TopMenu routes={routes} route={route} />
    //   {React.Children.map(children, (child) => {
    //     return React.cloneElement(child);
    //   })}
    // </div>
    <Layout className={styles.basicLayout}>
      {menuMode === 'inline' && (
        <Drawer
          title="Basic Drawer"
          className={styles.drawerClass}
          placement="left"
          closable={false}
          width={200}
          onClose={() => setDrawerVisiable(false)}
          visible={drawerVisiable}
        >
          <TopMenu routes={routes} route={route} />
        </Drawer>
      )}
      <Header className={styles.basicLayoutHeader}>
        {menuMode === 'inline' && (
          <>
            {drawerVisiable ? (
              <MenuFoldOutlined onClick={() => setDrawerVisiable(false)} />
            ) : (
              <MenuUnfoldOutlined onClick={() => setDrawerVisiable(true)} />
            )}
          </>
        )}
        {menuMode === 'horizontal' && (
          <TopMenu routes={routes} route={route} mode="horizontal" />
        )}
      </Header>
      <Content>
        <div>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child);
          })}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default BasicLayout;
