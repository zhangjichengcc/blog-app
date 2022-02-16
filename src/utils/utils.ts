/*
 * @Author: your name
 * @Date: 2022-01-05 16:34:42
 * @LastEditTime: 2022-02-16 18:35:00
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\utils\utils.ts
 */

import { baseLog } from 'utils/math';

// 格式化文件大小
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

// 延迟函数
export function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

// const renderSize = (filesize) => {
//   if (!filesize) return '0Bytes';
//   const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
//   let index = 0;
//   const srcsize = parseFloat(filesize);
//   index = Math.floor(Math.log(srcsize) / Math.log(1024));
//   let size = srcsize / 1024 ** index;
//   size = size.toFixed(2); // 保留的小数位数
//   return `${size}${unitArr[index]}`;
// };
