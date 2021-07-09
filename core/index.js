let currectEffect;
class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }
  // 1.收集依赖
  depend() {
    if (currectEffect) {
      this.effects.add(currectEffect);
    }
  }
  // 2.触发依赖
  notice() {
    this.effects.forEach((effect) => {
      effect();
    });
  }
  set value(val) {
    this._val = val;
    dep.notice();
  }
  get value() {
    dep.depend();
    return this._val;
  }
}
function effectWatch(effect) {
  currectEffect = effect;
  effect();
  currectEffect = null;
}
// let dep = new Dep(0);
// let b;
// effectWatch(() => {
//   b = dep.value + 10;
//   console.log("b", b);
// });
// dep.value = 30;
let depsMap = new Map();
function setDepMap(target, key) {
  let curryTarget = depsMap.get(target);
  if (!curryTarget) {
    curryTarget = new Map();
    depsMap.set(target, curryTarget);
  }
  let keyDep = curryTarget.get(key);
  if (!keyDep) {
    keyDep = new Dep();
    curryTarget.set(key, keyDep);
  }
  return keyDep;
}
function reactive(raw) {
  return new Proxy(raw, {
    set(target, key, value) {
      let dep = setDepMap(target, key);
      Reflect.set(target, key, value);
      dep.notice();
      return true;
    },
    get(target, key) {
      // 收集依赖
      let dep = setDepMap(target, key);
      dep.depend();
      return Reflect.get(target, key);
    },
  });
}
let a = reactive({
  value: 1,
  age: 10,
});
effectWatch(() => {
  let b = a.value + 10;
  console.log("b", b);
});
a.value = 20;
