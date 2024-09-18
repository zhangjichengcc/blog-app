/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-09-18 18:33:47
 * @FilePath: /blog5.0_front-end/src/pages/Home/Banner/index.tsx
 */

import { FC, CSSProperties, useRef } from 'react';
import trophyIcon from '@/assets/Home/trophy.svg';
import { useAppSelector } from '@/store';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { formatDataset } from '@/utils/tools';
import classNames from 'classnames';
import CircularText from '@/components/CircularText';
import StrokeText from '@/components/StrokeText';
import classnames from 'classnames';

import styles from './index.less';

// 注册插件
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner: FC<{
  style?: CSSProperties;
  id?: string;
  dataset?: Record<string, any>;
}> = (props) => {
  const { id, dataset = {} } = props;
  const ref = useRef<HTMLDivElement>(null);
  const leftCol = useRef<HTMLDivElement>(null);
  const rightCol = useRef<HTMLDivElement>(null);

  const grid = useAppSelector((state) => state.global.gird);

  const datasetMap = formatDataset(dataset);

  /**
   * 设置动画
   */
  useGSAP(() => {
    const moduleHeight = ref.current?.offsetHeight;
    const [avatar] = rightCol.current!.children;
    // 视差滚动
    gsap.fromTo(
      ref.current,
      {
        backgroundPositionY: `-50vh`,
      },
      {
        backgroundPositionY: `50vh`,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          scrub: true,
        },
      },
    );
    // 元素动画
    gsap.fromTo(
      leftCol.current,
      {
        x: 0,
      },
      {
        x: '-100%',
        ease: 'linear',
        scrollTrigger: {
          scrub: 1,
          start: 0, // 滚动起点
          end: `+=${moduleHeight}`, // 滚动的终点为模块的高度
        },
      },
    );
    gsap.fromTo(
      rightCol.current,
      {
        x: 0,
      },
      {
        x: '100%',
        ease: 'linear',
        scrollTrigger: {
          scrub: 1,
          start: 0, // 滚动起点
          end: `+=${moduleHeight}`, // 滚动的终点为模块的高度
        },
      },
    );
    avatar.childNodes.forEach((dom: ChildNode) => {
      gsap.fromTo(
        dom,
        {
          x: 0,
          opacity: 1,
        },
        {
          x: '100%',
          opacity: 0,
          ease: 'linear',
          scrollTrigger: {
            scrub: 1,
            start: 0, // 滚动起点
            end: `+=${moduleHeight}`, // 滚动的终点为模块的高度
          },
        },
      );
    });
  });

  return (
    <div
      id={id}
      ref={ref}
      className={classNames(styles.banner, grid && styles['grid-' + grid])}
      // ! 不使用style paddingTop
      // style={style}
      {...datasetMap}
    >
      <div className={styles.row}>
        <div ref={leftCol} className={styles['col-left']}>
          <StrokeText
            className={styles['stroke-text']}
            style={{ transform: 'translate(-30%, -110%)' }}
            strokeColor={'rgba(255, 255, 255, 0.2)'}
          >
            JiCheng
          </StrokeText>
          <StrokeText
            className={styles['stroke-text']}
            style={{ transform: 'rotate(90deg) translate(40%, 110%)' }}
            strokeColor={'rgba(255, 255, 255, 0.2)'}
          >
            Zhang
          </StrokeText>
          <div className={styles.description}>
            <p className={styles.hello}>Hello I&apos;m</p>
            <p className={styles.name}>JiCheng Zhang</p>
            <p className={styles.job}>Web Developer</p>
            <p className={styles.info}>
              Communicate requirements, technology selection and solution
              output, and be responsible for project framework construction
            </p>
          </div>
          <div className={styles['button-group']}>
            <div className={styles.button}>
              <a href="#contact">Contact</a>
            </div>
            <div className={styles['simple-button']}>
              <a href="#about">About Me</a>
            </div>
          </div>
        </div>
        <div ref={rightCol} className={styles['col-right']}>
          <div className={styles.avatar}>
            <div
              className={classnames(styles.flag, styles.flag1)}
              style={{ top: '10%', marginLeft: '-32%' }}
            >
              <span className={styles.num} style={{ color: '#50c5f0' }}>
                10
              </span>
              <div className={styles.text}>
                <span>Years of</span>
                <span>Success</span>
              </div>
            </div>
            <div
              className={classnames(styles.flag, styles.flag2)}
              style={{
                bottom: '5%',
                right: '-40%',
              }}
            >
              <span className={styles.num} style={{ color: '#f05c6e' }}>
                80
                <i>+</i>
              </span>
              <div className={styles.text}>
                <span>Projects</span>
                <span>Completed</span>
              </div>
            </div>
            <div
              className={styles.trophy}
              style={{ backgroundImage: `url(${trophyIcon})` }}
            ></div>
            <CircularText
              radius={70}
              fontSize={33}
              fontColor="rgba(255, 255, 255, 0.7)"
              className={styles.circularText}
            >
              Creative Web Developer from Dalian, China
            </CircularText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
