/*
 * @Author: your name
 * @Date: 2022-01-05 15:00:10
 * @LastEditTime: 2022-01-06 15:34:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\AllFiles\components\FilesTable\index.tsx
 */

import React, { FC, useMemo } from 'react';
import classnames from 'classnames';
import { Spin } from 'antd';
import ColumnsName from '../ColumnsName';
import { renderType } from 'utils/filesType';
import { thousands } from 'utils/math';
import { renderSize } from 'utils/utils';

import styles from './index.less';

// 判断单击双击
let timer: NodeJS.Timeout | null = null;

const FilesTable: FC<any> = (props) => {
  const {
    data,
    selectedKeys = [],
    onClick,
    onDoubleClick,
    onNameOk,
    loading = false,
  } = props;

  // 重命名
  function rename() {
    debugger;
  }

  // 选择table item
  function onTableClick(
    e: React.MouseEvent<HTMLDivElement>,
    item: fileDataProps,
  ) {
    if (!!timer) {
      onHandleDoubleClick(e, item);
      // 若触发双击则阻止首次单击事件
      clearTimeout(timer);
      timer = null;
    } else {
      timer = setTimeout(() => {
        timer = null;
        onHandleClick(e, item);
      }, 300);
    }
  }

  // 右键单击
  function onTableContextMenu(
    e: React.MouseEvent<HTMLDivElement>,
    item: fileDataProps,
  ) {
    e.preventDefault();
    console.log('onTableContextMenu');
  }

  // 单击table item
  function onHandleClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: fileDataProps,
  ) {
    console.log('onHandleClick');
    // if (selectedKeys.includes(item.id)) {
    //   rename();
    // } else {
    //   onClick(item);
    // }
  }

  // 双击table item
  function onHandleDoubleClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: fileDataProps,
  ) {
    console.log('onHandleDoubleClick');
    // e.preventDefault();
    // onDoubleClick(item);
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
            const { name, createTime, size, id } = item;
            const selected = selectedKeys.includes(id);
            const type = name.includes('.')
              ? name.replace(/.*\.(\w+)$/, '$1')
              : 'dir';
            return (
              <div
                key={id}
                className={classnames(styles.tr, selected ? styles.active : '')}
                onClick={(e) => onTableClick(e, item)}
                onContextMenu={(e) => onTableContextMenu(e, item)}
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
            );
          })}
        </div>
      </Spin>
    </div>
  );
};

export default FilesTable;
