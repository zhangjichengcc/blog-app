/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-09-09 19:03:03
 * @FilePath: /blog5.0_front-end/src/pages/Home/Banner/index.tsx
 */

import { forwardRef, CSSProperties } from 'react';
import { Col, Row } from 'antd';
import styles from './index.less';

const Banner = forwardRef<
  HTMLDivElement,
  { style?: CSSProperties; id?: string }
>((props, ref) => {
  const { style, id } = props;

  return (
    <div id={id} ref={ref} className={styles.banner} style={style}>
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
