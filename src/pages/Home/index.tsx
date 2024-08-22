/*
 * @Author: zhangjicheng
 * @Date: 2022-03-02 23:05:49
 * @LastEditTime: 2024-08-21 16:24:24
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /blog5.0_front-end/src/pages/Home/index.tsx
 */

import { FC, useEffect, useRef } from 'react';
import { useAppDispatch } from '@/store';
import { MenuItem } from '@/components/Header';
import { setMenu } from '@/store/features/home/homeSlice';
import { getDomRect } from '@/components/Header';
import Banner from './Banner';
import About from './About';
import Portfolio from './Portfolio';
import Service from './Service';
import Contact from './Contact';
import Blog from './Blog';

import styles from './index.less';


const Home: FC = () => {
  const bannerDom = useRef<HTMLDivElement>(null);
  const aboutDom = useRef<HTMLDivElement>(null);
  const portfolioDom = useRef<HTMLDivElement>(null);
  const serviceDom = useRef<HTMLDivElement>(null);
  const contactDom = useRef<HTMLDivElement>(null);
  const blogDom = useRef<HTMLDivElement>(null);

  const appDispatch = useAppDispatch();

  useEffect(() => {
    const menu: Array<MenuItem> = [
      {label: 'Home', key: 'home', domRect: getDomRect(bannerDom.current)},
      {label: 'About', key: 'about', domRect: getDomRect(aboutDom.current)},
      {label: 'Portfolio', key: 'portfolio', domRect: getDomRect(portfolioDom.current)},
      {label: 'Service', key: 'service', domRect: getDomRect(serviceDom.current)},
      {label: 'Contact', key: 'contact', domRect: getDomRect(contactDom.current)},
      {label: 'Blog', key: 'blog', domRect: getDomRect(blogDom.current)},
    ]
    appDispatch(setMenu(menu))
  }, [bannerDom.current])

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
