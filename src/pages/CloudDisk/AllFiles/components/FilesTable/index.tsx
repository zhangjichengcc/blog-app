/*
 * @Author: your name
 * @Date: 2022-01-05 15:00:10
 * @LastEditTime: 2022-11-09 18:47:10
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog5.0_front-end\src\pages\CloudDisk\AllFiles\components\FilesTable\index.tsx
 */

import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Spin, Popover } from 'antd';
import ColumnsName from '../ColumnsName';
import PopoverContent from '../PopoverContent';
import { renderType, getType } from 'utils/filesType';
import type {
  FileProps,
} from '@/services/cloudDist';
import { thousands } from 'utils/math';
import { renderSize } from '@/utils';
import moment from 'js-moment';

import styles from './index.less';

// 判断单击双击
let timer: NodeJS.Timeout | null = null;

const RenderSize: FC<{ size: number }> = (props) => {
  const { size } = props;
  const [, $1, $2] = renderSize(size).match(/^([0-9\\.]+)(\w+)$/) as string[];
  const num = thousands($1);
  return (
    <>
      <span>{num}</span>
      <span style={{ marginLeft: 5 }}>{$2}</span>
    </>
  );
};

type FilesTableProps = {
  /**
   * 表格数据
   */
  data: FileProps[];
  /**
   * 删除文件
   */
  onDelete?: (item: FileProps) => void;
  /**
   * 打开文件
   */
  onOpen?: (item: FileProps) => void;
  /**
   * 新建文件
   */
  onNew?: (item: FileProps) => void;
  /**
   * 双击列表项
   */
  onDoubleClick?: (item: FileProps) => void;
  /**
   * 命名完成
   */
  onNameOk?: (item: FileProps) => void;
  /**
   * 重命名文件
   */
  onRename?: (item: FileProps) => void;
  /**
   * 文件下载
   */
  onDownLoad?: (item: FileProps) => void;
  /**
   * 表格加载状态
   */
  loading?: boolean;
};

const FilesTable: FC<FilesTableProps> = (props) => {
  const {
    data,
    onDelete,
    onOpen,
    onNew,
    onRename,
    onDoubleClick,
    onNameOk,
    onDownLoad,
    loading = false,
  } = props;

  const [contextMenuKeys, setContextMenuKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 删除
  function onHandleDelete(item: FileProps) {
    setContextMenuKeys([]);
    typeof onDelete === 'function' && onDelete(item);
  }

  // 打开文件
  function onHandleOpen(item: FileProps) {
    setContextMenuKeys([]);
    typeof onOpen === 'function' && onOpen(item);
  }

  // 新建文件
  function onHandleNew(item: FileProps) {
    setContextMenuKeys([]);
    typeof onNew === 'function' && onNew(item);
  }

  // 重命名文件
  function onHandleRename(item: FileProps) {
    setContextMenuKeys([]);
    typeof onRename === 'function' && onRename(item);
  }

  // 右键单击
  function onTableItemContextMenu(
    e: React.MouseEvent<HTMLDivElement>,
    item: FileProps,
  ) {
    e.preventDefault(); // 阻止默认事件
    setSelectedKeys([item._id]);
    setContextMenuKeys([item._id]);
    console.log('onTableContextMenu');
  }

  // 单击table item
  function onTableItemClick(
    _e: React.MouseEvent<HTMLDivElement>,
    item: FileProps,
  ) {
    if (selectedKeys.includes(item._id)) {
      onHandleRename(item);
    } else {
      console.log('select');
    }
  }

  // 双击table items
  function onTableItemDoubleClick(
    _e: React.MouseEvent<HTMLDivElement>,
    item: FileProps,
  ) {
    onDoubleClick && onDoubleClick(item);
  }

  // !选择table item 双击阻止单击事件, 主要为了处理选中状态下，双击触发rename事件
  function onHandleItemClick(
    e: React.MouseEvent<HTMLDivElement>,
    item: FileProps,
  ) {
    e.stopPropagation(); // ? 阻止合成事件冒泡，这里用来阻止触发body的click事件
    // e.nativeEvent.stopImmediatePropagation(); // ? 阻止合成事件与最外层document上的事件间的冒泡
    const {
      target: { dataset },
    } = e as any; // ? 获取点击元素的自定义属性 data-type, 若为popover则阻止，解决点击popover触发item点击事件的bug
    if (dataset.type === 'popover') return;
    // 设置选中状态，不放在单击事件中处理，减少延迟
    setSelectedKeys([item._id]);
    setContextMenuKeys([]); // 清空menukeys，即关闭右键弹窗
    // 双击判断
    if (timer) {
      // 300ms 内再次触发认为是双击，阻止timeout 防止触发单击事件
      clearTimeout(timer);
      timer = null;
      onTableItemDoubleClick(e, item);
      // 单击判断
    } else {
      // 记录timer，超时认为是单击事件
      timer = setTimeout(() => {
        timer && clearTimeout(timer);
        timer = null;
        onTableItemClick(e, item);
      }, 300);
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', () => {
      setContextMenuKeys([]); // 点击空白处清空menukeys，即关闭右键弹窗
      setSelectedKeys([]); // 点击空白处取消选中
    });
    return function () {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      document.body.removeEventListener('click', () => {});
    };
  }, []);

  return (
    <div className={styles.fileTable}>
      <Spin tip="Loading..." spinning={loading}>
        <div className={classnames(styles.tr, styles.header)}>
          <span className={styles.td}>Name</span>
          <span className={styles.td}>Date Modified</span>
          <span className={styles.td}>Size</span>
          <span className={styles.td}>Type</span>
        </div>
        <div className={styles.tbody}>
          {data.map((item: FileProps) => {
            const { name, attribute, _id: id } = item;
            const { size, create_time } = attribute;
            const createTime = moment(create_time).format('YYYY-MM-dd HH:mm');
            const selected = selectedKeys.includes(id);
            const popoverVisiable = contextMenuKeys.includes(id);
            const type = getType(name);
            return (
              <div
                key={id}
                className={classnames(styles.tr, selected ? styles.active : '')}
                onClick={(e) => onHandleItemClick(e, item)}
                // onDoubleClick={e => onHandleDoubleClick(e, item)}
                onContextMenu={(e) => onTableItemContextMenu(e, item)}
              >
                <Popover
                  content={
                    <PopoverContent
                      data={item}
                      onDelete={onHandleDelete}
                      onOpen={onHandleOpen}
                      onNew={onHandleNew}
                      onRename={onHandleRename}
                      onDownLoad={onDownLoad}
                    />
                  }
                  open={popoverVisiable}
                >
                  <span className={styles.td}>
                    <ColumnsName record={item} addNewDir={onNameOk} />
                  </span>
                </Popover>
                <span className={styles.td}>{createTime}</span>
                <span className={styles.td}>
                  {type === 'dir' ? '--' : <RenderSize size={size} />}
                </span>
                <span className={styles.td}>{renderType(type)}</span>
              </div>
            );
          })}
        </div>
      </Spin>
    </div>
  );
};

export default FilesTable;
