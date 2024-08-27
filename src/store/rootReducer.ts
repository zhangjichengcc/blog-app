/*
 * @Author: zhangjicheng
 * @Date: 2022-10-14 14:46:17
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-08-26 16:15:44
 * @FilePath: /blog5.0_front-end/src/store/rootReducer.ts
 */
import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from './features/home/homeSlice';
import globalReducer from './features/global/globalSlice';

const rootReducer = combineReducers({
  home: homeReducer,
  global: globalReducer,
});

export default rootReducer;
