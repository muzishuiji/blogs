
const list = [];
/** 前序遍历 */
function preOrder(root) {
    if(root === null) return null;
    // 访问优先级：根节点 -> 左子树 -> 右子树
    list.push(root.val);
    preOrder(root.left);
    preOrder(root.right);
}
/** 中序遍历 */
function preOrder(root) {
    if(root === null) return null;
    // 访问优先级：左子树 -> 根节点 -> 右子树
    preOrder(root.left);
    list.push(root.val);
    preOrder(root.right);
}
/** 后序遍历 */
function preOrder(root) {
    if(root === null) return null;
    // 访问优先级：左子树 -> 右子树 -> 根节点
    preOrder(root.left);
    preOrder(root.right);
    list.push(root.val);
}