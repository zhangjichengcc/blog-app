/*
 * @Author: your name
 * @Date: 2022-03-02 23:05:49
 * @LastEditTime: 2022-10-12 23:23:45
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /blog5.0_front-end/src/pages/Home/index.tsx
 */

import { FC } from 'react';
import Banner from './Banner';
import About from './About';

import styles from './index.less';

const Home: FC = () => {
  return <div className={styles.home}>
    <Banner />
    <About />
  </div>;
};

export default Home;
