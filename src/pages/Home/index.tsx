/*
 * @Author: your name
 * @Date: 2022-03-02 23:05:49
 * @LastEditTime: 2022-10-17 19:01:00
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog5.0_front-end\src\pages\Home\index.tsx
 */

import React, { FC, useEffect, useRef, ForwardedRef, createRef } from 'react';
import { useAppDispatch } from '@/store';
import { setMenu } from '@/store/features/home/homeSlice';
import Banner from './Banner';
import About from './About';
import Portfolio from './Portfolio';
import Service from './Service';
import Contact from './Contact';
import Blog from './Blog';

import styles from './index.less';

function getDomRect<HTMLElement>(dom): any {

}

const Home: FC = () => {
  const bannerDom = useRef<HTMLDivElement>();
  const aboutDom = useRef<HTMLDivElement>();
  const portfolioDom = useRef<HTMLDivElement>();
  const serviceDom = useRef<HTMLDivElement>(null);
  const contactDom = useRef<HTMLDivElement>();
  const blogDom = useRef<HTMLDivElement>();

  const appDispatch = useAppDispatch();

  // appDispatch(setMenu([
  //   {label: 'Home', dom: bannerDom.current},
  //   {label: 'About', dom: aboutDom.current},
  //   {label: 'Portfolio'},
  //   {label: 'Service'},
  //   {label: 'Contact'},
  //   {label: 'Blog'},
  // ]))

  useEffect(() => {

    globalThis.dom = aboutDom.current;
    appDispatch(setMenu([
      {label: 'Home', DOMRect: bannerDom.current?.getBoundingClientRect()},
      {label: 'About', DOMRect: bannerDom.current?.getBoundingClientRect()},
      {label: 'Portfolio', DOMRect: bannerDom.current?.getBoundingClientRect()},
      {label: 'Service', DOMRect: bannerDom.current?.getBoundingClientRect()},
      {label: 'Contact', DOMRect: bannerDom.current?.getBoundingClientRect()},
      {label: 'Blog', DOMRect: bannerDom.current?.getBoundingClientRect()},
    ]))
  }, [bannerDom.current])

  console.log(bannerDom)
  console.log(aboutDom)

  return <div className={styles.home}>
    <Banner ref={bannerDom} />
    <About ref={aboutDom} />
    <Portfolio ref={portfolioDom} />
    <Service ref={serviceDom} />
    <Contact ref={contactDom} />
    <Blog ref={blogDom} />
  </div>;
};

export default Home;
