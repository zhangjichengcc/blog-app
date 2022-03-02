/*
 * @Author: your name
 * @Date: 2021-11-08 15:46:56
 * @LastEditTime: 2022-03-02 23:29:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\config\routes.config.ts
 */

export default [
  // { path: '/', component: './index', title: 'aaaa'},
  {
    path: '/user',
    component: '@/layouts/LoginLayout',
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/', component: './Home', title: 'home' },
      { path: '/CloudDisk', component: './CloudDisk', title: 'CloudDisk' },
      {
        path: '/tools',
        title: 'tools',
        routes: [{ path: '/img-compress', title: 'imgCompress' }],
      },
      { path: '/404', component: '404' },
    ],
  },
];
