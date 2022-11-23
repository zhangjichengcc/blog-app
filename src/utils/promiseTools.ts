/*
 * @Author: your name
 * @Date: 2022-01-20 21:54:07
 * @LastEditTime: 2022-11-09 15:20:19
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog5.0_front-end\src\utils\promiseTools.ts
 */

export default function to<T>(promise: Promise<T>): Promise<(T | null)[] | [unknown, null]> {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err, null]);
}
