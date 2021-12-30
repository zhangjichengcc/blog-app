/*
 * @Author: your name
 * @Date: 2021-12-30 11:42:24
 * @LastEditTime: 2021-12-30 17:07:55
 * @LastEditors: Please set LastEditors
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
} from '@ant-design/icons';

interface fileComponentsProps {
  directory: React.ReactElement;
  file: React.ReactElement;
  excel: React.ReactElement;
  pdf: React.ReactElement;
  word: React.ReactElement;
  image: React.ReactElement;
  zip: React.ReactElement;
  markdown: React.ReactElement;
  text: React.ReactElement;
}

type typeProps = keyof fileComponentsProps;

const fileComponents: fileComponentsProps = {
  directory: <FolderOutlined />,
  file: <FileUnknownOutlined />,
  excel: <FileExcelOutlined />,
  pdf: <FilePdfOutlined />,
  word: <FileWordOutlined />,
  image: <FileImageOutlined />,
  zip: <FileZipOutlined />,
  markdown: <FileMarkdownOutlined />,
  text: <FileTextOutlined />,
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
  if (!fileName.includes('.')) return 'directory';
  const type = fileName.replace(/.*\.(\w+)$/, '$1');
  const map = new Map([
    [['xls', 'xlsx'], 'excel'],
    [['pdf'], 'pdf'],
    [['doc', 'docx'], 'word'],
    [['png', 'jpg', 'jpeg', 'gif', 'webp'], 'image'],
    [['zip', 'rar'], 'zip'],
    [['md'], 'markdown'],
    [['txt'], 'text'],
  ]);
  for (const key of map.keys()) {
    if (key.includes(type)) return map.get(key);
  }
  return 'file';
}

export default FileIcon;
