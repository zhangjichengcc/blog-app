/*
 * @Author: your name
 * @Date: 2021-12-17 10:59:53
 * @LastEditTime: 2022-03-02 10:57:14
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\components\MenuLogo\index.tsx
 */

import React, { FC, useEffect } from 'react';
// import { Menu } from 'antd';
import logoImg from 'assets/global/logo.png';

import styles from './index.less';

const TopMenu: FC<any> = (props) => {
  const { label } = props;

  return (
    <div className={styles.topMenu} {...props}>
      <img src={logoImg} />
      {label && <span>Veigar</span>}
    </div>
  );
};

export default TopMenu;
