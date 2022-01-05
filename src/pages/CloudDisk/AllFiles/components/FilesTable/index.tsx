/*
 * @Author: your name
 * @Date: 2022-01-05 15:00:10
 * @LastEditTime: 2022-01-05 18:57:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\AllFiles\components\FilesTable\index.tsx
 */

import React, { FC, useMemo } from 'react';
import classnames from 'classnames';
import { Spin } from 'antd';
import ColumnsName from '../ColumnsName';
import { thousands } from 'utils/math';
import { renderSize } from 'utils/utils';

import styles from './index.less';

const FilesTable: FC<any> = (props) => {
  const {
    data,
    selectedKeys = [],
    onClick,
    onDoubleClick,
    onNameOk,
    loading = false,
  } = props;

  function onHandleClick(item: fileDataProps) {
    onClick(item);
  }

  function onHandleDoubleClick(item: fileDataProps) {
    onDoubleClick(item);
  }

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

  function renderType(type: string): string {
    const typeMap = {
      dir: '文件夹',
      pdf: 'PDF 文档',
      gif: 'GIF 图片文件',
      png: 'PNG 图片文件',
      jpg: 'JPG 图片文件',
      jpeg: 'JPEG 图片文件',
      ico: 'ICO 图片文件',
      webp: 'WEBP 图片文件',
      doc: 'DOC 文档',
      docx: 'DOCX 文档',
      xls: 'XLS 工作表',
      xlsx: 'XLSX 工作表',
      mp4: 'MP4 视频文件',
      avi: 'AVI 视频文件',
      rm: 'RMVB 视频文件',
      rmvb: 'RMVB 视频文件',
      '3gp': '3GP 视频文件',
      zip: 'ZIP 压缩文件',
      rar: 'RAR 压缩文件',
      exe: '应用程序',
    } as { [key: string]: string };

    return typeMap[type] || '未知文件';
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
                onClick={(_e) => onHandleClick(item)}
                onDoubleClick={(_e) => onHandleDoubleClick(item)}
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
