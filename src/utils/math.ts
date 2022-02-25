/*
 * @Author: your name
 * @Date: 2022-01-05 16:39:27
 * @LastEditTime: 2022-01-05 18:04:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\utils\math.ts
 */

/**
 * 函数返回以 x 为底 y 的对数（即logx y）
 * @param x
 * @param y
 * @returns number
 */
export function baseLog(x: number, y: number): number {
  return Math.log(y) / Math.log(x);
}

/**
 * 函数返回千分制字符串
 * @param num
 * @returns string
 */
export function thousands(num: number | string): string {
  return String(num).replace(/(\d)(?=(\d{3})+(\.\d+)?$)/g, '$1,');
}
