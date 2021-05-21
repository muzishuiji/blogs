// vue dom diff

// src/vdom/patch.js

export function patch(oldVnode, vnode) {
    const isRealElement = oldVnode.nodeType;
    if(isRealElement) {
        // oldVnode是真实dom元素，就代表初次渲染,直接创建节点

    } else {
        // oldVnode 是虚拟dom，就是更新过程，使用diff算法
        if(oldVnode.tag !== vnode.tag) {
            // 新旧标签不一致，用新的节点替换旧的节点
            oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el);
        }
        // 如果是文本节点
        if(!oldVnode.tag) {
            if(oldVnode.text !== vnode.text) {
                oldVnode.el.textContent = vnode.text;
            }
        }
        // 是嵌套节点，父节点tag相同，则递归遍历比较子节点
        const el = (vnode.el = oldVnode.el);
        // 更新属性
        uodateProperties(vnode, oldVnode.data);
        const oldCh = oldVnode.children || [];
        const newCh = vnode.children || [];
        if(oldCh.length > 0 && newCh.length > 0) {
            // 比较子节点
            updateChildren(el, oldCh, newCh);
        } else if(oldCh.length) {
            el.innerHTML = ''; // 旧节点被删除
        }  else {
            // 新节点被添加
            for(let i = 0; i < newCh.length; i++) {
                let child = newCh[i];
                el.appendChild(createElm(child));
            }
        }
    }
}

// 解析vnode的data属性，映射到真实dom上
function updateProperties(vnode, oldProps = {}) {
    const newProps = vnode.data || {}; // 新的vnode属性
    const el = vnode.el;
    // 把不存在的旧节点的属性移除
    for(const k in oldProps) {
        if(!newProps[k]) {
            el.removeAttribute(k)
        }
    }
    const newStyle = newProps.style || {};
    const oldStyle = oldProps.style || {};
    for(const key in oldStyle) {
        if(!newStyle[key]) {
            el.style[key] = ""
        }
    }
    // 遍历新的属性，进行增加操作
    for(const key in newProps) {
        if(key === 'style') {
            for(const styleName in newProps.style) {
                el.style[styleName] = newProps.style[styleName]
            }
        } else if(key === 'class') {
            el.className = newProps.class
        } else {
            // 给这个元素添加属性，值就是对应的值
            el.setAttribute(key, newProps[key])
        }
    } 
}

// updateChildren 更新子节点-diff核心方法
// src/vdom/patch.js

// 判断两个vnode和key是否相同，如果相同，就可以认为是同一节点，就地复用
function isSameVnode(oldVnode, newVnode) {
    return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key;
}
// diff核心算法，采用双指针的方式，对比新老vnode节点
function updateChildren() {
   let oldStartIndex = 0;
   let oldStartVnode = oldCh[0]; 
   let oldEndIndex = oldCh.length - 1;
   let oldEndVnode = oldCh[oldEndIndex];

   let newStartIndex = 0;
   let newStartVnode = newCh[0];
   let newEndIndex = newCh.length - 1;
   let newEndVnode = newCh[newStartIndex];

   // 根据key来创建儿子的映射表
   function makeIndexByKey(children) {
    let map = {};
    children.forEach((item, index) => {
      map[item.key] = index;
    });
    return map;
   }
   let map = makeIndexByKey(oldCh);
   while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if(!oldStartVnode) {
            oldStartVnode = oldCh[++oldStartIndex]
        } else if(!oldEndVnode) {
            oldEndVnode = oldCh[--oldEndIndex]
        } else if(isSameVnode(oldStartVnode, newStartVnode)) {
            // 头和头比较，节点后移
            patch(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIndex]
            newStartVnode = newCh[++newStartIndex]
        } else if(isSameVnode(oldEndVnode, newEndVnode)) {
            // 尾和尾比较，节点前移
            patch(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndVnode]
            newEndVnode = newCh[--newEndIndex]
        } else if(isSameVnode(oldStartVnode, newEndVnode)) {
            // 老的头部和新的尾想用，把老的头部移动到尾部
            patch(oldStartVnode, newEndVnode)
            parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
            oldStartVnode = oldCh[++oldStartIndex]
            newEndVnode = newCh[--newEndIndex]
        } else if(isSameVnode(oldEndVnode, newStartVnode)) {
            // 老的尾部与新的头部想用，则将老的尾部移动到头部
            patch(oldEndVnode, newStartVnode)
            parent.insertBefore(oldEndVnode.el, oldStartVnode.el);
            oldEndVnode = oldCh[--oldEndVnode]
            newStartVnode = newCh[++newStartIndex]
        } else {
            // cabd abdce
            // 上述四种情况都不满足，那么开始同层节点比较
            // 如果新的节点在旧树中招不到，则直接插入，如果找到了，则把它放到最前面
            let moveIndex = map[newStartVnode.key]
            if(!moveIndex) {
                parent.insertBefore(createElm(newStartVnode), oldStartVnode.el)
                newStartIndex++
            } else {
                // 找的到就拿到老的节点做就地复用，把找到的节点移到最前面,再对应的比较更新内容
                let moveVnode = oldCh[moveIndex];
                oldCh[moveIndex] = undefined;
                parent.insertBefore(moveVnode.el, oldStartVnode.el);
                patch(moveVnode, newStartVnode);
            }

        }
   }
   while(newStartIndex <= newEndIndex) {
       parent.appendChild(createElm(newch[++newStartIndex]));
   }
   while(oldStartIndex<=oldEndVnode) {
      parent.removeChild(oldCh[++oldStartIndex]);
   }
}


// src/lifecycle.js

export function lifecycleMixin(Vue) {
    // 把_update挂在vue的原型上
    Vue.prototype._update = function (vnode) {
        const vm = this;
        const preVnode = vm._vnode;
        vm.vnode = vnode;
        if(!preVnode) {
            // 初次渲染vm， vm._vnode不存在，要通过虚拟节点，渲染出真实的dom赋值给$el节点
            vm.$el = patch(vm.$el, vnode)
        } else {
            vm.$el =patch(preVnode, vnode)
        }
    }
}

// mvc, m: modal, v: view, c: controller,控制器主要负责从视图中读取数据，控制用户输入，并向模型发送数据
// mvvm， m：modal， v： view， vm： viewModal， 将modal中的数据通过数据绑定的方式映射到页面上。 然后
// 通过dom事件监听用户的交互行为，将改变后的数据更新到modal中。
// mvvm使得我们不必关注modal与view的数据同步逻辑，只需要关注view的渲染，交互处理，和modal的数据获取。
// 而不需要关注二者之间的状态同步。
// vue没有完全遵循mvvm模型，为什么这么说呢？
// 因为严格的mvvm模型要求view和modal不能直接通信，而vue提供了$refs这个属性，让modal可以自己直接操作view。


// 存储型型xss，恶意窃取用户数据并发送到攻击者的网站，冒充用户的行为，调用网站接口调用攻击者指定的操作

// mian size可以理解为main axis上的尺寸，根据flex-direction的设置，可以是width和height，cross是与
// main垂直的交叉轴，根据设置可以取width或者height。
