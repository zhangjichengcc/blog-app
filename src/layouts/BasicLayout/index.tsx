/*
 * @Author: your name
 * @Date: 2021-12-16 15:05:50
 * @LastEditTime: 2021-12-16 16:54:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\layouts\BasicLayout\index.tsx
 */

import React, {FC, useEffect} from 'react';

import styles from './index.less';

const BasicLayout: FC<any> = (props) => {
  const { children } = props;
  return (
    <div className={styles.basicLayout}>
      <p>basic layout</p>
      {
        React.Children.map(children, (child) => {
          return React.cloneElement(child)
        })
      }
    </div>
  )
}

export default BasicLayout;
