/*
 * @Author: zhangjicheng
 * @Date: 2022-10-24 15:43:04
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-25 18:01:37
 * @FilePath: \blog5.0_front-end\src\utils\scrolljs.ts
 */
import tweenFunctions from 'tween-functions';

type TweenFunctionsType = keyof tweenFunctions.TweenFunctions

class Scroller {

  // element: HTMLElement | Window;
  easing: TweenFunctionsType;
  scrollId: number | undefined;
  source: number;
  target: number;
  duration: number;
  prevTimestamp: number;

  constructor() {
    this.scrollId;
    // this.element = element || window;
    this.easing = 'easeOutCubic';
    this.prevTimestamp = 0;
    this.target = 0;
    this.source = 0;
    this.duration = 250;
  }

  step(timestamp: number) {

    if (!this.prevTimestamp) this.prevTimestamp = timestamp; 
    const currentTime = timestamp - this.prevTimestamp;
    const v1 = 0;
    const v0 = (this.target - this.source) * 2 / this.duration - v1;
    const a =  (v1 - v0) / this.duration;
    const v = v0 + a * currentTime;

    const s = (v + v0) * currentTime / 2;

    let value = this.source + s;
    value = currentTime > this.duration ? this.target : value;
    window.scrollTo(0, value);
    if (value !== this.target) {
      this.scrollId = requestAnimationFrame(this.step.bind(this));
    }
  }

  // step(timestamp: number) {
  //   if (!this.prevTimestamp) this.prevTimestamp = timestamp; 
  //   const currentTime = timestamp - this.prevTimestamp;
  //   let value = tweenFunctions[this.easing](currentTime, this.source, this.target, this.duration);
  //   value = currentTime > this.duration ? this.target : value;
  //   window.scrollTo(0, value);
  //   if (value !== this.target) {
  //     console.log(value)
  //     this.scrollId = requestAnimationFrame(this.step.bind(this));
  //   }
  // }

  scrollTo(y: number) {
    this.source = window.scrollY;
    this.prevTimestamp = 0;
    this.target = y;
    this.scrollId = requestAnimationFrame(this.step.bind(this));
  }
}

export default Scroller
