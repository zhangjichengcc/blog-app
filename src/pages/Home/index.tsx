/*
 * @Author: zhangjicheng
 * @Date: 2022-03-02 23:05:49
 * @LastEditTime: 2024-09-18 17:10:41
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /blog5.0_front-end/src/pages/Home/index.tsx
 */

import { FC, useCallback, useEffect, useRef } from 'react';
import { useOutletContext } from 'umi';
import type { OutletContextProps } from '@/layouts/HomeLayout';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useAppDispatch } from '@/store';
import { MenuItem } from '@/components/HomeMenu';
import { setActiveMenu, setMenu } from '@/store/features/home/homeSlice';
import { debounce } from '@/utils';
import Banner from './Banner';
import About from './About';
import Portfolio from './Portfolio';
import Service from './Service';
import Contact from './Contact';
import Blog from './Blog';

import styles from './index.less';

/** 首页模块列表 */
const sections = [
  {
    component: Banner,
    label: 'Home',
    key: 'home',
  },
  {
    component: About,
    label: 'About',
    key: 'about',
  },
  {
    component: Portfolio,
    label: 'Portfolio',
    key: 'portfolio',
  },
  {
    component: Service,
    label: 'Service',
    key: 'service',
  },
  {
    component: Contact,
    label: 'Contact',
    key: 'contact',
  },
  {
    component: Blog,
    label: 'Blog',
    key: 'blog',
  },
] as const;

export type MenuKey = (typeof sections)[number]['key'];

// 注册插件
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Home: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const layoutContext = useOutletContext<OutletContextProps>() || {};
  const appDispatch = useAppDispatch();
  const { cssStyle } = layoutContext;

  /**
   * 初始化首页目录导航
   */
  function initMenu() {
    const menu: MenuItem[] = sections.map((item) => ({
      label: item.label,
      key: item.key,
    }));

    // 设置菜单
    appDispatch(setMenu(menu));
  }

  /**
   * 使用函数节流设置激活菜单，防止频繁触发activeKey
   */
  const setActiveMenuDebounce = useCallback(
    debounce((key) => appDispatch(setActiveMenu(key))),
    [],
  );

  /**
   * 监听滚动，设置当前模块
   */
  function bindMenuScroll() {
    const { childNodes } = ref.current!;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { isIntersecting, target } = entry;
          const { dataset } = target as HTMLElement;
          if (isIntersecting) {
            const { label, key } = dataset;
            setActiveMenuDebounce(key);
            document.title = label!;
          }
        });
      },
      { threshold: 0.5 },
    );

    childNodes.forEach((node) => {
      node instanceof Element && observer.observe(node);
    });

    return () => observer.disconnect();
  }

  useEffect(() => {
    initMenu();
    bindMenuScroll();
  }, []);

  return (
    <div ref={ref} className={styles.home}>
      {sections.map((item) => (
        <item.component
          dataset={item}
          key={item.key}
          id={item.key}
          style={{
            ...cssStyle,
            transition: 'padding .3s ease',
          }}
        />
      ))}
    </div>
  );
};

export default Home;
