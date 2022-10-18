/*
 * @Author: your name
 * @Date: 2022-03-02 23:05:49
 * @LastEditTime: 2022-10-18 10:12:52
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog5.0_front-end\src\pages\Home\index.tsx
 */

import { FC, useEffect, useRef, ForwardedRef, createRef } from 'react';
import { useAppDispatch } from '@/store';
import { setMenu } from '@/store/features/home/homeSlice';
import Banner from './Banner';
import About from './About';
import Portfolio from './Portfolio';
import Service from './Service';
import Contact from './Contact';
import Blog from './Blog';

import styles from './index.less';

type DomRect = {
  x: number,
  y: number,
  width: number,
  height: number,
  top: number,
  left: number,
  bottom: number,
  right: number,
}

/** 获取DOMRect */
function getDomRect(dom?: HTMLElement | null): DomRect | Record<string, never> {
  if (!dom) return {};
  const {x, y, width, height, top, left, bottom, right} = dom.getBoundingClientRect();
  return {
    x, y, width, height, top, left, bottom, right
  }
}

const Home: FC = () => {
  const bannerDom = useRef<HTMLDivElement>(null);
  const aboutDom = useRef<HTMLDivElement>(null);
  const portfolioDom = useRef<HTMLDivElement>(null);
  const serviceDom = useRef<HTMLDivElement>(null);
  const contactDom = useRef<HTMLDivElement>(null);
  const blogDom = useRef<HTMLDivElement>(null);

  const appDispatch = useAppDispatch();

  useEffect(() => {

    console.log(888)
    appDispatch(setMenu([
      {label: 'Home', domRect: getDomRect(bannerDom.current)},
      {label: 'About', domRect: getDomRect(aboutDom.current)},
      {label: 'Portfolio', domRect: getDomRect(portfolioDom.current)},
      {label: 'Service', domRect: getDomRect(serviceDom.current)},
      {label: 'Contact', domRect: getDomRect(contactDom.current)},
      {label: 'Blog', domRect: getDomRect(blogDom.current)},
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
