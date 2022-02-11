/*
 * @Author: your name
 * @Date: 2021-12-30 11:42:24
 * @LastEditTime: 2022-02-11 11:37:23
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\components\FileIcon\index.tsx
 */

import React, { FC } from 'react';
import {
  FolderOutlined,
  FileUnknownOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileImageOutlined,
  FileZipOutlined,
  FileMarkdownOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { getType, getCategory } from 'utils/filesType';

interface fileComponentsProps {
  dir: React.ReactElement;
  unKnow: React.ReactElement;
  excel: React.ReactElement;
  pdf: React.ReactElement;
  word: React.ReactElement;
  img: React.ReactElement;
  zip: React.ReactElement;
  md: React.ReactElement;
  txt: React.ReactElement;
  media: React.ReactElement;
}

type typeProps = keyof fileComponentsProps;

const fileComponents: fileComponentsProps = {
  dir: <FolderOutlined />,
  unKnow: <FileUnknownOutlined />,
  excel: <FileExcelOutlined />,
  pdf: <FilePdfOutlined />,
  word: <FileWordOutlined />,
  img: <FileImageOutlined />,
  zip: <FileZipOutlined />,
  md: <FileMarkdownOutlined />,
  txt: <FileTextOutlined />,
  media: <VideoCameraOutlined />,
};

interface FileIconProps {
  type: typeProps;
  [key: string]: any;
}

const FileIcon: FC<FileIconProps> = (props) => {
  const { type, ...otherProps } = props;

  const Icon = fileComponents[type];

  return React.cloneElement(Icon, { ...otherProps });
};

export function getFileType(fileName: string): any {
  const type = getType(fileName);
  return getCategory(type);
}

export default FileIcon;
