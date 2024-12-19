import { useSize } from 'ahooks';
import { useEffect, useState } from 'react';

/**
 * xs: < 576px (超小屏幕)
 * sm: ≥ 576px (小屏幕)
 * md: ≥ 768px (中等屏幕)
 * lg: ≥ 992px (大屏幕)
 * xl: ≥ 1200px (超大屏幕)
 * xxl: ≥ 1600px (超超大屏幕)
 */
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;

export type Gird = keyof typeof breakpoints;

/**
 * 获取当前屏幕宽度
 * @returns {'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'}
 */
export function useGrid(): Gird {
  const [tag, setTag] = useState<Gird>('xs');
  const size = useSize(document.body);
  useEffect(() => {
    if (!size?.width) return;
    const _tag = Object.keys(breakpoints)
      .reverse()
      .find((key) => size.width >= breakpoints[key as Gird]);
    setTag(_tag as Gird);
  }, [size?.width]);

  return tag;
}
