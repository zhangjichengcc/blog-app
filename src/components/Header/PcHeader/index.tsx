/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 15:47:48
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-25 18:35:53
 * @FilePath: \blog5.0_front-end\src\components\Header\PcHeader\index.tsx
 */
import { FC, useEffect, useRef } from 'react';
import Logo from '@/components/Logo';
import Menu, { MenuItem } from './Menu';
import classnames from 'classnames';
import Scroller from '@/utils/scroller';
import { useScroll } from 'ahooks';


import styles from './index.less';

interface Props {
  menu: Array<MenuItem>
}

const Header: FC<Props> = (props) => {

  const {
    menu,
  } = props;

  const scroll = useScroll();

  const scroller = useRef<Scroller>();

  globalThis.scroller = scroller.current;

  // useEffect(function() {
  //   run();
  // }, [scroll?.top])

  function scrollFn() {
    // const dom = window;
    // window.scrollTo(0, top);
    // top += 10;
    // window.requestAnimationFrame(scrollFn);
    scroller.current?.scrollTo(700)
  }

  useEffect(() => {
    scroller.current = new Scroller();
  }, [])

  return (
    <div className={classnames({[styles.Header]: true, [styles.active]: scroll?.top && scroll?.top > 200})}>
      <div className={styles.container}>
        <Logo />
        <div className={styles.rightContent}>
          <Menu menu={menu} />
          <button onClick={scrollFn}>Download CV</button>
        </div>
      </div>
    </div>
  )
}

export default Header;