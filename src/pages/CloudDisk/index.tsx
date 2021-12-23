/*
 * @Author: your name
 * @Date: 2021-12-21 14:41:34
 * @LastEditTime: 2021-12-23 17:06:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\index.tsx
 */

import React, { FC, useState } from 'react';
import { Button, Input, Menu, Badge } from 'antd';
import {
  FolderOutlined,
  ProfileOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';

import styles from './index.less';

const { Search } = Input;
const { Item, ItemGroup } = Menu;

type MenuKeyProps = 'all' | 'myResource' | 'myDownload';

const CloudDisk: FC<any> = (props) => {
  const [navTab, setNavTab] = useState<MenuKeyProps>('all');

  function onSearch() {}

  function openDir() {}

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
          <Item key="all" onClick={() => openDir({ name: '全部文件', id: 0 })}>
            <FolderOutlined />
            <span>全部文件</span>
          </Item>
          <Item
            key="myResource"
            onClick={() => openDir({ name: '我的资源', id: 1 })}
          >
            <ProfileOutlined />
            <span>我的资源</span>
          </Item>
          <Item
            key="myDownload"
            onClick={() => openDir({ name: '我的下载', id: 2 })}
          >
            <CloudDownloadOutlined />
            <span>我的下载</span>
          </Item>
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
        <div className={styles.mainBody}>body</div>
      </div>
    </div>
  );
};

export default CloudDisk;
