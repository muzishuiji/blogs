/** 使用前序遍历和中序遍历的结果构建二叉树 */
// 核心难点在于左右子树索引范围的确定
function dfs(preOrder, inoderMap, i, l, r) {
    // 子树区间为空时终止
    if(r < l) return null;
    // 初始化根节点
    const root = new TreeNode(preOrder[i]);
    // 查询m，从而划分左右子树
    const m = inoderMap.get(preOrder[i]);
    // 构建左子树
    root.left = dfs(preOrder, inoderMap, i + 1, l, m - 1);
    // 构建右子树，m-l是左子树的节点数量
    root.right = dfs(preOrder, inoderMap, i + 1 + m - l, m + 1, r);
    return root;
}

/** 构建二叉树 */
function buildTree(preOrder, inOrder) {
    // 初始化哈希表，存储inOrder元素到索引的映射
    let inoderMap = new Map();
    for(let i = 0; i < inOrder.length; i++) {
        inoderMap.set(inOrder[i], i);
    }
    const root = dfs(preOrder, inoderMap, 0, 0, inOrder.length - 1);
    return root;
}