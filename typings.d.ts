/*
 * @Author: zhangjicheng
 * @Date: 2022-08-24 18:50:32
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-11-07 16:44:25
 * @FilePath: \blog5.0_front-end\typings.d.ts
 */
// import 'umi/typings';
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