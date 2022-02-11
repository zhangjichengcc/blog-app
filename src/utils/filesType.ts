/*
 * @Author: zhangjicheng
 * @Date: 2022-01-06 11:04:14
 * @LastEditTime: 2022-02-11 11:36:22
 * @LastEditors: zhangjicheng
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

// 获取文件类型
export function getType(name: string = ''): string {
  return name.includes('.')
    ? name.replace(/.*\.(?<name>\w+)$/, '$<name>')
    : 'dir';
}

// 获取文件大类
export function getCategory(type: string = ''): string {
  const map: { [key: string]: Array<string> } = {
    img: ['jpg', 'jpeg', 'git', 'png', 'webp', 'ico', 'svg'],
    txt: ['txt'],
    zip: ['zip', 'rar'],
    md: ['md'],
    media: ['mp4', 'mp3', 'avi', 'rm', 'rmvb', 'wave', '3gp', 'midi'],
    word: ['doc', 'docx'],
    excel: ['xls', 'xlsx'],
    dir: ['dir'],
    pdf: ['pdf'],
  };

  for (let i in map) {
    const arr = map[i];
    if (arr.includes(type)) return i;
  }
  return 'unKnow';
}
