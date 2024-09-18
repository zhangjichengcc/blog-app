import { FC, CSSProperties } from 'react';

import styles from './index.less';
import { useAppSelector } from '@/store';

interface Props {
  style: CSSProperties;
}

const large = ['md', 'lg', 'xl', 'xxl'];

const Copyright: FC<Props> = (props) => {
  const { style } = props;
  const { grid } = useAppSelector((state) => ({
    grid: state.global.gird,
  }));

  return (
    <div className={styles.copyright} style={style}>
      {large.includes(grid) ? (
        <p style={{ fontSize: 14 }}>
          Copyright © 2022-{new Date().getFullYear()} by{' '}
          <span style={{ fontWeight: 600 }}>zhangjicheng</span>, All Rights
          Reserved
        </p>
      ) : (
        <>
          <p style={{ fontSize: 12 }}>
            Copyright © 2022-{new Date().getFullYear()} by{' '}
            <span style={{ fontWeight: 600 }}>zhangjicheng</span>
          </p>
          <p>All Rights Reserved</p>
        </>
      )}
    </div>
  );
};

export default Copyright;
