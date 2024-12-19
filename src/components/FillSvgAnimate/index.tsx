import {
  cloneElement,
  FC,
  ReactElement,
  CSSProperties,
  SVGProps,
  useEffect,
  useRef,
} from 'react';
import classnames from 'classnames';
import styles from './index.less';

interface Props {
  children: ReactElement<SVGProps<SVGAElement>>;
  /** svg 背景色 */
  bgColor: string;
  /** svg 大小 */
  fontSize?: number;
  /** svg 描边大小 */
  strokeWidth?: number;
  /** 激活颜色 */
  color: string;
  /** 动画时间 */
  animateTime?: number;
  /** 是否激活 */
  active: boolean;
  style?: React.CSSProperties;
}

const Icon: FC<Props> = (props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const {
    children,
    style,
    bgColor,
    strokeWidth,
    fontSize,
    color,
    animateTime = 0.3,
    active = false,
  } = props;

  const bg_stroke = bgColor || style?.color;
  const _fontSize = fontSize || style?.fontSize;

  /**
   * 为svg路径设置描边长度
   */
  function initPathStyle() {
    const { lastChild } = ref.current!;
    const paths = (lastChild as SVGAElement)?.querySelectorAll(
      'path, circle',
    ) as NodeListOf<SVGPathElement>;
    paths?.forEach((path) => {
      const len = path.getTotalLength();
      path.style.setProperty('--stroke-length', '' + len + 1);
    });
  }

  useEffect(() => {
    initPathStyle();
  }, []);

  return (
    <span
      className={classnames(
        styles['fill-svg-animate'],
        active ? styles.active : '',
      )}
      style={{ '--animate-time': animateTime + 's' } as CSSProperties}
      ref={ref}
    >
      {/* 背景 */}
      {cloneElement(children, {
        fontSize: _fontSize,
        stroke: bg_stroke,
        strokeWidth,
      })}
      {/* 文字 */}
      {cloneElement(children, {
        style: {
          position: 'absolute',
          inset: 0,
        },
        fontSize: _fontSize,
        stroke: color,
        strokeWidth,
      })}
    </span>
  );
};

export default Icon;
