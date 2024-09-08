
/** 二分查找边界（找到最左边的target） */
function binarySearchInsertion(nums, target) {
    let i = 0;
    let j = nums.length - 1;
    while(i <= j) {
        const m = Math.floor(i + (j - i) / 2); // 计算中点索引 m, 使用 Math.floor() 向下取整
        if (nums[m] < target) {
            i = m + 1; // target 在区间 [m+1, j] 中
        } else if (nums[m] > target) {
            j = m - 1; // target 在区间 [i, m-1] 中
        } else {
            j = m - 1; // 首个小于target的元素在区间 [i, m-1] 中
        }
    }
    if(i === nums.length || nums[i] !== target) {
        return -1;
    }
    // 找到target，返回插入点 i
    return i;
}


/** 二分查找边界（找到最右边的target-缩小区间法） */
function binarySearchInsertionR(nums, target) {
    let i = 0;
    let j = nums.length - 1;
    while(i <= j) {
        const m = Math.floor(i + (j - i) / 2); // 计算中点索引 m, 使用 Math.floor() 向下取整
        if (nums[m] < target) {
            i = m + 1; // target 在区间 [m+1, j] 中
        } else if (nums[m] > target) {
            j = m - 1; // target 在区间 [i, m-1] 中
        } else {
            j = m + 1; // 首个小于target的元素在区间 [m+1, j] 中
        }
    }
    if(i === nums.length || nums[i] !== target) {
        return -1;
    }
    // 找到target，返回插入点 i
    return i;
}

/** 二分查找边界（找到最右边的target-复用左区间查找法） */
function binarySearchRightEdge(nums, target) {
    // 转化为查找最左一个target + 1
    const i = binarySearchInsertion(nums, target + 1);
    // j指向最后一个target，i指向首个大于target的元素
    const j = i - 1;
    // 未找到target，返回 -1
    if(j === -1 || nums[j] !== target) {
        return -1;
    }
    // 找到target，返回索引j
    return j;
}
