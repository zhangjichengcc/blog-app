/*
 * @Author: your name
 * @Date: 2021-12-16 15:05:50
 * @LastEditTime: 2024-12-19 17:09:12
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /blog5.0_front-end/src/layouts/LoginLayout/index.tsx
 */

import React, { FC, useEffect } from 'react';

import styles from './index.less';
import { Outlet } from 'umi';

const LoginLayout: FC<any> = (props) => {
  return (
    <div className={styles.loginLayout}>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
