/*
 * @Author: your name
 * @Date: 2021-12-23 20:38:14
 * @LastEditTime: 2024-12-19 18:01:41
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /blog5.0_front-end/src/pages/CloudDisk/components/HistoryBar/index.tsx
 */

import { useImperativeHandle, forwardRef } from 'react';
import BreadCrumbNode from '@/utils/BreadCrumbNode';
import useBreadCrumb from '../../hooks/useBreadCrumb';
import {
  ReloadOutlined,
  CaretRightOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

import styles from './index.less';

type HistoryBarProps = {
  // /**
  //  * 接收子组件ref，用于父组件调用子组件方法
  //  * cRef.current.addHistory() // 添加历史记录
  //  */
  // cRef: RefObject<ReactElement>;
  /**
   * 默认历史记录列表
   */
  history?: BreadCrumbNode[];
  /**
   * 面包屑导航变化触发
   */
  onChange?: (node: BreadCrumbNode) => Promise<any>;
  /**
   * 页面刷新
   */
  onReload?: (node: BreadCrumbNode) => void;
};

/**
 * historyBar 暴露方法
 */
export interface HistoryBarHandles {
  push: (node: BreadCrumbNode) => void;
}

// const HistoryBar: FC<HistoryBarProps> = (props): ReactElement => {
const forwardRender: React.ForwardRefRenderFunction<HistoryBarHandles, HistoryBarProps> = (props, ref) => {
  const { history: _history = [], onChange, onReload } = props;
  const [history, currentIdx, visualHistory, go, push] = useBreadCrumb(_history);

  const leftActive = currentIdx > 0;
  const rightActive = currentIdx < history.length - 1;

  /**
   * 后退
   */
  async function goBack() {
    if (!leftActive) return;
    if (typeof onChange === 'function') {
      await onChange(history[currentIdx - 1]);
    }
    go(-1);
  }

  /**
   * 前进
   */
  async function forward() {
    if (!rightActive) return;
    if (typeof onChange === 'function') {
      await onChange(history[currentIdx + 1]);
    }
    go(1);
  }

  /**
   * 刷新
   */
  function reload() {
    typeof onReload === 'function' && onReload(history[currentIdx]);
  }

  /**
   * 点击指定目录触发
   * @param item
   */
  async function onHandleClick(item: BreadCrumbNode) {
    typeof onChange === 'function' && (await onChange(item));
    push(item);
    typeof onChange === 'function' && onChange(item);
  }

  useImperativeHandle(ref, (): HistoryBarHandles => ({
    push,
  }));

  return (
    <div className={styles.historyBar}>
      <div className={styles.leftBar}>
        {/* <LeftOutlined
          className={leftActive ? styles.active : ''}
          onClick={goBack}
        /> */}
        <ArrowLeftOutlined
          className={leftActive ? styles.active : ''}
          onClick={goBack}
        />
        <ArrowRightOutlined
          className={rightActive ? styles.active : ''}
          onClick={forward}
        />
        <ReloadOutlined className={styles.active} onClick={reload} />
      </div>
      <i />
      <div className={styles.rightBar}>
        {visualHistory.map((item: BreadCrumbNode, idx: number) => {
          const { id, name } = item;
          return (
            <span key={id}>
              {idx !== 0 && <CaretRightOutlined style={{ margin: '0 5px' }} />}
              <span
                className={styles.filder}
                onClick={() => onHandleClick(item)}
              >
                {name}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default forwardRef(forwardRender);
