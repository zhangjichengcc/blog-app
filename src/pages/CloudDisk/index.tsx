/*
 * @Author: your name
 * @Date: 2021-12-21 14:41:34
 * @LastEditTime: 2022-01-26 15:06:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\index.tsx
 */

import React, { FC, useState, useRef } from 'react';
import { Button, Input, Menu, Badge } from 'antd';
import AllFiles from './AllFiles';
import moment from 'moment';
import {
  FolderOutlined,
  ContainerOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';

import BreadCrumbNode from 'utils/BreadCrumbNode';

import styles from './index.less';

const { Search } = Input;
const { Item, ItemGroup } = Menu;

const allMenu = new BreadCrumbNode('all', '全部文件');
const resourcesMenu = new BreadCrumbNode('resources', '我的资源', 'all');
const downloadMenu = new BreadCrumbNode('public', '共享文件', 'all');

const tabMenus = [
  { node: allMenu, icon: <FolderOutlined /> },
  { node: resourcesMenu, icon: <ContainerOutlined /> },
  { node: downloadMenu, icon: <CloudDownloadOutlined /> },
];

const CloudDisk: FC<any> = (props) => {
  const [navTab, setNavTab] = useState<string>(allMenu.id);
  const [AllFilesSelectedKeys, setAllFilesSelectedKeys] = useState<string[]>(
    [],
  );

  const AllFilesRef = useRef(null);

  function onSearch() {}

  /**
   * 调用 AllFile 内部方法 添加记录
   * @param node
   */
  async function openDir(node: BreadCrumbNode) {
    const { current }: { current: any } = AllFilesRef;
    await current?.addHistory?.(node);
  }

  function onAllFilesMenuChange(node: BreadCrumbNode) {
    setNavTab(node.id);
  }

  function onSelectedChange(keys: React.SetStateAction<string[]>) {
    setAllFilesSelectedKeys(keys);
  }

  function createDir() {
    const { current }: { current: any } = AllFilesRef;
    current?.newDir();
  }

  // 上传文件
  function uploadFile() {
    const { current }: { current: any } = AllFilesRef;
    current?.upload();
  }

  return (
    <div className={styles.cloudDisk}>
      <div className={styles.headerWrap}>
        <span className={styles.title}>XX网盘</span>
        <div className={styles.toolsBar}>
          <Button disabled={!!AllFilesSelectedKeys.length} onClick={uploadFile}>
            上传
          </Button>
          <Button disabled={!!AllFilesSelectedKeys.length} onClick={createDir}>
            新建文件夹
          </Button>
          {!!AllFilesSelectedKeys.length && (
            <>
              <Button>下载</Button>
              <Button>删除</Button>
              <Button>移动到</Button>
              <Button>复制到</Button>
            </>
          )}
        </div>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ marginLeft: 'auto', width: 200 }}
        />
      </div>
      <div className={styles.content}>
        <Menu selectedKeys={[navTab]} mode="inline" className={styles.menu}>
          {tabMenus.map((item) => (
            <Item key={item.node.id} onClick={() => openDir(item.node)}>
              {item.icon}
              <span>{item.node.name}</span>
            </Item>
          ))}
          {/* <ItemGroup title="传输列表">
            <Item
              key="upload"
              onClick={() => {
                this.setNavTab('upload');
                this.onTabChange('uploadPage');
              }}
            >
              <Badge count={uploadCount} offset={[13, 0]} overflowCount={99}>
                <CloudUploadOutlined />
                <span>正在上传</span>
              </Badge>
            </Item>
            <Item
              key="download"
              onClick={() => {
                this.setNavTab('download');
                this.onTabChange('loadingPage');
              }}
            >
              <Badge count={loadingCount} offset={[13, 0]} overflowCount={99}>
                <div
                  ref={e => {
                    this.downLoadingNav = e;
                  }}
                >
                  <Icon type="download" />
                  <span>正在下载</span>
                </div>
              </Badge>
            </Item>
          </ItemGroup> */}
        </Menu>
        <div className={styles.mainBody}>
          <AllFiles
            cRef={AllFilesRef}
            onHistoryChange={onAllFilesMenuChange}
            onSelectedChange={onSelectedChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CloudDisk;
