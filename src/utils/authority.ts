/*
 * @Author: your name
 * @Date: 2022-01-17 18:55:43
 * @LastEditTime: 2024-12-19 17:35:20
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /blog5.0_front-end/src/utils/authority.ts
 */

import { history } from 'umi';

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

/**
 * 跳转登录页
 * @param redirect 重定向地址
 */
export function goLogin(redirect?: string) {
  const loginPath = redirect ? `/user/login?redirect=${redirect}` : '/user/login';
  history.push(loginPath);
}

/**
 * 跳转注册页
 * @param redirect 重定向地址
 */
export function goRegister(redirect?: string) {
  const registerPath = redirect ? `/user/register?redirect=${redirect}` : '/user/register';
  history.push(registerPath);
}