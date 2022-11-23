/*
 * @Author: zhangjicheng
 * @Date: 2022-10-24 15:43:04
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-11-02 11:12:54
 * @FilePath: \blog5.0_front-end\src\utils\scroller.ts
 */
// import tweenFunctions from 'tween-functions';

// type TweenFunctionsType = keyof tweenFunctions.TweenFunctions

// tweenFunctions.easeInBack()

type tweenParams = [
  /** 当前时间 */
  time: number,
  /** 起始值 */
  start: number,
  /** 结束值 */
  end: number,
  /** 持续时间 */
  duration: number
]

/** 匀速运动 */
function linearTween(...params: tweenParams): number {
  const [time, start, end, duration] = params;
  const 
    v = (end - start) / duration,
    s = v * time + start;
  return time > duration ? end : s;
}

/** 匀减速运动 */
function easeTween(...params: tweenParams) {
  const [time, start, end, duration] = params;
  const
    v_end = 0,
    v_begin = (end - start) * 2 / duration - v_end,
    a = (v_end - v_begin) / duration,
    v = v_begin + a * time,
    s = start + (v_begin + v) * time / 2;
  return time > duration ? end : s;
}

const tweenFunctions = {
  /** 匀速运动 */
  linear: linearTween,
  /** 匀减速运动 */
  ease: easeTween,
}

/** 滚动配置 */
type Option = {
  /** 滚动持续时间 */
  duration?: number,
  /** 动画函数 */
  easing?: 'linear' | 'ease',
}


class Scroller {

  private scrollId: number;
  private prevTimestamp: number;
  private scrollCb?: (y: number) => void;
  private speed: number;
  /** 滚动起始位置 */
  public source: number;
  /** 滚动截止位置 */
  public target: number;
  /** 滚动元素，默认window */
  public element: HTMLElement | Window;
  /** 滚动动画 */
  public easing: 'ease' | 'linear';
  /** 滚动持续时间 默认300ms */
  public duration: number;

  constructor(element?: HTMLElement, option?: Option) {
    const {
      duration = 300,
      easing = 'ease'
    } = option || {};

    this.scrollId = 0;
    this.speed = 50 / 1000;
    this.element = element || window;
    this.easing = easing;
    this.prevTimestamp = 0;
    this.target = 0;
    this.source = 0;
    this.duration = duration;
  }

  /**
   * 滚动步骤
   * @param timestamp 
   */
  private step(timestamp: number) {

    if (!this.prevTimestamp) this.prevTimestamp = timestamp; 
    const currentTime = timestamp - this.prevTimestamp;
    const value = tweenFunctions[this.easing](currentTime, this.source, this.target, this.duration);
    if (this.scrollCb) this.scrollCb(value);
    if (this.element === window) {
      window.scrollTo(0, value);
    } else {
      (this.element as HTMLElement).scrollTop = value;
    }

    if (value !== this.target) {
      this.scrollId = requestAnimationFrame(this.step.bind(this));
    }
  }

  /**
   * 滚动到指定位置
   * @param y 目标位置
   * @param callBack 回调方法，返回每次滚动位置
   */
  scrollTo(y: number, callBack?: (y: number) => void) {
    this.scrollCb = callBack;
    this.source = this.element === window ? window.scrollY : (this.element as Element).scrollTop;
    this.prevTimestamp = 0;
    this.target = y;
    this.scrollId = requestAnimationFrame(this.step.bind(this));
  }

  private linearStep(timestamp: number) {
    if (!this.prevTimestamp) this.prevTimestamp = timestamp; 
    const currentTime = timestamp - this.prevTimestamp;
    const value = this.source + currentTime * this.speed;
    if (this.scrollCb) this.scrollCb(value);
    if (this.element === window) {
      window.scrollTo(0, value);
    } else {
      (this.element as HTMLElement).scrollTop = value;
    }
    this.scrollId = requestAnimationFrame(this.linearStep.bind(this));
  }

  /**
   * 开始滚动
   * @param speed 滚动速度 px/s 默认50
   * @param callBack 回调方法，返回每次滚动位置
   */
  start(speed?: number, callBack?: (y: number) => void) {
    this.scrollCb = callBack;
    this.speed = ((speed || 50) / 1000); // 将速度转为 px/ms
    this.source = this.element === window ? window.scrollY : (this.element as Element).scrollTop;
    this.prevTimestamp = 0;
    this.scrollId = requestAnimationFrame(this.linearStep.bind(this));
  }

  stop() {
    window.cancelAnimationFrame(this.scrollId);
  }
}

export default Scroller
