// 函数防抖
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300,
) {
  let timer: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
