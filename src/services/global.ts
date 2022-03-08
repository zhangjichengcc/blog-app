/*
 * @Author: zhangjicheng
 * @Date: 2022-03-07 11:19:38
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-03-07 11:20:38
 * @FilePath: \blog-app\src\services\global.ts
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import request from '@/utils/request';

/**
 * 上传文件
 * @param {id: string, file: Blob}
 */
export async function uploadFile(file: Blob) {
  const formData = new FormData();
  formData.append('file', file);
  return request({
    url: '/api/global/upload',
    method: 'post',
    body: formData,
    // headers: { 'Content-Type': 'multipart/form-data'}
  });
}
