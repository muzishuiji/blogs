/** 二分查找插入点（无重复元素） */
function binarySearchInsertionSimple(nums, target) {
    let i = 0;
    let j = nums.length - 1;
    while(i <= j) {
        const m = Math.floor(i + (j - i) / 2); // 计算中点索引 m, 使用 Math.floor() 向下取整
        if (nums[m] < target) {
            i = m + 1; // target 在区间 [m+1, j] 中
        } else if (nums[m] > target) {
            j = m - 1; // target 在区间 [i, m-1] 中
        } else {
            return m; // 找到 target ，返回插入点 m
        }
    }
    // 返回插入点 i
    return i;
}

/** 二分查找插入点（有重复元素，找到最左边的重复元素并替换） */
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
    // 返回插入点 i
    return i;
}