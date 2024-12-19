/*
 * @Author: zhangjicheng
 * @Date: 2022-10-14 14:52:20
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-12-19 11:45:28
 * @FilePath: /blog5.0_front-end/src/store/features/global/globalSlice.ts
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../../index';
import { type Gird } from '@/utils/hooks';

type UserInfo = {
  username?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  id?: string;
};

interface GlobalState {
  /** 屏幕栅格化尺寸 */
  gird: Gird;
  /** 用户信息 */
  user?: UserInfo;
}

const initialState: GlobalState = {
  /** 首页菜单 */
  gird: 'xs',
  user: undefined,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    /** 设置屏幕栅格化尺寸 */
    setGird: (state, action: PayloadAction<GlobalState['gird']>) => {
      document.body.classList.remove(`screen-${state.gird}`);
      document.body.classList.add(`screen-${action.payload}`);
      state.gird = action.payload;
    },
    /** 设置用户信息 */
    setUser: (state, action: PayloadAction<GlobalState['user']>) => {
      state.user = action.payload;
    },
  },
});

export const { setGird, setUser } = globalSlice.actions;

export default globalSlice.reducer;
