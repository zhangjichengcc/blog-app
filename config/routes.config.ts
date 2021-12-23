/*
 * @Author: your name
 * @Date: 2021-11-08 15:46:56
 * @LastEditTime: 2021-12-21 14:43:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\config\routes.config.ts
 */

export default [
  // { path: '/', component: './index', title: 'aaaa'},
  // { path: '/login', component: './Login' },
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      { path: '/login', component: './Login', title: 'Login' },
      { path: '/', component: './index', title: 'home' },
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
