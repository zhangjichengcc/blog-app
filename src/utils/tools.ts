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
