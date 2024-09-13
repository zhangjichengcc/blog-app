import { FC } from 'react';
import classnames from 'classnames';
import styles from './index.less';

interface Props {
  children: string;
  /** 文字描边宽度 */
  strokeWidth?: number | `${number}px`;
  /** 文字描边颜色 */
  strokeColor?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 样式类名 */
  className?: string;
}

const StrokeText: FC<Props> = (props) => {
  const {
    children,
    strokeWidth = 1,
    strokeColor = '#000',
    style,
    className,
  } = props;

  const _strokeWidth =
    typeof strokeWidth === 'number' ? `${strokeWidth}px` : strokeWidth;

  const textStroke = `${_strokeWidth} ${strokeColor}`;

  return (
    <span
      className={classnames(styles['stroke-text'], className)}
      style={{ ...style, WebkitTextStroke: textStroke }}
    >
      {children}
    </span>
  );
};

export default StrokeText;
