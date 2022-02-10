/*
 * @Author: zhangjicheng
 * @Date: 2021-11-09 17:16:46
 * @LastEditTime: 2022-02-10 18:57:07
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\config\proxy.config.ts
 */

const { ApiTarget } = process.env;

const proxyConfig = {
  '/api': {
    target: ApiTarget,
    // pathRewrite: { '^/api': '' },
    changeOrigin: true, // ? 虚拟一个服务端接收你的请求并代你发送该请求
    router: {
      // '/fileServer': 'http://127.0.0.1:8200/fileServer',
    },
  },
  // ? 取消前端文件走 8200 nginx代理，直接通过后端服务代理到文件服务器，根据当前环境决定代理地址 prod/dev
  // # 20220210(node2021) commit sha a249d570edf70ffd697e158e03c26ecb236fd792
  // '/api/fileServer': { // ! 此处相同前缀（/api/*）代理不生效
  //   target: FileTarget
  // }
};

export default proxyConfig;
