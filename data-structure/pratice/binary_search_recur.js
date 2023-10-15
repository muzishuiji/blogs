/** 用分治的思想实现二分查找（双闭区间） */
function dfs(nums, target, i, j) {
    // 若区间为空，代表无目标元素，则返回-1
    if(i > j) {
        return -1;
    }
    // 计算中点索引m
    const m = parseInt(i + (j - i) / 2);
    if(nums[m] < target) {
        // 递归子问题 f(m + 1, j)
        return dfs(nums, target, m + 1, j);
    } else if(nums[m] > target){
        // 递归子问题 f(i, m - 1)
        return dfs(nums, target, i, m - 1);
    } else {
        return m; // 找到目标元素，返回其索引
    }
}

function binarySearch(nums, target) {
    // 求解问题 f(0, n - 1)
    return dfs(nums, target, 0, nums.length - 1)
}