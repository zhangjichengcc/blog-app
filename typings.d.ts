/*
 * @Author: your name
 * @Date: 2021-11-08 15:30:44
 * @LastEditTime: 2022-01-04 17:18:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\typings.d.ts
 */
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module 'qs';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
