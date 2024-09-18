/*
 * @Author: zhangjicheng
 * @Date: 2022-08-29 11:40:01
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-09-18 18:13:58
 * @FilePath: /blog5.0_front-end/src/layouts/HomeLayout/index.tsx
 */
import { CSSProperties, FC, ReactNode, useEffect, useState } from 'react';
import { Outlet } from 'umi';
import { useAppSelector } from '@/store';
import classnames from 'classnames';
import { TopMenu, BottomMenu } from '@/components/HomeMenu';
import GridContainer from '@/components/GridContainer';

import styles from './index.less';
import Copyright from '@/components/Copyright';

export interface OutletContextProps {
  cssStyle: CSSProperties;
}

const large = ['md', 'lg', 'xl', 'xxl'];

const Layout: FC<{ children: ReactNode }> = () => {
  const { menu, grid, activeKey } = useAppSelector((state) => ({
    menu: state.home.homeMenu,
    activeKey: state.home.activeMenu,
    grid: state.global.gird,
  }));
  /** 记录头部及底部菜单高度 */
  const [menuHeightObj, setMenuHeightObj] = useState({
    top: 0,
    bottom: 60,
  });
  const [menuHeight, setMenuHeight] = useState(0);

  const menuPosition = large.includes(grid) ? 'top' : 'bottom';

  /**
   * 头部menu高度变化触发
   * @param {number} height
   */
  function onHeightChange(height: number) {
    setMenuHeightObj((item) => ({
      ...item,
      top: height,
    }));
  }

  useEffect(() => {
    setMenuHeight(menuHeightObj[menuPosition]);
  }, [grid, menuHeightObj.top, menuHeightObj.bottom]);

  return (
    <GridContainer>
      <div
        className={classnames(styles.layouts, styles[grid])}
        style={menuPosition === 'bottom' ? { paddingBottom: 50 } : {}}
      >
        {menuPosition === 'top' && (
          <TopMenu
            menu={menu}
            activeKey={activeKey}
            onHeightChange={onHeightChange}
          />
        )}
        <Outlet
          context={{
            cssStyle: {
              [{ top: 'paddingTop', bottom: 'paddingBottom' }[menuPosition]]:
                menuHeight,
            },
          }}
        />
        <Copyright />
        {menuPosition === 'bottom' && (
          <BottomMenu menu={menu} activeKey={activeKey} />
        )}
      </div>
    </GridContainer>
  );
};

export default Layout;
