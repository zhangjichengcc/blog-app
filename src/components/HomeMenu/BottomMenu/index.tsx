import React, { FC, useEffect, useRef, useState } from 'react';
import { Picker } from 'antd-mobile';
import FillSvgAnimate from '@/components/FillSvgAnimate';
import { ReactComponent as Home } from '@/assets/Home/home.svg';
import { ReactComponent as Layers } from '@/assets/Home/layers.svg';
import { ReactComponent as Person } from '@/assets/Home/person.svg';

import styles from './index.less';
import { MenuItem } from '..';
import { PickerValue } from 'antd-mobile/es/components/picker';

type ActiveKey = 'about' | 'home' | 'menu';
type MenuKey = MenuItem['key'];

interface Props {
  activeKey?: MenuKey;
  menu: Array<MenuItem>;
}

const Menu: FC<Props> = (props) => {
  const ref = useRef<HTMLUListElement>(null);

  const { activeKey: homeKey, menu } = props;

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuActiveKey, setMenuActiveKey] = useState<MenuKey>(
    homeKey || 'home',
  );
  const [activeConf, setActiveConf] = useState<{
    key: ActiveKey;
    left: number;
    width: number;
  }>({
    key: 'about',
    left: 0,
    width: 0,
  });

  /** 更多菜单 */
  const otherMenu = menu.map((item) => ({
    label: item.label,
    value: item.key,
  }));

  /** 设置激活菜单样式 */
  function setActiveMenuStyle(key: ActiveKey | MenuKey) {
    const currentKey: ActiveKey = ['about', 'home', 'menu'].includes(key)
      ? (key as ActiveKey)
      : 'menu';
    const { lastChild } = ref?.current?.querySelector(
      `#${currentKey}`,
    ) as HTMLLIElement;
    const { width, left } =
      (lastChild as HTMLSpanElement)!.getBoundingClientRect();
    setActiveConf({
      key: currentKey,
      left,
      width,
    });
  }

  /** 滚动到指定模块 */
  function scrollInto(key: string) {
    const element = document.querySelector(`#${key}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  /** 导航点击触发 */
  function onMenuClick(key: ActiveKey) {
    if (key === 'menu') {
      // 打开菜单
      setMenuOpen(true);
    } else {
      scrollInto(key);
    }
    setActiveMenuStyle(key);
  }

  /** 点击菜单触发 */
  function onMenuOk(e: PickerValue[]) {
    const [key] = e;
    setMenuActiveKey(key as MenuKey);
    scrollInto(key as MenuKey);
    setMenuOpen(false);
  }

  useEffect(() => {
    setActiveMenuStyle(homeKey || 'menu');
    setMenuActiveKey(homeKey || 'home');
  }, [homeKey]);

  return (
    <div
      className={styles.menu}
      style={
        {
          '--menu-bar-width': `${activeConf.width}px`,
          '--menu-bar-left': `${activeConf.left}px`,
        } as React.CSSProperties
      }
    >
      <ul ref={ref} className={styles['menu-container']}>
        <li
          id="about"
          onClick={() => onMenuClick('about')}
          className={activeConf.key === 'about' ? styles.active : ''}
        >
          <FillSvgAnimate
            active={activeConf.key === 'about'}
            bgColor={'#999'}
            color={'#3e82fe'}
            fontSize={22}
            strokeWidth={2}
          >
            <Person />
          </FillSvgAnimate>
          <span>About</span>
        </li>
        <li
          id="home"
          onClick={() => onMenuClick('home')}
          className={activeConf.key === 'home' ? styles.active : ''}
        >
          <FillSvgAnimate
            active={activeConf.key === 'home'}
            bgColor={'#999'}
            color={'#3e82fe'}
            fontSize={22}
            strokeWidth={2}
          >
            <Home />
          </FillSvgAnimate>
          <span>Home</span>
        </li>
        <li
          id="menu"
          onClick={() => onMenuClick('menu')}
          className={activeConf.key === 'menu' ? styles.active : ''}
        >
          <FillSvgAnimate
            active={activeConf.key === 'menu'}
            bgColor={'#999'}
            color={'#3e82fe'}
            fontSize={22}
            strokeWidth={2}
          >
            <Layers />
          </FillSvgAnimate>
          <span>Menu</span>
        </li>
      </ul>
      <Picker
        columns={[otherMenu]}
        visible={menuOpen}
        value={[menuActiveKey]}
        onClose={() => setMenuOpen(false)}
        onConfirm={onMenuOk}
      />
    </div>
  );
};

export default Menu;
