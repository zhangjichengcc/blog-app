/*
 * @Author: your name
 * @Date: 2021-11-09 17:16:46
 * @LastEditTime: 2021-11-10 16:29:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\config\proxy.config.ts
 */

const TARGET = process.env.ApiTarget;

const proxyConfig = {
  "/api": {
    target: TARGET, // 本地
    // pathRewrite: { '^/api': '' },
    changeOrigin: true
    // router: {
    //   '/api/artical': 'http://127.0.0.1:5001',
    //   '/api/image': 'http://127.0.0.1:5002',
    //   '/api/user': 'http://127.0.0.1:5003',
    // },
  }
};

export default proxyConfig;