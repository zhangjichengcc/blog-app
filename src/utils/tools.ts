/**
 * DomReact 属性
 */
export type DomRect = {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
  bottom: number;
  right: number;
};

/**
 * 获取 DOMRect
 * @param {dom} dom
 * @returns {DomRect}
 */
export function getDomRect(dom?: HTMLElement | null): DomRect {
  if (!dom)
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    };
  const { x, y, width, height, top, left, bottom, right } =
    dom.getBoundingClientRect();
  return {
    x,
    y,
    width,
    height,
    top,
    left,
    bottom,
    right,
  };
}

/**
 * 格式化 dataset
 * @param {Record<string, T>} data
 * @returns {[key: `data-${string}`]: T}
 */
export function formatDataset<T>(data: Record<string, T>): {
  [key: `data-${string}`]: T;
} {
  return Object.keys(data).reduce((acc, cur) => {
    acc[`data-${cur}`] = data[cur];
    return acc;
  }, {} as { [key: `data-${string}`]: T });
}
