/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-09-10 15:08:08
 * @FilePath: /blog5.0_front-end/src/pages/Home/About/index.tsx
 */
import { CSSProperties, forwardRef, useEffect, useRef } from 'react';
import Scroller from '@zhangjicheng/scroller';

import styles from './index.less';
import { formatDataset } from '@/utils/tools';

const About = forwardRef<
  HTMLDivElement,
  { style?: CSSProperties; id?: string; dataset?: Record<string, any> }
>((props, ref) => {
  const { style, id, dataset = {} } = props;

  const datasetMap = formatDataset(dataset);
  const scrollDom = useRef(null);
  const scroller = useRef<Scroller>();

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
    <div
      id={id}
      ref={ref}
      className={styles.about}
      style={style}
      {...datasetMap}
    >
      <h2 onClick={scroll}>about</h2>
      <div ref={scrollDom} className={styles.scrollContainer}>
        <div className={styles.scroller}>scroll</div>
      </div>
    </div>
  );
});

export default About;
