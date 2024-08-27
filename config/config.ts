/*
 * @Author: your name
 * @Date: 2021-11-08 15:46:05
 * @LastEditTime: 2024-08-23 16:29:00
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /blog5.0_front-end/config/config.ts
 */

import { defineConfig } from 'umi';
import routesConfig from './routes.config';
import proxyConfig from './proxy.config';
import * as path from 'path';

// const {
//   ClientID,
//   ClientSecret,
// } = process.env;

export default defineConfig({
  // dynamicImport: {
  //   loading: '@ant-design/pro-layout/es/PageLoading',
  // },
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  publicPath: '/',
  plugins: [
    // '@umijs/plugins/dist/react-query'
    // ['umi-plugin-react', {
    //   dynamicImport: true,
    // }],
  ],
  headScripts: [
    'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js',
  ],
  npmClient: 'pnpm',
  // ? https://github.com/umijs/umi/issues/6766
  mfsu: {},
  mock: {},
  alias: {
    '@': path.resolve(__dirname, '../src'),
    pages: path.resolve(__dirname, '../src/pages'),
    components: path.resolve(__dirname, '../src/components'),
    utils: path.resolve(__dirname, '../src/utils'),
    '@utils': path.resolve(__dirname, '../src/utils/utils.ts'),
    services: path.resolve(__dirname, '../src/services'),
    models: path.resolve(__dirname, '../src/models'),
    themes: path.resolve(__dirname, '../src/themes'),
    assets: path.resolve(__dirname, '../src/assets'),
    hooks: path.resolve(__dirname, '../src/hooks'),
    public: path.resolve(__dirname, '../public'),
    config: path.resolve(__dirname, '../config'),
  },
  proxy: proxyConfig,
  routes: routesConfig,
  // request: {
  //   dataField: 'data'
  // },
  // favicon: '/favicon.ico',
  define: {
    ['process.env']: process.env,
    // ['process.env.ClientID']: ClientID,
    // ['process.env.ClientSecret']: ClientSecret,
  },
});
