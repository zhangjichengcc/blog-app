/*
 * @Author: your name
 * @Date: 2021-12-17 16:21:21
 * @LastEditTime: 2021-12-17 18:02:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\components\TopUserBar\index.tsx
 */

import React, {FC} from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import styles from './index.less';

const TopUserBar: FC<any> = (props) => {
  return (
    <div className={styles.topUserBar}>
      <Avatar shape="square" size="small" icon={<UserOutlined />} />
    </div>
  )
}

export default TopUserBar;
