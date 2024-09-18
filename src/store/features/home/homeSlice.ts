/*
 * @Author: zhangjicheng
 * @Date: 2022-10-14 14:52:20
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-09-18 17:37:11
 * @FilePath: /blog5.0_front-end/src/store/features/home/homeSlice.ts
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../index';
import { type MenuItem } from '@/components/HomeMenu';

interface HomeState {
  /** 首页菜单 */
  homeMenu: Array<MenuItem>;
  /** 当前激活的菜单 */
  activeMenu?: MenuItem['key'];
}

const initialState: HomeState = {
  /** 首页菜单 */
  homeMenu: [],
  activeMenu: undefined,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    /** 设置首页菜单 */
    setMenu: (state, action: PayloadAction<HomeState['homeMenu']>) => {
      state.homeMenu = action.payload;
    },
    /** 设置当前激活的菜单 */
    setActiveMenu: (state, action: PayloadAction<HomeState['activeMenu']>) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { setMenu, setActiveMenu } = homeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectHomeMenu = (state: RootState) => state.home.homeMenu;

export default homeSlice.reducer;
