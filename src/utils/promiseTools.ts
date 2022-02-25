/*
 * @Author: your name
 * @Date: 2022-01-20 21:54:07
 * @LastEditTime: 2022-01-20 21:54:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\utils\promiseTools.ts
 */

export default function to(promise: Promise<any>) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err]);
}
