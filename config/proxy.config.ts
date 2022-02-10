/*
 * @Author: zhangjicheng
 * @Date: 2021-11-09 17:16:46
 * @LastEditTime: 2022-02-10 18:39:27
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\config\proxy.config.ts
 */

const { FileTarget, ApiTarget } = process.env;

const proxyConfig = {
  '/api': {
    target: ApiTarget,
    // pathRewrite: { '^/api': '' },
    changeOrigin: true, // ? 虚拟一个服务端接收你的请求并代你发送该请求
    router: {
      // '/fileServer': 'http://127.0.0.1:8200/fileServer',
    },
  },
  //
  // '/api/fileServer': { // ! 此处相同前缀（/api/*）代理不生效
  //   target: FileTarget
  // }
};

export default proxyConfig;
