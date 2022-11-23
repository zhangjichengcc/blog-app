/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 17:29:44
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-12 18:56:43
 * @FilePath: \blog5.0_front-end\src\hooks\useThrottle.ts
 */
import { useRef } from "react";

/** 返回值 */
type Result = {
  /** 触发执行 fn，函数参数将会传递给 fn */
  run: (...args: unknown[]) => void;
}

/**
 * 函数节流钩子
 * @param fn 需要节流的函数
 * @param delay 延迟时间，默认300ms
 * @returns { run }
 */
export default function useThrottle(
  /**
   * 回调方法
   */
  fn: (...args: unknown[]) => unknown,
  /**
   * 延迟时间，默认 300ms
   */
  delay?: number,
): Result {
  const timer = useRef(0);

  const run = function(...args: unknown[]) {
    if (timer.current) return;
    timer.current = window.setTimeout(() => {
      clearTimeout(timer.current);
      timer.current = 0;
      fn(...args);
    }, delay || 300);
  }

  return {
    run,
  }
}