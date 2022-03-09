/*
 * @Author: zhangjicheng
 * @Date: 2022-03-05 23:15:42
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-03-09 18:17:39
 * @FilePath: \blog-app\src\components\AvatarUpload\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import { FC, useState, useEffect } from 'react';
import { Button, message, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { uploadFile } from '@/services/global';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/es/modal/style';
import 'antd/es/slider/style';

interface UploadFileProps extends UploadFile {
  name: string;
  percent?: number;
  status: 'error' | 'success' | 'done' | 'uploading' | 'removed';
  url?: string;
  uid: string;
}

interface AvatarUploadProps {
  onChange?: (value: string) => void;
  value?: string;
}

const AvatarUpload: FC<AvatarUploadProps> = (props) => {
  const { onChange, value } = props;

  const [fileList, setFileList] = useState<UploadFileProps[]>([]);

  function uploadFileList(
    file: any,
    status: UploadFileProps['status'],
    url?: string,
  ) {
    const { name, uid } = file;
    const fileObj = {
      name,
      // percent:
      status,
      url,
      uid,
    };
    setFileList([fileObj]);
  }

  function handleUpload() {}

  async function beforeUpload(file: any) {
    uploadFileList(file, 'uploading');
    uploadFile(file)
      .then((res) => {
        const {
          data: { url },
        } = res;
        typeof onChange === 'function' && onChange(url);
      })
      .catch((err) => {
        message.error('头像上传失败，请重试');
        console.error(err);
      });
  }

  function onRemove() {
    typeof onChange === 'function' && onChange('');
  }

  useEffect(
    function () {
      value
        ? setFileList([{ ...fileList[0], url: value, status: 'done' }])
        : setFileList([]);
    },
    [value],
  );

  return (
    <div>
      <ImgCrop rotate zoom>
        <Upload
          name="avatar"
          accept="image/*"
          fileList={fileList}
          beforeUpload={beforeUpload}
          // action="/upload.do"
          onRemove={onRemove}
          listType="picture"
        >
          <Button onClick={handleUpload} icon={<UploadOutlined />}>
            Click to upload avatar
          </Button>
        </Upload>
      </ImgCrop>
    </div>
  );
};

export default AvatarUpload;
