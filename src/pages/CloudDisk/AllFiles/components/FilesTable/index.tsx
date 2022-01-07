/*
 * @Author: your name
 * @Date: 2022-01-05 15:00:10
 * @LastEditTime: 2022-01-07 17:52:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\AllFiles\components\FilesTable\index.tsx
 */

import React, { FC, useMemo, useState } from 'react';
import classnames from 'classnames';
import { Spin, Popover } from 'antd';
import ColumnsName from '../ColumnsName';
import { renderType } from 'utils/filesType';
import { thousands } from 'utils/math';
import { renderSize } from 'utils/utils';

import styles from './index.less';

// 判断单击双击
let timer: NodeJS.Timeout | null = null;
// 判断重命名操作
let renameTimer: NodeJS.Timeout | null = null;

const FilesTable: FC<any> = (props) => {
  const {
    data,
    // selectedKeys = [],
    onClick,
    onDoubleClick,
    onNameOk,
    loading = false,
  } = props;

  const [contextMenuKeys, setContextMenuKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 重命名
  function rename() {
    debugger;
  }

  // 右键单击
  function onTableItemContextMenu(
    e: React.MouseEvent<HTMLDivElement>,
    item: fileDataProps,
  ) {
    e.preventDefault();
    setSelectedKeys([item.id]);
    setContextMenuKeys([item.id]);
    console.log('onTableContextMenu');
  }

  // 格式化文件大小
  const RenderSize = useMemo(
    () =>
      function (props: { size: number }) {
        const [_$0, $1, $2] = renderSize(props.size).match(
          /^([0-9\.]+)(\w+)$/,
        ) as string[];
        const num = thousands($1);
        return (
          <>
            <span>{num}</span>
            <span style={{ marginLeft: 5 }}>{$2}</span>
          </>
        );
      },
    [],
  );

  // 单击table item
  function onTableItemClick(
    e: React.MouseEvent<HTMLDivElement>,
    item: fileDataProps,
  ) {
    if (selectedKeys.includes(item.id)) {
      console.log('rename');
    } else {
      console.log('select');
    }
  }

  // 双击table items
  function onTableItemDoubleClick(
    e: React.MouseEvent<HTMLDivElement>,
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
    setSelectedKeys([item.id]);
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

  function onTableClick(_e: any) {
    setContextMenuKeys([]);
  }

  return (
    <div className={styles.fileTable}>
      <Spin tip="Loading..." spinning={loading}>
        <div className={classnames(styles.tr, styles.header)}>
          <span className={styles.td}>名称</span>
          <span className={styles.td}>修改时间</span>
          <span className={styles.td}>类型</span>
          <span className={styles.td}>大小</span>
        </div>
        <div className={styles.tbody} onClick={onTableClick}>
          {data.map((item: fileDataProps) => {
            const { name, createTime, size, id } = item;
            const selected = selectedKeys.includes(id);
            const popoverVisiable = contextMenuKeys.includes(id);
            const type = name.includes('.')
              ? name.replace(/.*\.(\w+)$/, '$1')
              : 'dir';
            return (
              <Popover content={'tianye shabi'} visible={popoverVisiable}>
                <div
                  key={id}
                  className={classnames(
                    styles.tr,
                    selected ? styles.active : '',
                  )}
                  onClick={(e) => onHandleItemClick(e, item)}
                  // onDoubleClick={e => onHandleDoubleClick(e, item)}
                  onContextMenu={(e) => onTableItemContextMenu(e, item)}
                >
                  <span className={styles.td}>
                    <ColumnsName
                      record={item}
                      addNewDir={onNameOk}
                      onNameChanged={onNameOk}
                    />
                  </span>
                  <span className={styles.td}>{createTime}</span>
                  <span className={styles.td}>{renderType(type)}</span>
                  <span className={styles.td}>
                    <RenderSize size={size} />
                  </span>
                </div>
              </Popover>
            );
          })}
        </div>
      </Spin>
    </div>
  );
};

export default FilesTable;
