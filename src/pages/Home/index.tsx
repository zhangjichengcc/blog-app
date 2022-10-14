/*
 * @Author: your name
 * @Date: 2022-03-02 23:05:49
 * @LastEditTime: 2022-10-14 19:07:33
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog5.0_front-end\src\pages\Home\index.tsx
 */

import { FC, useRef } from 'react';
import { useAppDispatch } from '@/store';
import { setMenu } from '@/store/features/home/homeSlice';
import Banner from './Banner';
import About from './About';

import styles from './index.less';

const Home: FC = () => {
  const bannerDom = useRef(null);
  const aboutDom = useRef();

  const appDispatch = useAppDispatch();

  appDispatch(setMenu([
    {label: 'Home', dom: bannerDom.current},
    {label: 'About', dom: aboutDom.current},
    {label: 'Portfolio'},
    {label: 'Service'},
    {label: 'Contact'},
    {label: 'Blog'},
  ]))

  console.log(bannerDom)

  return <div className={styles.home}>
    <Banner ref={bannerDom} />
    <About ref={aboutDom}/>
  </div>;
};

export default Home;
