import { useScroll } from 'ahooks';

/**
 * 获取滚动的百分比
 * @returns number
 */
export function useScrollScale(): number {
  const scroll = useScroll();
  const { top = 0 } = scroll || {};
  const { clientHeight, scrollHeight } = document.documentElement;
  const scale = (top / (scrollHeight - clientHeight)) * 100;
  return +scale.toFixed(2);
}
