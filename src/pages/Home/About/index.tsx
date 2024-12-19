/*
 * @Author: zhangjicheng
 * @Date: 2022-10-12 23:09:35
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2024-09-23 10:16:17
 * @FilePath: /blog5.0_front-end/src/pages/Home/About/index.tsx
 */
import { CSSProperties, forwardRef } from 'react';
import { formatDataset } from '@/utils/tools';
import classnames from 'classnames';
import { ReactComponent as AppIcon } from '@/assets/Home/icon-app.svg';
import { ReactComponent as DevIcon } from '@/assets/Home/icon-dev.svg';
import { ReactComponent as DesignIcon } from '@/assets/Home/icon-design.svg';
import { ReactComponent as ComIcon } from '@/assets/Home/icon-components.svg';

import styles from './index.less';
import { useAppSelector } from '@/store';
import PartTitle from '../components/PartTitle';

const cards = [
  {
    title: 'Web design',
    content: '网站开发设计，参考当下流行的UI设计打造网站',
    icon: DesignIcon,
  },
  {
    title: 'Web development',
    content: '高质量的网站开发',
    icon: DevIcon,
  },
  {
    title: 'Mobile apps',
    content: '移动端H5开发及小程序开发',
    icon: AppIcon,
  },
  {
    title: 'components',
    content: '前端开源组件开发',
    icon: ComIcon,
  },
] as const;

const About = forwardRef<
  HTMLDivElement,
  { style?: CSSProperties; id?: string; dataset?: Record<string, any> }
>((props, ref) => {
  const { style, id, dataset = {} } = props;
  const grid = useAppSelector((state) => state.global.gird);

  const datasetMap = formatDataset(dataset);

  return (
    <div
      id={id}
      ref={ref}
      className={classnames(styles.about, grid && styles['grid-' + grid])}
      style={style}
      {...datasetMap}
    >
      <PartTitle style={{ paddingTop: 20 }}>About Me</PartTitle>
      <div className={styles.information}>
        <p>
          我是张吉成，来自 辽宁大连，毕业于
          辽宁工程技术大学，网络工程专业，目前在 广东深圳 从事前端开发
        </p>
        <p>
          我的工作是沟通需求，技术选型及方案的输出，并且负责项目框架搭建，前端组件库搭建，任务分配及人员安排
        </p>
        <p>
          您可以通过个人信息中的联系方式或使用 Contact
          发送邮件给我，我会第一时间回复。
        </p>
      </div>
      <div className={styles.container}>
        {cards.map((item, idx) => (
          <div className={styles.card} key={item.title}>
            <div className={styles.info}>
              <div className={styles.title}>
                <span>{`0${idx + 1}`}</span>
                <span>{item.title}</span>
              </div>
              <item.icon style={{ fontSize: '50px' }} />
            </div>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default About;
