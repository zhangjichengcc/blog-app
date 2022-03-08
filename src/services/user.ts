/*
 * @Author: your name
 * @Date: 2021-11-09 17:12:48
 * @LastEditTime: 2022-03-08 17:01:11
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\services\user.ts
 */

import request from '@/utils/request';

type oauthGithubProps = {
  code: string;
};
/**
 * github 单点登录
 * @param params
 * @returns
 */
export async function oauthGithub(
  params: oauthGithubProps,
): Promise<API.ResponseProps<API.UserInfoProps>> {
  return request({
    url: '/api/user/oauth_github',
    method: 'get',
    params,
  });
}

type oauthPwdProps = {
  name: string;
  password: string;
};
/**
 * 账号密码登录
 * @param params
 * @returns
 */
export async function oauthPwd(
  params: oauthPwdProps,
): Promise<API.ResponseProps<API.UserInfoProps>> {
  return request({
    url: '/api/user/login',
    method: 'post',
    body: params,
  });
}

type RegisterProps = {
  name: string;
  avatar?: string;
  password: string;
  email?: string;
  phone?: string;
};
/**
 * 账号注册
 * @param params
 * @returns
 */
export async function register(
  params: RegisterProps,
): Promise<API.ResponseProps<API.UserInfoProps>> {
  return request({
    url: '/api/user/register',
    method: 'post',
    body: params,
  });
}

/**
 * 查看用户是否存在
 */
export async function findUser(
  name: string,
): Promise<API.ResponseProps<boolean>> {
  return request({
    url: '/api/user/findUser',
    method: 'get',
    params: {
      username: name,
    },
  });
}
