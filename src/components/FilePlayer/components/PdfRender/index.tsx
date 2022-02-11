/*
 * @Author: zhangjicheng
 * @Date: 2022-02-11 16:27:13
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-02-11 18:18:48
 * @FilePath: \blog-app\src\components\MediaPlayer\components\PdfRender\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */

import React, { FC, useState, useEffect } from 'react';
// import { Image, Modal } from 'antd';
// import { Document, Page } from 'react-pdf';
// import request from 'utils/request';

// import styles from './index.less';

interface PdfRenderProps {
  name: string;
  url: string;
  visible: boolean;
  onCancel: () => void;
}

const PdfRender: FC<PdfRenderProps> = (props: any) => {
  const {
    // name,
    url,
    // visible,
    // onCancel,
  } = props;

  // const [numPages, setNumPages] = useState(0);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [blob, setBlob] = useState(null);

  // function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
  //   setNumPages(numPages);
  // }

  useEffect(() => {
    window.open(url);
  }, [url]);

  return (
    // <Modal
    //   title={name}
    //   visible={visible}
    //   footer={null}
    //   onCancel={onCancel}
    //   width="80vw"
    //   centered
    //   bodyStyle={{ width: '80vw', height: '78vh' }}
    // >
    //   <div>
    //     <Document file={blob} onLoadSuccess={onDocumentLoadSuccess}>
    //       <Page pageNumber={pageNumber} />
    //     </Document>
    //     <p>
    //       Page {pageNumber} of {numPages}
    //     </p>
    //   </div>
    // </Modal>
    null
  );
};

export default PdfRender;
