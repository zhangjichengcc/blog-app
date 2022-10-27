/*
 * @Author: your name
 * @Date: 2022-01-05 16:34:42
 * @LastEditTime: 2022-10-27 21:39:40
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog5.0_front-end\src\utils\index.ts
 */

import { baseLog } from 'utils/math';
// import EventEmitter from 'utils/eventEmitter';

// const ResizeEventEm = new EventEmitter();

/**
 * 格式化文件大小 B、KB...
 * @param size : number
 * @returns : string
 */
export function renderSize(size: number): string {
  if (!size) return '0B';
  const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const log = ~~baseLog(1024, size);
  const unit = unitArr[log];
  const num = ['B', 'KB'].includes(unit)
    ? (size / 1024 ** log).toFixed(0)
    : (size / 1024 ** log).toFixed(2);
  return `${num}${unit}`;
}

/**
 * 延迟函数
 * @param time: number
 * @returns Promise
 */
export function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

// todo 优化克隆方法

/**
 * 深拷贝
 * @param source T extends any
 * @returns T
 */
export function deepClone<T>(source: T): T {
  const map = new Map(); // 创建字典，存储每次clone对象，处理自引用
  function fn(source) {
    if (typeof source !== 'object') return source;
    const result = (Array.isArray(source) ? [] : {}) as T;
    for (const i in source) {
      // if ()
      result[i] = deepClone(source[i]);
    }
    return result;
  }

  return fn(source);
}

/**
 * 监听可视化窗口大小变化
 * @param cb 接收回调函数，变化触发
 */
// export function onWindowResize(cb: (args: any) => void) {
//   ResizeEventEm.on('clientResize', cb);
// }

/**
 * 函数节流
 * @param cb 回调方法
 * @param delay 延迟时间，默认 300ms
 * @returns
 */
export function throttle(
  /**
   * 回调方法
   */
  cb: (...args: unknown[]) => unknown,
  /**
   * 延迟时间，默认 300ms
   */
  delay?: number,
): (args?: unknown) => void {
  let timer: number | null = null;
  return function (...args) {
    const that = this;
    if (timer) return;
    timer = window.setTimeout(() => {
      cb.call(that, ...args);
      clearTimeout(timer as number);
      timer = null;
    }, delay || 300);
  };
}

/**
 * 函数防抖
 * @param cb 回调方法
 * @param delay 延迟时间，默认 300ms
 * @returns
 */
export function debounce(
  /**
   * 回调方法
   */
  cb: (...args: any) => any,
  /**
   * 延迟时间，默认 300ms
   */
  delay?: number,
): (args: any) => void {
  let timer: number | null = null;
  return function (...args) {
    // @ts-ignore
    const that = this || window;
    if (timer) {
      clearTimeout(timer as number);
      timer = null;
    }
    timer = window.setTimeout(() => {
      cb.call(that, ...args);
    }, delay || 300);
  };
}

// export { ResizeEventEm };
