/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 15:47:48
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-12 19:00:23
 * @FilePath: \blog5.0_front-end\src\components\PageMenu\Menu\index.tsx
 */
import { FC, useEffect, useRef } from 'react';
import Logo from '@/components/Logo';
import classnames from 'classnames';
import { useScroll } from 'ahooks';
// import { throttle } from '@/utils/utils';
import { useThrottle } from '@/hooks';

import styles from './index.less';



const Menu: FC = () => {

  const scroll = useScroll();

  // useEffect(function() {
  //   run();
  // }, [scroll?.top])

  return (
    <div className={classnames({[styles.Menu]: true, [styles.active]: scroll?.top})}>
      <Logo />
    </div>
  )
}

export default Menu;