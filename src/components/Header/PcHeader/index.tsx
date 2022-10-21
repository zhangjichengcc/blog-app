/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 15:47:48
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-20 15:03:35
 * @FilePath: \blog5.0_front-end\src\components\Header\PcHeader\index.tsx
 */
import { FC, useEffect, useRef } from 'react';
import Logo from '@/components/Logo';
import Menu, { MenuItem } from './Menu';
import classnames from 'classnames';
import { useScroll } from 'ahooks';
import tweenFunctions from 'tween-functions';
// import { throttle } from '@/utils/utils';
// import { useThrottle } from '@/hooks';


import styles from './index.less';

type TweenFunctionsType = 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint' | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInExpo' | 'easeOutExpo' | 'easeInOutExpo' | 'easeInCirc' | 'easeOutCirc' | 'easeInOutCirc' | 'easeInElastic' | 'easeOutElastic' | 'easeInOutElastic' | 'easeInBack' | 'easeOutBack' | 'easeInOutBack' | 'easeInBounce' | 'easeOutBounce' | 'easeInOutBounce';


interface Props {
  menu: Array<MenuItem>
}

class Scroller {

  element: HTMLElement | Window;
  easing: TweenFunctionsType;
  scrollId: number | undefined;
  source: number;
  target: number;
  duration: number;
  prevTimestamp: number;

  constructor(element?: HTMLElement) {
    this.scrollId;
    this.element = element || window;
    this.easing = 'easeOutCubic';
    this.prevTimestamp = 0;
    this.target = 0;
    this.source = 0;
    this.duration = 250;
  }

  step(timestamp: number) {
    if (!this.prevTimestamp) this.prevTimestamp = timestamp; 
    const currentTime = timestamp - this.prevTimestamp;
    const value = tweenFunctions[this.easing](currentTime, this.source, this.target, this.duration);
    this.element.scrollTo(0, value);
    if (value < this.target) {
      this.scrollId = requestAnimationFrame(this.step.bind(this));
    } else {
      this.source = this.target;
    }
  }

  scrollTo(y: number) {
    this.prevTimestamp = 0;
    this.target = y;
    this.scrollId = requestAnimationFrame(this.step.bind(this));
  }
}

const Header: FC<Props> = (props) => {

  const {
    menu,
  } = props;

  const scroll = useScroll();
  const scroller = useRef();

  // useEffect(function() {
  //   run();
  // }, [scroll?.top])

  function scrollFn() {
    // const dom = window;
    // window.scrollTo(0, top);
    // top += 10;
    // window.requestAnimationFrame(scrollFn);
    scroller.current.scrollTo(700)
  }

  useEffect(() => {
    scroller.current = new Scroller();
  })

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