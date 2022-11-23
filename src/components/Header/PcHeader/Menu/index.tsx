/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:41:44
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-27 20:58:17
 * @FilePath: \blog5.0_front-end\src\components\Header\PcHeader\Menu\index.tsx
 */
import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Scroller from '@zhangjicheng/scroller';
import { deepClone } from '@/utils';
import { useScroll } from 'ahooks';

import styles from './index.less';

/**
 * DomReact 属性
 */
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

/**
 * 菜单项
 */
interface MenuItem {
  /** 菜单关键字 */
  key: string,
  /** 菜单名称 */
  label: string,
  /** dom定位信息 */
  domRect: DomRect
}

/** 获取DOMRect */
function getDomRect(dom?: HTMLElement | null): DomRect {
  if (!dom) return {x: 0, y: 0, width: 0, height: 0, top: 0, left: 0, bottom: 0, right: 0};
  const {x, y, width, height, top, left, bottom, right} = dom.getBoundingClientRect();
  return {
    x, y, width, height, top, left, bottom, right
  };
}

interface Props {
  menu: Array<MenuItem>,
}

export default function Menu(props: Props) {

  const {
    menu = [],
  } = props;

  const menus = deepClone(menu).sort((a, b) => b?.domRect?.top - a?.domRect?.top);

  const scroller = useRef<Scroller>();
  const scroll = useScroll();
  const [activeKey, setActiveKey] = useState(menu[0]?.key);

  

  function goView(item: MenuItem) {
    function cb(y: number) {
      console.log(y);
    }
    scroller.current?.scrollTo(item.domRect.top, cb);
  }

  function matchActive() {
    if (!scroll) return;
    for(const item of menus) {
      const { domRect: { top }, key } = item;
      if (scroll?.top >= top - 100) {
        setActiveKey(key);
        break;
      }
    }
  }

  useEffect(function() {
    matchActive();
  }, [scroll?.top])

  useEffect(function() {
    scroller.current = new Scroller();
  }, [])

  return (
    <ul className={styles.menu}>
      {
        menu.map((item) => {
          const {label} = item;
          return (
            <li className={classnames({[styles.active]: activeKey === item.key})} onClick={() => goView(item)} key={label}>{label}</li>
          )
        })
      }
    </ul>
  )
}

export {
  DomRect,
  MenuItem,
  getDomRect,
}