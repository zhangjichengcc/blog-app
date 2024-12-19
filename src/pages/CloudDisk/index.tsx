/*
 * @Author: your name
 * @Date: 2021-12-21 14:41:34
 * @LastEditTime: 2024-12-19 17:28:21
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /blog5.0_front-end/src/pages/CloudDisk/index.tsx
 */

import React, { FC, useState, useRef, forwardRef, ReactNode } from 'react';
import { Button, Input, Menu, Tabs, Badge, Dropdown } from 'antd';
import type { MenuProps, TabsProps } from 'antd';
import AllFiles, { AllFilesHandles } from './AllFiles';
import { ImgIcon } from 'components/Icon';
import downloadImg from 'assets/cloudDisk/folder_download.png';
import ownerImg from 'assets/cloudDisk/folder_owner.png';
import publicImg from 'assets/cloudDisk/folder_public.png';
import uploadImg from 'assets/cloudDisk/folder_upload.png';
import UserMenu from '@/components/UserMenu';

import BreadCrumbNode from 'utils/BreadCrumbNode';

import styles from './index.less';
import useBreadCrumb from './hooks/useBreadCrumb';

const { Search } = Input;

const CloudDisk: FC = () => {
  const [navTab, setNavTab] = useState<string>('private');
  const [AllFilesSelectedKeys, setAllFilesSelectedKeys] = useState<string[]>(
    [],
  );

  const AllFilesRef = useRef<AllFilesHandles>(null);

  /** tabs列表 */
  const tabsItems: TabsProps['items'] = [
    {
      label: 'myFiles',
      key: 'private',
      children: (
        <AllFiles
          ref={AllFilesRef}
          // onHistoryChange={onAllFilesMenuChange}
          onSelectedChange={onSelectedChange}
        />
      ),
    },
    {
      label: 'publicFiles',
      key: 'public',
      children: 'publicFiles',
    },
    {
      label: 'uploadFiles',
      key: 'upload',
      children: 'uploadFiles',
    },
    {
      label: 'downloadFiles',
      key: 'download',
      children: 'downloadFiles',
    },
  ];

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  /** menu列表 */
  const menuItems: MenuProps['items'] = [
    {
      type: 'group',
      label: <span style={{ fontWeight: 500 }}>Files List</span>,
      children: [
        {
          key: 'private',
          label: <span>Personal Files</span>,
          icon: (
            <ImgIcon style={{ fontSize: 28, marginRight: 8 }} src={ownerImg} />
          ),
        },
        {
          key: 'public',
          label: <span>Share Files</span>,
          icon: (
            <ImgIcon style={{ fontSize: 28, marginRight: 8 }} src={publicImg} />
          ),
        },
      ],
    },
    {
      type: 'group',
      label: <span style={{ fontWeight: 500 }}>Transfers List</span>,
      children: [
        {
          key: 'upload',
          label: <span>Uploading</span>,
          icon: (
            <ImgIcon style={{ fontSize: 28, marginRight: 8 }} src={uploadImg} />
          ),
        },
        {
          key: 'download',
          label: <span>DownLoading</span>,
          icon: (
            <ImgIcon
              style={{ fontSize: 28, marginRight: 8 }}
              src={downloadImg}
            />
          ),
        },
      ],
    },
  ];

  function onSearch() {}

  /**
   * 调用 AllFile 内部方法 添加记录
   * @param node
   */
  async function openDir(node: BreadCrumbNode) {
    const { current } = AllFilesRef;
    await current?.addHistory?.(node);
  }

  function onAllFilesMenuChange(node: BreadCrumbNode) {
    setNavTab(node.id);
  }

  function onSelectedChange(keys: React.SetStateAction<string[]>) {
    setAllFilesSelectedKeys(keys);
  }

  /** 新建文件夹 */
  function createDir() {
    const { current } = AllFilesRef;
    current?.newDir();
  }

  // 上传文件
  function uploadFile() {
    const { current } = AllFilesRef;
    current?.upload();
  }

  // 选中菜单项
  function onMenuSelect(e: { key: string }) {
    const { key } = e;
    setNavTab(key);
  }

  return (
    <div className={styles.cloudDisk}>
      <div className={styles.headerWrap}>
        <span className={styles.title}>CloudDisk</span>
        <div className={styles.toolsBar}>
          <Button disabled={!!AllFilesSelectedKeys.length} onClick={uploadFile}>
            Upload
          </Button>
          <Button disabled={!!AllFilesSelectedKeys.length} onClick={createDir}>
            New Folder
          </Button>
          {!!AllFilesSelectedKeys.length && (
            <>
              <Button>download</Button>
              <Button>delete</Button>
              <Button>move to</Button>
              <Button>copy to</Button>
            </>
          )}
        </div>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ marginLeft: 'auto', width: 200 }}
        />
        <UserMenu style={{ marginLeft: 20 }} redirect={window.location.pathname} />
      </div>
      <div className={styles.content}>
        <Menu
          selectedKeys={[navTab]}
          mode="inline"
          onSelect={onMenuSelect}
          className={styles.menu}
          items={menuItems}
        />
        <div className={styles.mainBody}>
          <Tabs
            animated
            activeKey={navTab}
            tabBarStyle={{ display: 'none' }}
            items={tabsItems}
          />
        </div>
      </div>
    </div>
  );
};

export default CloudDisk;
