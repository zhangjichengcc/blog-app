/*
 * @Author: zhangjicheng
 * @Date: 2022-10-14 10:36:42
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-14 17:29:22
 * @FilePath: \blog5.0_front-end\src\store\store.ts
 */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;
