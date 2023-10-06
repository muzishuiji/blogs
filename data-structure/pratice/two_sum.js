/** 方法一：暴力穷举 */
function twoSumBruteForce(nums, target) {
    const n = nums.length;
    // 两层循环，时间复杂度O(n ^ 2)
    for(let i = 0; i < n; i++) {
        for(let j = i + 1; j < n; j++) {
            if(nums[i] + nums[j] === target) {
                return [i,j]
            }
        }
    }
    return []
}

/** 方法二：辅助哈希表 */
function twoSumHashTable(nums, target) {
    // 辅助哈希表，空间复杂度 O(n)
    let m = {};
    // 单层循环，时间复杂度 O(n)
    for (let i = 0; i < nums.length; i++) {
        if (m[target - nums[i]] !== undefined) {
            return [m[target - nums[i]], i];
        } else {
            m[nums[i]] = i;
        }
    }
    return [];
}
twoSumHashTable([1,3,4,6,7,8,4,6,7,10], 13)