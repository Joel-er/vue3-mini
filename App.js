// import { effect, reactive } from "@vue/reactivity";
// let a = reactive({
//   value: 1,
// });
// let b;
// effect(() => {
//   b = a.value + 10;
//   console.log("b", b);
// });
// a.value = 20;

import { h } from "./core/reavtive/h.js";
import { reactive } from "./core/reavtive/index.js";
export default {
  setup() {
    const state = reactive({
      count: "0",
    });
    window.state = state;
    return { state };
  },
  render(context) {
    // context => dom
    const div = document.createElement("div");
    div.innerText = context.state.count;
    return h(
      "div",
      {
        id: "test - 1",
        class: "el-app",
      },
      [h("div", {}, "xixixix"), h("div", {}, "hahahha")]
    );
  },
};
