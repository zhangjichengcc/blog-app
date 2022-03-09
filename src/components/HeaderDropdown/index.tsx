/*
 * @Author: zhangjicheng
 * @Date: 2022-02-28 11:00:50
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-03-09 17:35:43
 * @FilePath: \blog-app\src\components\HeaderDropdown\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */
import type { DropDownProps } from 'antd/es/dropdown';
import { Dropdown } from 'antd';
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export type HeaderDropdownProps = {
  overlayClassName?: string;
  overlay: React.ReactNode | (() => React.ReactNode) | any;
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => (
  <Dropdown
    trigger={['click']}
    overlayClassName={classNames(styles.container, cls)}
    {...restProps}
  />
);

export default HeaderDropdown;
