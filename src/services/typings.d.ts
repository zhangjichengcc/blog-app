/*
 * @Author: zhangjicheng
 * @Date: 2022-03-02 17:13:46
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-11-09 15:30:50
 * @FilePath: \blog5.0_front-end\src\services\typings.d.ts
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

declare namespace API {
  /**
   * 接口返回标准形式
   */
  type ResponseProps<T> = {
    code: number;
    data: T;
    msg: string;
  };

  /**
   * 接口返回 Promise 类型
   */
  type ResponsePromise<T> = Promise<ResponseProps<T>>;

  /**
   * 用户信息
   */
  interface UserInfoProps {
    avatar: string;
    email: string;
    phone: string | number;
    token: string;
    username: string;
  }
}
