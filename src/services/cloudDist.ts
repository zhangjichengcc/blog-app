/*
 * @Author: your name
 * @Date: 2022-01-17 18:03:11
 * @LastEditTime: 2022-01-17 18:20:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\services\cloudDist.ts
 */

import request from '@/utils/request';

interface getDistMenuProps {
  id?: string;
}
export async function getDistMenu(params: getDistMenuProps) {
  return request({
    url: '/api/clouddisk/getDiskFiles',
    method: 'get',
    params,
  });
}
