/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-27 16:28:02
 * @FilePath: \blog5.0_front-end\src\pages\Home\About\index.tsx
 */
import { forwardRef, useEffect, useRef } from 'react';
import Scroller from '@/utils/scroller';

import styles from './index.less';

const About = forwardRef<HTMLDivElement>((_props, ref) => {

  const scrollDom = useRef(null);
  const scroller = useRef<Scroller>();

  useEffect(function() {
    if(scrollDom.current) {
      global.a = scrollDom.current
      scroller.current = new Scroller(scrollDom.current);
    }
  }, [scrollDom])

  function scroll() {
    scroller.current?.scrollTo(800)
  }

  return (
    <div ref={ref} className={styles.about}>
      <h2 onClick={scroll}>about</h2>
      <div ref={scrollDom} className={styles.scrollContainer}>
        <div className={styles.scroller}>scroll</div>
      </div>
    </div>
  )
})

export default About;
