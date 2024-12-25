function diff(oldVTree, newVTree) {
    // 存放差异的对象
    const patches = {};
  
    // 递归遍历树并记录差异
    walk(oldVTree, newVTree, patches, 0);
  
    return patches;
  }
  
  function walk(oldNode, newNode, patches, index) {
    // 单个元素的差异
    let patch = [];
  
    // 情况1: oldNode不存在
    if (!oldNode) {
      patch.push({ type: "INSERT", newNode });
    }
    // 情况2: 新旧节点类型不同，或者key不同
    else if (
      (newNode && oldNode.type !== newNode.type) ||
      oldNode.key !== newNode.key
    ) {
      patch.push({ type: "REPLACE", newNode });
    }
    // 情况3: 文本内容改变
    else if (
      typeof oldNode === "string" &&
      typeof newNode === "string" &&
      oldNode !== newNode
    ) {
      patch.push({ type: "TEXT", text: newNode });
    }
    // 情况4: 同类型、同key的节点进行属性对比
    else if (oldNode.type === newNode.type) {
      const propsPatches = diffProps(oldNode.props, newNode.props);
      if (propsPatches) {
        patch.push({ type: "PROPS", props: propsPatches });
      }
  
      // 递归比较子节点
      diffChildren(oldNode.children, newNode.children, patches, index);
    }
  
    // 如果有差异，则添加到 patches 对象中
    if (patch.length) {
      patches[index] = patch;
    }
  }
  
  function diffProps(oldProps, newProps) {
    let propPatches = {};
    let hasDiff = false;
  
    // 查找不同的属性
    for (let key in oldProps) {
      if (oldProps[key] !== newProps[key]) {
        propPatches[key] = newProps[key];
        hasDiff = true;
      }
    }
  
    // 查找新添加的属性
    for (let key in newProps) {
      if (!oldProps.hasOwnProperty(key)) {
        propPatches[key] = newProps[key];
        hasDiff = true;
      }
    }
  
    return hasDiff ? propPatches : null;
  }
  
  function diffChildren(oldChildren, newChildren, patches, index) {
    // 比较子节点时，应该保持对每个子节点的索引
    let currentIndex = index;
    for (let i = 0; i < oldChildren.length || i < newChildren.length; i++) {
      currentIndex +=
        (oldChildren[i] && oldChildren[i].children
          ? oldChildren[i].children.length
          : 0) + 1;
      walk(oldChildren[i], newChildren[i], patches, currentIndex);
    }
  }
  