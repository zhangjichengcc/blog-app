/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-09-09 19:00:23
 * @FilePath: /blog5.0_front-end/src/pages/Home/About/index.tsx
 */
import { CSSProperties, forwardRef, useEffect, useRef } from 'react';
import Scroller from '@zhangjicheng/scroller';

import styles from './index.less';

const About = forwardRef<
  HTMLDivElement,
  {
    style?: CSSProperties;
    id?: string;
  }
>((props, ref) => {
  const scrollDom = useRef(null);
  const scroller = useRef<Scroller>();

  const { style, id } = props;

  useEffect(
    function () {
      if (scrollDom.current) {
        scroller.current = new Scroller(scrollDom.current);
      }
    },
    [scrollDom],
  );

  function scroll() {
    scroller.current?.start();
  }

  return (
    <div id={id} ref={ref} className={styles.about} style={style}>
      <h2 onClick={scroll}>about</h2>
      <div ref={scrollDom} className={styles.scrollContainer}>
        <div className={styles.scroller}>scroll</div>
      </div>
    </div>
  );
});

export default About;
