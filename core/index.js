import { effectWatch } from "./reavtive/index.js";
import { mountElement, diff } from "./render/index.js";
export function createApp(vnodeContaier) {
  return {
    mount(rootContaier) {
      let context = vnodeContaier.setup();
      let isMounted = false
      let prevSubTee;
      effectWatch(() => {
        if (!isMounted) {
          // 初始化的过程.
          isMounted = true
          rootContaier.innerHTML = ``;
          const subTree = vnodeContaier.render(context);
          mountElement(subTree, rootContaier);
          prevSubTee = subTree
        } else {
          // 更新的过程
          const subTree = vnodeContaier.render(context);
          diff(prevSubTee, subTree)
          prevSubTee = subTree
        }
      });
    },
  };
}
