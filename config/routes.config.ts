/*
 * @Author: your name
 * @Date: 2021-11-08 15:46:56
 * @LastEditTime: 2024-12-19 17:06:17
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /blog5.0_front-end/config/routes.config.ts
 */

export default [
  {
    path: '/user',
    component: '@/layouts/LoginLayout',
    routes: [
      { path: '/user/login', component: './User/Login', title: 'login' },
      // { path: '/login/redirect', component: './User/Login/Redirect' },
      { path: '/user/register', component: './User/Register', title: 'register' },
    ],
  },
  {
    path: '/',
    component: '@/layouts/HomeLayout',
    routes: [
      { path: '/', component: './Home', title: 'home' },
      // {
      //   path: '/tools',
      //   title: 'tools',
      //   routes: [{ path: '/img-compress', title: 'imgCompress' }],
      // },
      { path: '/404', component: '404' },
    ],
  },
  {
    path: '/service',
    component: '@/layouts/BlankLayout',
    routes: [
      {
        path: '/service/cloudDisk',
        component: './CloudDisk',
        title: 'CloudDisk',
      },
    ],
  },
];
