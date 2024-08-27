/*
 * @Author: zhangjicheng
 * @Date: 2022-08-29 11:40:01
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-08-27 00:52:14
 * @FilePath: /blog5.0_front-end/src/layouts/HomeLayout/index.tsx
 */
import { FC, ReactNode, useEffect, useState } from 'react';
import { Outlet } from 'umi';
import { useAppSelector } from '@/store';
import classnames from 'classnames';
import { TopMenu, BottomMenu } from '@/components/HomeMenu';
import GridContainer from '@/components/GridContainer';

import styles from './index.less';

const large = ['md', 'lg', 'xl', 'xxl'];
const small = ['xs', 'sm'];

const Layout: FC<{ children: ReactNode }> = () => {
  const menu = useAppSelector((state) => state.home.homeMenu);

  const grid = useAppSelector((state) => state.global.gird);

  const [paddingTop, setPaddingTop] = useState(0);
  const [paddingBottom, setPaddingBottom] = useState(0);

  console.log(grid);

  function onHeightChange(height: number) {
    setPaddingTop(height);
  }

  useEffect(() => {
    setPaddingBottom(large.includes(grid) ? 60 : 0);
  }, [grid]);

  return (
    <GridContainer>
      <div
        className={classnames(styles.layouts, styles[grid])}
        style={{ paddingTop, paddingBottom }}
      >
        {large.includes(grid) && (
          <TopMenu menu={menu} onHeightChange={onHeightChange} />
        )}
        <Outlet context={{ cssStyle: { paddingTop, paddingBottom } }} />
        {small.includes(grid) && <BottomMenu />}
      </div>
    </GridContainer>
  );
};

export default Layout;
