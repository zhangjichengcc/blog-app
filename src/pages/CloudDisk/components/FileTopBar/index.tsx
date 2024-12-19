import { FC, ReactElement } from 'react';
import { Button, Input } from 'antd';
import styles from './index.less';

const View: FC<ReactElement> = (component) => {
  return (
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
      </div>
  );
}

export default View;