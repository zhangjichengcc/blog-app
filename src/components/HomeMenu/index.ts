export { default as TopMenu } from './TopMenu';
export { default as BottomMenu } from './BottomMenu';

import { DomRect } from '@/utils/tools';

/**
 * 菜单项
 */
export interface MenuItem {
  /** 菜单关键字 */
  key: string;
  /** 菜单名称 */
  label: string;
  /** dom定位信息 */
  domRect?: DomRect;
  /** 地址 */
  url?: string;
}
