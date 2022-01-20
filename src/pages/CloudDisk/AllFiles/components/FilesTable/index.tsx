/*
 * @Author: your name
 * @Date: 2022-01-05 15:00:10
 * @LastEditTime: 2022-01-20 21:36:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\AllFiles\components\FilesTable\index.tsx
 */

import React, { FC, useMemo, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Spin, Popover } from 'antd';
import ColumnsName from '../ColumnsName';
import { renderType } from 'utils/filesType';
import { thousands } from 'utils/math';
import { renderSize } from 'utils/utils';
import moment from 'moment';

import styles from './index.less';

// 判断单击双击
let timer: NodeJS.Timeout | null = null;

const RenderSize: FC<{ size: number }> = (props) => {
  const { size } = props;
  const [_$0, $1, $2] = renderSize(size).match(/^([0-9\.]+)(\w+)$/) as string[];
  const num = thousands($1);
  return (
    <>
      <span>{num}</span>
      <span style={{ marginLeft: 5 }}>{$2}</span>
    </>
  );
};

const PopoverContent: FC<any> = (props) => {
  const { data, onDelete, onOpen, onNew } = props;

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
  }

  function onHandleDelete() {
    onDelete(data);
  }

  function onHandleOpen() {
    onOpen(data);
  }

  function onHandleNew() {
    onNew(data);
  }

  return (
    <div className={styles.popoverContent} onClick={onClick}>
      <span onClick={onHandleOpen}>打开</span>
      <span onClick={onHandleDelete}>删除</span>
      {/* <span>复制</span> */}
      {/* <span>发送到</span> */}
      {/* <span>分享</span> */}
      {/* <span>下载</span> */}
      <span onClick={onHandleNew}>新建文件夹</span>
    </div>
  );
};

type FilesTableProps = {
  /**
   * 表格数据
   */
  data: fileDataProps[];
  /**
   * 删除文件
   */
  onDelete?: (item: fileDataProps) => void;
  /**
   * 打开文件
   */
  onOpen?: (item: fileDataProps) => void;
  /**
   * 新建文件
   */
  onNew?: (item: fileDataProps) => void;
  /**
   * 双击列表项
   */
  onDoubleClick?: (item: fileDataProps) => void;
  /**
   * 命名完成
   */
  onNameOk?: (item: fileDataProps) => void;
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
    onDoubleClick,
    onNameOk,
    loading = false,
  } = props;

  const [contextMenuKeys, setContextMenuKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 重命名
  function rename(item: fileDataProps) {
    typeof onNameOk === 'function' && onNameOk(item);
  }

  // 删除
  function onHandleDelete(item: fileDataProps) {
    typeof onDelete === 'function' && onDelete(item);
  }

  // 打开文件
  function onHandleOpen(item: fileDataProps) {
    typeof onOpen === 'function' && onOpen(item);
  }

  // 新建文件
  function onHandleNew(item: fileDataProps) {
    typeof onNew === 'function' && onNew(item);
  }

  // 右键单击
  function onTableItemContextMenu(
    e: React.MouseEvent<HTMLDivElement>,
    item: fileDataProps,
  ) {
    e.preventDefault(); // 阻止默认事件
    setSelectedKeys([item._id]);
    setContextMenuKeys([item._id]);
    console.log('onTableContextMenu');
  }

  // 单击table item
  function onTableItemClick(
    _e: React.MouseEvent<HTMLDivElement>,
    item: fileDataProps,
  ) {
    if (selectedKeys.includes(item._id)) {
      return;
    } else {
      console.log('select');
    }
  }

  // 双击table items
  function onTableItemDoubleClick(
    _e: React.MouseEvent<HTMLDivElement>,
    item: fileDataProps,
  ) {
    onDoubleClick && onDoubleClick(item);
  }

  // !选择table item 双击阻止单击事件, 主要为了处理选中状态下，双击触发rename事件
  function onHandleItemClick(
    e: React.MouseEvent<HTMLDivElement>,
    item: fileDataProps,
  ) {
    // 设置选中状态，不放在单击事件中处理，减少延迟
    setSelectedKeys([item._id]);
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
      setContextMenuKeys([]);
    });
    return function () {
      document.body.removeEventListener('click', () => {});
    };
  }, []);

  return (
    <div className={styles.fileTable}>
      <Spin tip="Loading..." spinning={loading}>
        <div className={classnames(styles.tr, styles.header)}>
          <span className={styles.td}>名称</span>
          <span className={styles.td}>修改时间</span>
          <span className={styles.td}>类型</span>
          <span className={styles.td}>大小</span>
        </div>
        <div className={styles.tbody}>
          {data.map((item: fileDataProps) => {
            const { name, attribute, _id: id } = item;
            const { size, create_time } = attribute;
            const createTime = moment(create_time).format('YYYY-MM-DD HH:mm');
            const selected = selectedKeys.includes(id);
            const popoverVisiable = contextMenuKeys.includes(id);
            const type = name.includes('.')
              ? name.replace(/.*\.(\w+)$/, '$1')
              : 'dir';
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
                    />
                  }
                  visible={popoverVisiable}
                >
                  <span className={styles.td}>
                    <ColumnsName record={item} addNewDir={onNameOk} />
                  </span>
                </Popover>
                <span className={styles.td}>{createTime}</span>
                <span className={styles.td}>{renderType(type)}</span>
                <span className={styles.td}>
                  <RenderSize size={size} />
                </span>
              </div>
            );
          })}
        </div>
      </Spin>
    </div>
  );
};

export default FilesTable;
