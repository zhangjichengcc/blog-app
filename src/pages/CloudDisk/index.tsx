/*
 * @Author: your name
 * @Date: 2021-12-21 14:41:34
 * @LastEditTime: 2022-02-25 23:56:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\CloudDisk\index.tsx
 */

import React, { FC, useState, useRef } from 'react';
import { Button, Input, Menu, Tabs, Badge } from 'antd';
import AllFiles from './AllFiles';
import { ImgIcon } from 'components/Icon';
import downloadImg from 'assets/cloudDisk/folder_download.png';
import ownerImg from 'assets/cloudDisk/folder_owner.png';
import publicImg from 'assets/cloudDisk/folder_public.png';
import uploadImg from 'assets/cloudDisk/folder_upload.png';

import BreadCrumbNode from 'utils/BreadCrumbNode';

import styles from './index.less';

const { Search } = Input;
const { TabPane } = Tabs;
const { Item, ItemGroup, SubMenu } = Menu;

const tabMenus = [
  {
    value: 'private',
    label: '我的文件',
    icon: <ImgIcon style={{ fontSize: 28, marginRight: 8 }} src={ownerImg} />,
  },
  {
    value: 'public',
    label: '共享文件',
    icon: <ImgIcon style={{ fontSize: 28, marginRight: 8 }} src={publicImg} />,
  },
];

const transMenus = [
  {
    value: 'upload',
    label: '正在上传',
    icon: <ImgIcon style={{ fontSize: 28, marginRight: 8 }} src={uploadImg} />,
  },
  {
    value: 'download',
    label: '正在下载',
    icon: (
      <ImgIcon style={{ fontSize: 28, marginRight: 8 }} src={downloadImg} />
    ),
  },
];

const CloudDisk: FC<any> = (props) => {
  const [navTab, setNavTab] = useState<string>(tabMenus[0].value);
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

  function onTabChange(key: string) {
    setNavTab(key);
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
          {/* <li className={styles.menuLabel}>文件列表</li> */}
          <ItemGroup title={<span className={styles.menuLabel}>文件列表</span>}>
            {tabMenus.map((item) => (
              <Item key={item.value} onClick={() => onTabChange(item.value)}>
                <span className={styles.menuItem}>
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              </Item>
            ))}
          </ItemGroup>
          <ItemGroup title={<span className={styles.menuLabel}>传输列表</span>}>
            {transMenus.map((item) => (
              <Item key={item.value} onClick={() => onTabChange(item.value)}>
                <span className={styles.menuItem}>
                  {item.icon}
                  <Badge
                    count={9}
                    size="small"
                    offset={[13, 0]}
                    overflowCount={99}
                  >
                    <span style={{ fontSize: 13 }}>{item.label}</span>
                  </Badge>
                </span>
              </Item>
            ))}
          </ItemGroup>
        </Menu>
        <div className={styles.mainBody}>
          <Tabs
            onChange={onTabChange}
            animated
            activeKey={navTab}
            tabBarStyle={{ display: 'none' }}
          >
            <TabPane tab="myFiles" key="private">
              <AllFiles
                cRef={AllFilesRef}
                // onHistoryChange={onAllFilesMenuChange}
                onSelectedChange={onSelectedChange}
              />
            </TabPane>
            <TabPane tab="publicFiles" key="public">
              publicFiles
            </TabPane>
            <TabPane tab="uploadFiles" key="upload">
              uploadFiles
            </TabPane>
            <TabPane tab="downloadFiles" key="download">
              downloadFiles
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CloudDisk;
