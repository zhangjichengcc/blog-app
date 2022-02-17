/*
 * @Author: your name
 * @Date: 2021-12-30 11:42:24
 * @LastEditTime: 2022-02-17 15:43:45
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\components\FileIcon\index.tsx
 */

import React, { FC } from 'react';
import { ImgIcon } from 'components/Icon';
import folder from 'assets/cloudDisk/folder.png';
import xlsx_win from 'assets/cloudDisk/xlsx_win.png';
import xlsx_mac from 'assets/cloudDisk/xlsx_mac.png';
import docx_win from 'assets/cloudDisk/docx_win.png';
import docx_mac from 'assets/cloudDisk/docx_mac.png';
import pdf from 'assets/cloudDisk/pdf.png';
import pptx_mac from 'assets/cloudDisk/pptx_mac.png';
import gif from 'assets/cloudDisk/gif.png';
import png from 'assets/cloudDisk/png.png';
import jpg from 'assets/cloudDisk/jpg.png';
import tiff from 'assets/cloudDisk/tiff.png';
import bmp from 'assets/cloudDisk/bmp.png';
import txt from 'assets/cloudDisk/txt.png';
import mpeg from 'assets/cloudDisk/mpeg.png';
import avi from 'assets/cloudDisk/avi.png';
import wmv from 'assets/cloudDisk/wmv.png';
import mp3 from 'assets/cloudDisk/mp3.png';
import wav from 'assets/cloudDisk/wav.png';
import midi from 'assets/cloudDisk/midi.png';
import zip from 'assets/cloudDisk/zip.png';
import rar from 'assets/cloudDisk/rar.png';
import exe from 'assets/cloudDisk/exe.png';
import app from 'assets/cloudDisk/app.png';
import dmg from 'assets/cloudDisk/dmg.png';
import unKnown from 'assets/cloudDisk/unKnown.png';

import { getType } from 'utils/filesType';

const ICON = (props: { src: string }) => {
  const { src } = props;
  return <ImgIcon src={src} style={{ fontSize: 20, marginRight: 8 }} />;
};

interface fileComponentsProps {
  dir: React.ReactElement; // '文件夹',
  pdf: React.ReactElement; // 'PDF 文档',
  ppt: React.ReactElement; // 'PPT 文档',
  gif: React.ReactElement; // 'GIF 图片文件',
  png: React.ReactElement; // 'PNG 图片文件',
  jpg: React.ReactElement; // 'JPG 图片文件',
  jpeg: React.ReactElement; // 'JPEG 图片文件',
  ico: React.ReactElement; // 'ICO 图片文件',
  webp: React.ReactElement; // 'WEBP 图片文件',
  svg: React.ReactElement; // 'SVG 图片文件',
  txt: React.ReactElement; // 'TXT 文本文件',
  doc: React.ReactElement; // 'DOC 文档',
  docx: React.ReactElement; // 'DOCX 文档',
  xls: React.ReactElement; // 'XLS 工作表',
  xlsx: React.ReactElement; // 'XLSX 工作表',
  mp4: React.ReactElement; // 'MP4 视频文件',
  avi: React.ReactElement; // 'AVI 视频文件',
  rm: React.ReactElement; // 'RMVB 视频文件',
  rmvb: React.ReactElement; // 'RMVB 视频文件',
  '3gp': React.ReactElement; // '3GP 视频文件',
  mp3: React.ReactElement; // 'MP3 音频文件',
  wave: React.ReactElement; // 'WAVE 音频文件',
  midi: React.ReactElement; // 'MIDI音频文件',
  zip: React.ReactElement; // 'ZIP 压缩文件',
  rar: React.ReactElement; // 'RAR 压缩文件',
  exe: React.ReactElement; // '应用程序',
  pkg: React.ReactElement; // '应用程序',
  app: React.ReactElement; // '应用程序',
  dmg: React.ReactElement; // '镜像文件',
}

type typeProps = keyof fileComponentsProps;

const fileComponents: fileComponentsProps = {
  dir: <ICON src={folder} />,
  pdf: <ICON src={pdf} />,
  ppt: <ICON src={pptx_mac} />,
  gif: <ICON src={gif} />,
  png: <ICON src={png} />,
  jpg: <ICON src={jpg} />,
  jpeg: <ICON src={jpg} />,
  ico: <ICON src={tiff} />,
  webp: <ICON src={bmp} />,
  svg: <ICON src={tiff} />,
  txt: <ICON src={txt} />,
  doc: <ICON src={docx_win} />,
  docx: <ICON src={docx_mac} />,
  xls: <ICON src={xlsx_win} />,
  xlsx: <ICON src={xlsx_mac} />,
  mp4: <ICON src={mpeg} />,
  avi: <ICON src={avi} />,
  rm: <ICON src={wmv} />,
  rmvb: <ICON src={wmv} />,
  '3gp': <ICON src={mpeg} />,
  mp3: <ICON src={mp3} />,
  wave: <ICON src={wav} />,
  midi: <ICON src={midi} />,
  zip: <ICON src={zip} />,
  rar: <ICON src={rar} />,
  exe: <ICON src={exe} />,
  pkg: <ICON src={app} />,
  app: <ICON src={app} />,
  dmg: <ICON src={dmg} />,
};

interface FileIconProps {
  type: typeProps;
  [key: string]: any;
}

const FileIcon: FC<FileIconProps> = (props) => {
  const { type, ...otherProps } = props;

  const Icon = fileComponents[type] || <ICON src={unKnown} />;

  return React.cloneElement(Icon, { ...otherProps });
};

export function getFileType(fileName: string): any {
  const type = getType(fileName);
  return type;
}

export default FileIcon;
