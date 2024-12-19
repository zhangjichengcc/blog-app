/*
 * @Author: zhangjicheng
 * @Date: 2022-02-28 11:00:50
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-09-18 17:29:47
 * @FilePath: /blog5.0_front-end/src/components/HeaderDropdown/index.tsx
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
  overlay: DropDownProps['overlay'];
} & DropDownProps;

const HeaderDropdown: React.FC<HeaderDropdownProps> = (props) => {
  const { className, children, overlay } = props;

  return (
    <Dropdown
      placement="bottomRight"
      overlayClassName={classNames(styles.container, className)}
      overlay={overlay}
      // eslint-disable-next-line react/no-children-prop
      children={children}
    />
  );
};

export default HeaderDropdown;
