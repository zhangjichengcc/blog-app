/*
 * @Author: your name
 * @Date: 2021-12-17 10:37:56
 * @LastEditTime: 2021-12-17 16:04:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\components\TopMenu\index.tsx
 */

import React, {FC} from 'react';
import { history, IRoute } from 'umi';
import MenuLogo from 'components/MenuLogo';
import Routes2Menu from 'components/Routes2Menu';

import styles from './index.less';

const TopMenu: FC<any> = (props) => {

  const { 
    route,
    routes,
  } = props;

  const baseUrl = '/'; // 设定baseUrl = / 取routes中 path = / 中的路由生成导航

  const baseRoutes = routes.find((route: IRoute) => route.path === baseUrl)?.routes || [];

  function onLogoClick() {
    history.push('/');
  }

  return (
    <div className={styles.topMenu}>
      <MenuLogo onClick={onLogoClick} />
      <Routes2Menu routes={baseRoutes} />
    </div>
  )
}

export default TopMenu;