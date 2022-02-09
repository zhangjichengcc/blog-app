/*
 * @Author: zhangjicheng
 * @Date: 2021-11-09 17:16:46
 * @LastEditTime: 2022-02-09 17:42:46
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\config\proxy.config.ts
 */

const { FileTarget, ApiTarget } = process.env;

const proxyConfig = {
  '/api': {
    target: ApiTarget,
    // pathRewrite: { '^/api': '' },
    changeOrigin: true,
    // http://localhost:8200/api/fileServer/20220209/15%E6%97%A5%E6%89%93%E5%8D%A1_1644399295826.jpg
    router: {
      // '/api/artical': 'http://127.0.0.1:5001',
      // '/api/image': 'http://127.0.0.1:5002',
      // '/api/user': 'http://127.0.0.1:5003',
      '/fileServer': 'http://127.0.0.1:8200/fileServer',
    },
  },
  // '/api/fileServer': { // ! 此处相同前缀（/api/*）代理不生效
  //   target: FileTarget
  // }
};

export default proxyConfig;
