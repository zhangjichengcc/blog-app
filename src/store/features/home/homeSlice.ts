/*
 * @Author: zhangjicheng
 * @Date: 2022-10-14 14:52:20
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-14 19:02:03
 * @FilePath: \blog5.0_front-end\src\store\features\home\homeSlice.ts
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../index';

interface HomeState {
  homeMenu: Array<any>;
}

const initialState: HomeState = {
  homeMenu: [],
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<HomeState['homeMenu']>) => {
      state.homeMenu = action.payload;
    }
  }
})

export const { setMenu } = homeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectHomeMenu = (state: RootState) => state.home.homeMenu;

export default homeSlice.reducer;