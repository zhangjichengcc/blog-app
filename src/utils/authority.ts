/*
 * @Author: your name
 * @Date: 2022-01-17 18:55:43
 * @LastEditTime: 2022-03-02 23:45:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\utils\authority.ts
 */

/**
 * 录入token
 * @param token
 */
export function setToken(token: string) {
  window.localStorage.setItem('Authorization', token);
}

/**
 * 获取token
 */
export function getToken(): string | null {
  return window.localStorage.getItem('Authorization');
}

/**
 * 删除token
 * @returns
 */
export function removeToken() {
  return window.localStorage.removeItem('Authorization');
}

/**
 * 录入用户信息
 */
export function setUserInfo(userInfo: API.UserInfoProps) {
  window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

/**
 * 获取用户信息
 */
export function getUserInfo(): API.UserInfoProps {
  const _info = window.localStorage.getItem('userInfo');
  return _info ? JSON.parse(_info) : {};
}

/**
 * 删除用户信息
 */
export function removeUserInfo() {
  window.localStorage.removeItem('userInfo');
}
