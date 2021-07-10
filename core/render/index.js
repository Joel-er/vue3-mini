export function mountElement(vnode, rootContaion) {
  // vnode -> dom
  // tag
  // props
  // childern
  let { tag, props, children } = vnode;
  const el = document.createElement(tag);
  if (vnode.props) {
    for (const key in props) {
      el.setAttribute(key, props[key]);
    }
  }
  if (typeof children === "string") {
    el.innerText = children;
  } else if (Array.isArray(children)) {
    children.forEach((v) => {
      mountElement(v, el);
    });
  }
  rootContaion.append(el);
}
