/*
 * @Author: your name
 * @Date: 2022-01-17 18:55:43
 * @LastEditTime: 2022-01-18 10:20:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\utils\authority.ts
 */
export function setToken(token: string) {
  window.localStorage.setItem('Authorization', token);
}

export function getToken() {
  return window.localStorage.getItem('Authorization');
}
