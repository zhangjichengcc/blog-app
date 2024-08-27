/*
 * @Author: zhangjicheng
 * @Date: 2022-10-14 14:52:20
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-08-26 16:15:11
 * @FilePath: /blog5.0_front-end/src/store/features/global/globalSlice.ts
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../../index';
import { type Gird } from '@/utils/hooks';

interface GlobalState {
  /** 屏幕栅格化尺寸 */
  gird: Gird;
}

const initialState: GlobalState = {
  /** 首页菜单 */
  gird: 'xs',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    /** 设置屏幕栅格化尺寸 */
    setGird: (state, action: PayloadAction<GlobalState['gird']>) => {
      state.gird = action.payload;
    },
  },
});

export const { setGird } = globalSlice.actions;

export default globalSlice.reducer;
