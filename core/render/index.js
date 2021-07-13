export function mountElement(vnode, rootContaion) {
  // vnode -> dom
  // tag
  // props
  // childern
  let { tag, props, children } = vnode;
  const el = vnode.el = document.createElement(tag);
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

export function diff(n1, n2) {
  // 1. tag 改变
  // 2. props 改变
  // 3. children 改变 
  if (n1.tag !== n2.tag) {
    n1.el.replaceWith(document.createElement(n2.tag))
  } else {
    n2.el = n1.el
    const { props: newProps } = n2
    const { props: oldProps } = n1

    if (newProps && oldProps) {
      Object.keys(newProps).forEach(key => {
        const newVal = newProps[key]
        const oldVal = oldProps[key]
        if (newVal !== oldVal) {
          n1.el.setAttribute(key, newVal)
        }
      })
    }

    if (newProps && oldProps) {
      Object.keys(oldProps).forEach(key => {
        if (!newProps[key]) {
          n1.el.removeAttribute(key)
        }
      })
    }

    const { children: newChlidren = [] } = n2
    const { children: oldChlidren = [] } = n1

    if (typeof newChlidren === 'string') {
      if (typeof oldChlidren === 'string') {
        if (newChlidren != oldChlidren) {
          n2.textContent = newChlidren
        }
      } else if (Array.isArray(oldChlidren)) {
        n2.textContent = newChlidren
      }
    } else if (Array.isArray(newChlidren)) {
      if (typeof oldChlidren === 'string') {
        n2.el.innerText = ``
        mountElement(n2, n2.el)
      } else if (Array.isArray(newChlidren)) {

      }
    }
  }
}
