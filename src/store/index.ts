/*
 * @Author: zhangjicheng
 * @Date: 2022-10-14 10:36:42
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-08-23 11:48:48
 * @FilePath: /blog5.0_front-end/src/store/index.ts
 */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
