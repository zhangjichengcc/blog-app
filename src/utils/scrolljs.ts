/*
 * @Author: zhangjicheng
 * @Date: 2022-10-24 15:43:04
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-24 18:22:02
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
    // let v = this.target - this.source / 10;
    let v = this.target > this.source ? 5 : -5;
    // v = Math.abs(v) < 0.1 ?  : v;
    const value = this.source + v;
    // if (!this.prevTimestamp) this.prevTimestamp = timestamp; 
    // const currentTime = timestamp - this.prevTimestamp;
    // let value = tweenFunctions[this.easing](currentTime, this.source, this.target, this.duration);
    // value = value >= 0 ? value : this.target;
    window.scrollTo(0, value);
    this.source = value;
    if (Math.abs(value - this.target) > 5) {
      this.scrollId = requestAnimationFrame(this.step.bind(this));
    } else {
      window.scrollTo(0, this.target);
      this.source = this.target;
    }
    console.log(this.source)
  }

  // step(timestamp: number) {
  //   if (!this.prevTimestamp) this.prevTimestamp = timestamp; 
  //   const currentTime = timestamp - this.prevTimestamp;
  //   let value = tweenFunctions[this.easing](currentTime, this.source, this.target, this.duration);
  //   value = value >= 0 ? value : this.target;
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
