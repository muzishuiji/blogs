/** 查找节点 */
search(num) {
    let cur = this.root;
    // 循环查找，越过叶节点后跳出
    while(cur !== null) {
        // 目标节点在cur的右子树中
        if(cur.val < num) cur = cur.right;
        // 目标节点在cur的左子树中
        else if(cur.val > num) cur = cur.left;
        // 找到目标节点，跳出循环
        else break;
    }
    // 返回目标节点
    return cur;
}

// 插入节点需要注意两点
// - 不允许存在重复节点，如果发现节点已经存在，则不执行插入
// - 为了实现插入节点，我们需要借助节点pre保存上一轮循环的节点，这样遍历至null时，
// 我们可以获取到其父节点，从而完成节点插入操作。
/** 插入节点 */
insert(num) {
    // 若树为空，则初始化根节点
    if(this.root === null) {
        this.root = new TreeNode(num);
        return;
    }
    let cur = this.root;
    let pre = null;
    // 循环查找，越过叶节点后跳出
    while(cur !== null) {
        // 找到重复节点，直接返回
        if(cur.val === num) {
            return;
        }
        pre = cur;
        // 插入位置在cur的右子树
        if(cur.val < num) {
            cur = cur.right;
        }
        // 插入位置在cur的左子树
        else cur = cur.left;
    }
    // 插入节点
    const node = new TreeNode(num);
    if(pre.val < num) {
        pre.right = node; 
    } else pre.left = node;
}

/** 删除节点 */
remove(num) {
    // 若树为空，直接提前返回
    if(this.root === null) return;
    let cur = this.root;
    let pre = null;
    // 循环查找，越过叶节点后跳出
    while(cur !== null) {
        // 找到待删除节点，跳出循环
        if(cur.val === num) break;
        pre = cur;
        // 待删除节点在cur的右子树中
        if(cur.val < num) cur = cur.right;
        // 待删除节点在cur的左子树中
        else cur = cur.left;
    }
    // 若无待删除节点，则直接返回
    if(cur === null) return;
    // 子节点数量=0 or 1
    if(cur.left === null || cur.right === null) {
        const child = cur.left !== null ? cur.left : cur.right;
        // 删除节点cur
        if(cur !== this.root) {
            // 若目标节点在左子树上，就挂到左子树上
            // 若目标节点在右子树上，就挂到右子树上
            if(pre.left === cur) {
                pre.left = child;
            } else {
                pre.right = child;
            }
        } else {
            // 若删除节点为根节点，则重新指定根节点
            this.root = child;
        }
    }
    // 子节点数量 = 2
    else {
        // 获取中序遍历cur的下一个节点
        let tmp = cur.right;
        while(tmp.left !== null) {
            tmp = tmp.left
        }
        // 将最左节点替换待删除的节点，并移除最左节点
        // 若没有左节点，则使用cur本身替换待删除节点
        this.remove(tmp.val);
        // 用tmp覆盖cur
        cur.val = tmp.val;
    }
}