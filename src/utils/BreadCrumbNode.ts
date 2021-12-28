/*
 * @Author: 张吉成
 * @Date: 2021-12-28 17:42:50
 * @LastEditTime: 2021-12-28 21:10:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\utils\routeNode.ts
 */

// export interface BreadCrumbNodeProps {
//   id: string;
//   name: string;
//   previous?: BreadCrumbNodeProps;
//   current?: any;
//   setContent: (routeContent: any) => void;
//   setPrevious: (node: BreadCrumbNodeProps) => void;
// }

class BreadCrumbNode {
  current: any;

  constructor(
    readonly id: string,
    readonly name: string,
    /** @internal undefined 表示根节点*/
    public previous?: BreadCrumbNode,
    current?: any,
  ) {
    this.id = id;
    this.name = name;
    this.previous = previous;
    this.current = current;
  }

  setContent(routeContent: any) {
    this.current = routeContent;
  }

  setPrevious(node: BreadCrumbNode) {
    this.previous = node;
  }
}

export default BreadCrumbNode;
