import { effect, reactive } from "@vue/reactivity";
let a = reactive({
  value: 1,
});
let b;
effect(() => {
  b = a.value + 10;
  console.log("b", b);
});
a.value = 20;
