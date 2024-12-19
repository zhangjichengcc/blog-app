import { RefObject, useEffect, useState } from 'react';

/**
 * 监听元素是否可见
 * @param {RefObject} dom
 * @returns boolean
 */
export default function useVisible(dom: RefObject<HTMLElement>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0,
      },
    );

    dom.current && observer.observe(dom.current);
    return () => observer.disconnect();
  });

  return visible;
}
