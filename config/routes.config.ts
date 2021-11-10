/*
 * @Author: your name
 * @Date: 2021-11-08 15:46:56
 * @LastEditTime: 2021-11-10 10:34:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\config\routes.config.ts
 */

export default [
  { path: '/', component: './index' },
  { path: '/login', component: './Login' },
  {
    path: '/',
    // component: '@/layouts/index',
    routes: [
      { path: '/login', component: './Login' },
    ],
  }, 
]