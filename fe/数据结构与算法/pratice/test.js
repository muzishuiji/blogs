// 先序遍历
function preOrder(root, res = []) {
    if(!root) {
        return;
    }
    res.push(root.val);
    preOrder(root.left, res);
    preOrder(root.right, res);
}
// 中序遍历
function inOrder(root, res = []) {
    if(!root) {
        return;
    }
    inOrder(root.left, res);
    res.push(root.val);
    inOrder(root.right, res);
}

// 后续遍历
function postOrder(root, res = []) {
    if(!root) {
        return;
    }
    postOrder(root.left, res);
    postOrder(root.right, res);
    res.push(root.val);
}

// 对数级别的时间复杂度
function fn(arr) {
    var len = arr.length;
    for(var i = 1; i < len; i = i * 2) {
        console.log(arr[i]);
    }
}