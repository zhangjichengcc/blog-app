/*
 * @Author: your name
 * @Date: 2021-11-08 15:46:56
 * @LastEditTime: 2022-02-26 01:06:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\config\routes.config.ts
 */

export default [
  // {
  //   path: '/',
  //   component: '@/layouts/LoginLayout',
  //   exact: false,
  //   routes: [
  //     { path: '/login', exact: true, component: './Login' },
  //     {
  //       path: '/login/redirect',
  //       exact: true,
  //       component: './Login/Redirect',
  //     },
  //     { path: '/register', exact: true, component: './Register' },
  //   ]
  // },
  {
    path: '/',
    exact: false,
    component: '@/layouts/BasicLayout',
    routes: [
      // { path: '/', component: './index', title: 'home' },
      {
        path: '/cloudDisk',
        exact: true,
        component: './CloudDisk',
        title: 'CloudDisk',
      },
      {
        path: '/tools',
        title: 'tools',
        routes: [{ path: '/img-compress', title: 'imgCompress' }],
      },
      { path: '/404', component: '404' },
    ],
  },
];
