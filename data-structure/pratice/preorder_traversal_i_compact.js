/** 使用前序遍历搜索所有值为7的节点 */
function preOrder(root, res) {
    if(root === null) return;
    if(root.val === 7) {
        // 记录解
        res.push(root);
    }
    preOrder(root.left, res);
    preOrder(root.right, res);
}

// 回溯不仅仅包含函数的返回，还包括路径的回撤
function preOrderWithPath(root, path, res) {
    if(root === null) return;
    // 尝试
    path.push(root);
    if(root.val === 7) {
        // 记录解
        res.push([...path]);
    }
    preOrderWithPath(root.left, path, res);
    preOrderWithPath(root.right, path, res);
    // 回退
    path.pop();
}

