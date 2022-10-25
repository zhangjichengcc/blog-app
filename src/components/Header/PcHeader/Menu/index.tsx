/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:41:44
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-25 19:08:03
 * @FilePath: \blog5.0_front-end\src\components\Header\PcHeader\Menu\index.tsx
 */
import { useEffect, useRef } from 'react';
import styles from './index.less';
import Scroller from '@/utils/scroller';

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
  /** 菜单名称 */
  label: string,
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
    menu,
  } = props;

  const scroller = useRef<Scroller>();

  function goView(item: MenuItem) {
    scroller.current?.scrollTo(item.domRect.top)
  }

  useEffect(function() {
    scroller.current = new Scroller();
  }, [])

  return (
    <ul className={styles.menu}>
      {
        menu.map((item) => {
          const {label} = item;
          return (
            <li onClick={() => goView(item)} key={label}>{label}</li>
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