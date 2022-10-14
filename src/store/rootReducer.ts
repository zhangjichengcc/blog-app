/*
 * @Author: zhangjicheng
 * @Date: 2022-10-14 14:46:17
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-10-14 17:27:05
 * @FilePath: \blog5.0_front-end\src\store\rootReducer.ts
 */
import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from './features/home/homeSlice';

// export default function rootReducer(state = {}, action: Action) {
//   return {
//     home: homeReducer(state.home, action),
//   }
// }

const rootReducer = combineReducers({
  home: homeReducer,
})

export default rootReducer;