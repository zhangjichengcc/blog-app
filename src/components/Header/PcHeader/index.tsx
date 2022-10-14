/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 15:47:48
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-14 10:22:14
 * @FilePath: \blog5.0_front-end\src\components\Header\PcHeader\index.tsx
 */
import { FC } from 'react';
import Logo from '@/components/Logo';
import Menu, { MenuItem } from './Menu';
import classnames from 'classnames';
import { useScroll } from 'ahooks';
// import { throttle } from '@/utils/utils';
// import { useThrottle } from '@/hooks';

import styles from './index.less';

interface Props {
  menu: Array<MenuItem>
}

const Header: FC<Props> = (props) => {

  const {
    menu,
  } = props;

  const scroll = useScroll();

  // useEffect(function() {
  //   run();
  // }, [scroll?.top])

  return (
    <div className={classnames({[styles.Header]: true, [styles.active]: scroll?.top && scroll?.top > 200})}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.rightContent}>
          <Menu menu={menu} />
          <button>Download CV</button>
        </div>
      </div>
    </div>
  )
}

export default Header;