/*
 * @Author: your name
 * @Date: 2021-12-27 15:10:43
 * @LastEditTime: 2021-12-27 16:11:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\utils\eventEmitter.ts
 */

type EventProps = { [key: string]: any };

class EventEmitter {
  private events: EventProps;
  constructor() {
    this.events = {};
  }

  /**
   * 注册事件
   * @param eventName: string
   * @param cb: (...args: any[]) => void
   * @return EventProps: {[key: string]: any}
   */
  on(eventName: string, cb: (...args: any[]) => void): EventProps {
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(cb);
    return this.events;
  }

  /**
   * 触发事件
   * @param eventName: string
   * @param args: any[]
   */
  emit(eventName: string, ...args: any[]) {
    this.events[eventName]?.forEach(function (event: (args: any[]) => void) {
      event(args);
    });
  }

  /**
   * 只触发一次
   * @param eventName: string
   * @param args: any[]
   */
  once(eventName: string, ...args: any[]) {
    this.events[eventName]?.(args); // 触发方法
    delete this.events[eventName]; // 移除事件
  }

  /**
   * 移除事件
   * @param eventName
   * @return EventProps: {[key: string]: any}
   */
  off(eventName: string): EventProps {
    delete this.events?.[eventName];
    return this.events;
  }

  removeAllEvents(): void {
    this.events = {};
  }
}

export default EventEmitter;
