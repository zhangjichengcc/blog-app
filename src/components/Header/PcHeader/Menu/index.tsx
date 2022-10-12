/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:41:44
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-12 23:59:15
 * @FilePath: /blog5.0_front-end/src/components/Header/PcHeader/Menu/index.tsx
 */
import styles from './index.less';

export interface MenuItem {
  /** 菜单名称 */
  label: string,
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