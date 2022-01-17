/*
 * @Author: your name
 * @Date: 2021-11-09 17:12:48
 * @LastEditTime: 2022-01-17 18:41:05
 * @LastEditors: Please set LastEditors
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

export async function oauthPwd(params = {}) {
  return request({
    url: '/api/user/login',
    method: 'post',
    body: params,
  });
}
