/*
 * @Author: your name
 * @Date: 2021-11-08 15:52:20
 * @LastEditTime: 2022-03-09 12:49:04
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\app.ts
 */

// ! 约定 src/app.tsx 为运行时配置。
import { history } from 'umi';
import EventEmitter from 'utils/eventEmitter';

export function onRouteChange({ location, routes, action }: any) {
  // console.log(location.pathname);
}
const ResizeEventEm = new EventEmitter();

console.log('ResizeEventEm', ResizeEventEm);

// // 窗口变化触发
// function onClientResize(this: Window, ev: UIEvent) {
//   // 触发监听类中的 clientResize 事件
//   ResizeEventEm.emit('clientResize');
// }

// // 页面首次加载触发一次resize
// ResizeEventEm.emit('clientResize');

// window.onload = () => {
//   // 可视化窗口变化 监听类
//   window.addEventListener('resize', onClientResize);
// };

export {
  /**
   * 可视窗口变化监听类
   */
  ResizeEventEm,
};
