/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-09-12 18:44:06
 * @FilePath: /blog5.0_front-end/src/pages/Home/Banner/index.tsx
 */

import { forwardRef, CSSProperties } from 'react';
import trophyIcon from '@/assets/Home/trophy.svg';
import { useAppSelector } from '@/store';
import styles from './index.less';
import { formatDataset } from '@/utils/tools';
import classNames from 'classnames';

const Banner = forwardRef<
  HTMLDivElement,
  { style?: CSSProperties; id?: string; dataset?: Record<string, any> }
>((props, ref) => {
  const { id, dataset = {} } = props;
  const grid = useAppSelector((state) => state.global.gird);

  const datasetMap = formatDataset(dataset);

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
        <div className={styles['col-left']}>
          <div className={styles.description}>
            <p className={styles.hello}>Hello I&apos;m</p>
            <p className={styles.name}>JiCheng Zhang</p>
            <p className={styles.job}>Web Developer</p>
            <p className={styles.info}>
              Jodi kokhono vul hoye jai tumi oporadh nio na ptate velit esse
              cillum dolore
            </p>
          </div>
          <div className={styles['button-group']}>
            <div className={styles.button}>Get a Quote</div>
            <div className={styles['simple-button']}>
              <a href="#about">About Me</a>
            </div>
          </div>
        </div>
        <div className={styles['col-right']}>
          <div className={styles.avatar}>
            <div
              className={styles.flag}
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
              className={styles.flag}
              style={{
                bottom: '5%',
                right: '-40%',
              }}
            >
              <span className={styles.num} style={{ color: '#f05c6e' }}>
                80
                <i
                  style={{
                    display: 'inline-block',
                    fontSize: '28px',
                    fontStyle: 'normal',
                    transform: 'translateY(6px)',
                  }}
                >
                  +
                </i>
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
            <div className="circular" style={{ width: 150, height: 150 }}>
              <svg viewBox="0 0 300 300">
                <path
                  id="circlePath"
                  d="M 150,150 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
                  fill="none"
                  stroke="none"
                />

                <text fontSize={18} fill="rgba(255,255,255,.7)">
                  <textPath
                    href="#circlePath"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    Creative Web Developer from Dalian, China
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Banner;
