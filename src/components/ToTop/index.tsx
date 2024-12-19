import { FC, CSSProperties } from 'react';
import classnames from 'classnames';
import { useScrollScale } from '@/hooks/useScrollScale';
import styles from './index.less';

interface Props {
  style?: CSSProperties;
}
const ToTop: FC<Props> = (props) => {
  const { style } = props;
  const { scale, top } = useScrollScale();

  return (
    <div
      className={classnames(styles.toTop, { [styles.active]: top > 100 })}
      style={{ '--scroll-percent': `${scale}%`, ...style } as CSSProperties}
    >
      <span className={styles.text} onClick={() => window.scrollTo(0, 0)}>
        To Top
      </span>
      <i className={styles.line} />
    </div>
  );
};

export default ToTop;
