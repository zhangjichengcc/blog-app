import { FC } from 'react';

interface Props {
  children: string;
  /** 文字颜色 */
  fontColor?: string;
  /** 文字大小 */
  fontSize?: number | `${number}px`;
  /** 文字路径半径 */
  radius?: number | `${number}%`;
  /** 样式 */
  style?: React.CSSProperties;
  /** 样式类名 */
  className?: string;
}
const CircularText: FC<Props> = (props) => {
  const { children, fontColor, fontSize, radius, style, className } = props;

  const width = radius
    ? typeof radius === 'number'
      ? radius * 2
      : +radius.split('%')[0] * 2 + '%'
    : '100%';
  const height = width;

  return (
    <div style={{ ...style, width, height }} className={className}>
      <svg viewBox="0 0 300 300">
        <path
          id="circlePath"
          d="M 150,150 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
          fill="none"
          stroke="none"
        />

        <text fontSize={fontSize} fill={fontColor}>
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            {children}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CircularText;
