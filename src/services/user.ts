/*
 * @Author: your name
 * @Date: 2021-11-09 17:12:48
 * @LastEditTime: 2022-02-25 18:56:18
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\services\user.ts
 */

import request from '@/utils/request';

export async function oauthGithub(params = {}) {
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
export async function oauthPwd(params: oauthPwdProps) {
  return request({
    url: '/api/user/login',
    method: 'post',
    body: params,
  });
}
