/*
 * @Author: your name
 * @Date: 2022-01-05 16:34:42
 * @LastEditTime: 2022-02-28 16:21:44
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\utils\utils.ts
 */

import { baseLog } from 'utils/math';
import { ResizeEventEm } from '@/app';

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

/**
 * 监听可视化窗口大小变化
 * @param cb 接收回调函数，变化触发
 */
export function onWindowResize(cb: (args: any) => void) {
  ResizeEventEm.on('clientResize', cb);
}
