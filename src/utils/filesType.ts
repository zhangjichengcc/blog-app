/*
 * @Author: zhangjicheng
 * @Date: 2022-01-06 11:04:14
 * @LastEditTime: 2022-01-18 18:59:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\utils\filesType.ts
 */

export function renderType(type: string): string {
  const typeMap: { [key in FilesType | 'dir']?: string } = {
    dir: '文件夹',
    pdf: 'PDF 文档',
    ppt: 'PPT 文档',
    gif: 'GIF 图片文件',
    png: 'PNG 图片文件',
    jpg: 'JPG 图片文件',
    jpeg: 'JPEG 图片文件',
    ico: 'ICO 图片文件',
    webp: 'WEBP 图片文件',
    svg: 'SVG 图片文件',
    txt: 'TXT 文本文件',
    doc: 'DOC 文档',
    docx: 'DOCX 文档',
    xls: 'XLS 工作表',
    xlsx: 'XLSX 工作表',
    mp4: 'MP4 视频文件',
    avi: 'AVI 视频文件',
    rm: 'RMVB 视频文件',
    rmvb: 'RMVB 视频文件',
    '3gp': '3GP 视频文件',
    mp3: 'MP3 音频文件',
    wave: 'WAVE 音频文件',
    midi: 'MIDI音频文件',
    zip: 'ZIP 压缩文件',
    rar: 'RAR 压缩文件',
    exe: '应用程序',
    pkg: '应用程序',
    app: '应用程序',
    dmg: '镜像文件',
  };

  return typeMap[type as FilesType] || '未知文件';
}
