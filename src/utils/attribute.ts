/*
 * @Author: zhangjicheng
 * @Date: 2022-02-28 16:32:15
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-02-28 18:41:58
 * @FilePath: \blog-app\src\utils\attribute.ts
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

type BreakpointWidthProps = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * 窗口宽度限定规则
 */
const breakpointWidth: {
  [K in BreakpointWidthProps]: number;
} = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

/**
 * 获取指定区域大小对应的像素
 * @param key BreakpointWidthProps
 * @returns
 */
function getBreakpointWidth(key: BreakpointWidthProps): number {
  return breakpointWidth[key];
}

export { getBreakpointWidth };
