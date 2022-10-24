/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:41:44
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-24 17:16:09
 * @FilePath: \blog5.0_front-end\src\components\Header\PcHeader\Menu\index.tsx
 */
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

  return (
    <ul className={styles.menu}>
      {
        menu.map((item) => {
          const {label} = item;
          return (
            <li key={label}>{label}</li>
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