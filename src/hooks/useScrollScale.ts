import { useScroll } from 'ahooks';

/**
 * 获取滚动的百分比
 * @returns number
 */
export function useScrollScale(): {
  /** 距顶部距离 */
  top: number;
  /** 滚动百分比 */
  scale: number;
} {
  const scroll = useScroll();
  const { top = 0 } = scroll || {};
  const { clientHeight, scrollHeight } = document.documentElement;
  const scale = (top / (scrollHeight - clientHeight)) * 100;
  return {
    top,
    scale,
  };
}
