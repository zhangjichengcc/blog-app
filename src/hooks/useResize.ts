/*
 * @Author: zhangjicheng
 * @Date: 2022-03-11 17:15:44
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-03-11 17:46:36
 * @FilePath: \blog-app\src\hooks\useResize.ts
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import { useState, useCallback, useEffect } from 'react';

interface SizeProps {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export default function useResize(): SizeProps {
  const [size, setSize] = useState<SizeProps>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const onResize = useCallback(function () {
    const sizeParams = document.body.getBoundingClientRect();
    setSize(sizeParams);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return size;
}
