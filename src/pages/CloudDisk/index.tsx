/*
 * @Author: your name
 * @Date: 2021-12-21 14:41:34
 * @LastEditTime: 2021-12-29 00:11:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\index.tsx
 */

import React, { FC, useState, useRef } from 'react';
import { Button, Input, Menu, Badge } from 'antd';
import AllFiles from './AllFiles';
import {
  FolderOutlined,
  ProfileOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';

import BreadCrumbNode from 'utils/BreadCrumbNode';

import styles from './index.less';

const { Search } = Input;
const { Item, ItemGroup } = Menu;

const allMenu = new BreadCrumbNode('all', '全部文件');
const resourcesMenu = new BreadCrumbNode('resources', '我的资源', allMenu);
const downloadMenu = new BreadCrumbNode('download', '我的下载', allMenu);

const tabMenus = [
  { node: allMenu, icon: <FolderOutlined /> },
  { node: resourcesMenu, icon: <ProfileOutlined /> },
  { node: downloadMenu, icon: <CloudDownloadOutlined /> },
];

const CloudDisk: FC<any> = (props) => {
  const [navTab, setNavTab] = useState<string>(allMenu.id);

  const AllFilesRef = useRef(null);

  function onSearch() {}

  /**
   * 调用 AllFile 内部方法 添加记录
   * @param node
   */
  function openDir(node: BreadCrumbNode) {
    const { current }: { current: any } = AllFilesRef;
    const { id } = node;
    current?.addHistory?.(node);
    setNavTab(id);
  }

  function onMenuChange(node: BreadCrumbNode) {
    const { id } = node;
    setNavTab(id);
  }

  return (
    <div className={styles.cloudDisk}>
      <div className={styles.headerWrap}>
        <span className={styles.title}>XX网盘</span>
        <div className={styles.toolsBar}>
          <Button>上传</Button>
          <Button>新建文件夹</Button>
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
          <AllFiles cRef={AllFilesRef} onMenuChange={onMenuChange} />
        </div>
      </div>
    </div>
  );
};

export default CloudDisk;
