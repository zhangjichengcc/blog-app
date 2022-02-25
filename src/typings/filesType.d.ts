/*
 * @Author: your name
 * @Date: 2022-01-06 09:46:56
 * @LastEditTime: 2022-01-18 18:58:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\typings\filesType.d.ts
 */

// 文件夹
declare type DirType = 'dir';

/**
 * 文档格式
 */
// word 文档
declare type WordType = 'doc' | 'docx';
// excel 文档
declare type ExcType = 'xls' | 'xlsx';
// pdf 文档
declare type PdfType = 'pdf';
// ppt 文档
declare type PptType = 'ppt';
// txt 文档
declare type TxtType = 'txt';

/* ------------------------------------------------------------------------------ */

/**
 * 媒体格式
 */
// 视频格式
declare type VideoType = 'mp4' | 'avi' | 'rm' | 'rmvb' | '3gp';
// 音频格式
declare type VoiceType = 'mp3' | 'wave' | 'midi';

/* ------------------------------------------------------------------------------ */

/**
 * 图片格式
 */
declare type ImgType = 'png' | 'jpeg' | 'gif' | 'jpg' | 'ico' | 'svg' | 'webp';

/* ------------------------------------------------------------------------------ */

/**
 * 压缩格式
 */
declare type CompressType = 'zip' | 'rar';

/* ------------------------------------------------------------------------------ */

/**
 * 应用程序格式
 */
declare type ApplyType = 'exe' | 'pkg' | 'dmg' | 'app';

/* ------------------------------------------------------------------------------ */

/**
 * 文档
 */
declare type DocType = TxtType | WordType | ExcType | PdfType | PptType;

/**
 * 媒体
 */
declare type MediaType = VideoType | VoiceType;

/**
 * 常见文件类型
 */
declare type FilesType =
  | ImgType
  | MediaType
  | CompressType
  | ApplyType
  | DocType;
