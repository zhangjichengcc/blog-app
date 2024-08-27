/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-08-26 19:06:44
 * @FilePath: /blog5.0_front-end/src/pages/Home/Banner/index.tsx
 */

import { forwardRef, CSSProperties } from 'react';
import { Col, Row } from 'antd';
import styles from './index.less';

const Banner = forwardRef<
  HTMLDivElement,
  { style?: CSSProperties; id?: string }
>((props, ref) => {
  return (
    <div ref={ref} className={styles.banner} {...props}>
      <a id={props.id}></a>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <div>
            <p>Hello I&apos;m</p>
            <p>JiCheng Zhang</p>
            <p>Web Developer</p>
            <p>Web Developer</p>
          </div>
          <div>
            <div>Get a Quote</div>
            <div>About Me</div>
          </div>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 16 }}>
          <div>right</div>
        </Col>
      </Row>
    </div>
  );
});

export default Banner;
