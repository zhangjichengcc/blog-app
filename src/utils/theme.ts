/*
 * @Author: zhangjicheng
 * @Date: 2022-03-11 17:54:04
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-03-11 22:29:23
 * @FilePath: \blog-app\src\utils\theme.ts
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

// Media queries breakpoints

export type screenKeys =
  | 'screen_xs'
  | 'screen_sm'
  | 'screen_md'
  | 'screen_lg'
  | 'screen_xl'
  | 'screen_xxl';

type screenProps = {
  [key in screenKeys]: number;
};

const screenObj: screenProps = {
  screen_xs: 480,
  // 👆 Extra small screen / phone

  // 👇 Small screen / tablet
  screen_sm: 576,
  // screen_sm_min: screen_sm,
  // screen_sm_max: screen_md - 1,

  // Medium screen / desktop
  screen_md: 768,

  // Large screen / wide desktop
  screen_lg: 992,

  // Extra large screen / full hd
  screen_xl: 1200,

  // Extra extra large screen / large desktop
  screen_xxl: 1600,
};

/**
 * 获取指定区域大小对应的像素
 * @param key BreakpointWidthProps
 * @returns
 */
export function getBreakpointWidth(key: screenKeys): number {
  return screenObj[key];
}

/**
 * 获取当前屏幕大小类型
 * @returns
 */
export function getScreenModel(): screenKeys {
  const width = document.body.clientWidth;
  let p: screenKeys = 'screen_xs';
  for (const key in screenObj) {
    const value = screenObj[key as screenKeys];
    if (value <= width && value > screenObj[p]) p = key as screenKeys;
  }
  return p;
}

/**
 * 判断屏幕尺寸是否匹配
 * @param screenModel 屏幕尺寸类型
 * @param includes 是否为包含当前尺寸，默认包含
 * @returns boolean 是否匹配
 */
export function matchScreenModel(
  screenModel: screenKeys,
  includes?: boolean,
): boolean {
  const width = document.body.clientWidth;
  const res: screenKeys[] = ['screen_xs'];
  let p: screenKeys = 'screen_xs';
  for (const key in screenObj) {
    const value = screenObj[key as screenKeys];
    if (value <= width && value > screenObj[p]) p = key as screenKeys;
    if (value >= width) res.push(key as screenKeys);
  }
  return includes ?? true ? res.includes(screenModel) : p === screenModel;
}
