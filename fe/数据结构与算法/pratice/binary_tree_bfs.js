/** 层序遍历 */
function levelOrder(root) {
    // 初始化队列，加入跟节点
    const queue = [root];
    // 初始化一个列表，用于保存遍历序列
    const list = [];
    while(queue.length) {
        let node = queue.shift(); // 队列出队
        list.push(node.val); // 保存节点值
        if(node.left) queue.push(node.left); // 左子节点入队
        if(node.right) queue.push(node.right); // 右子节点入队
    }
    return list;
}