import { effectWatch } from "./reavtive/index.js";
import { mountElement } from "./render/index.js";
export function createApp(vnodeContaier) {
  return {
    mount(rootContaier) {
      let context = vnodeContaier.setup();
      effectWatch(() => {
        rootContaier.innerHTML = ``;
        const subTree = vnodeContaier.render(context);
        mountElement(subTree, rootContaier);
      });
    },
  };
}
