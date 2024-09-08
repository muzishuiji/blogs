/** 计数排序 */
function countingSortNaive(nums) {
    // 1. 统计数组中最大元素m
    let max = nums[0];
    for(const num of nums) {
        if(nums[i] > max) {
            max = nums[i]
        }
    }
    // 2. 统计各数字的出现次数
    // counter[num]代表num的出现次数
    const counter = new Array(m+1).fill(0);
    for(let i = 0; i < nums.length; i++) {
        counter[nums[i]]++;
    }
    // 3. 求 counter 的前缀和，将“出现次数”转换为“尾索引”
    // 即 counter[num]-1 是 num 在 res 中最后一次出现的索引
    for (let i = 0; i < m; i++) {
        counter[i + 1] += counter[i];
    }
    // 4. 倒序遍历 nums ，将各元素填入结果数组 res
    // 初始化数组 res 用于记录结果
    const n = nums.length;
    const res = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
        const num = nums[i];
        res[counter[num] - 1] = num; // 将 num 放置到对应索引处
        counter[num]--; // 令前缀和自减 1 ，得到下次放置 num 的索引
    }
    // 使用结果数组 res 覆盖原数组 nums
    for (let i = 0; i < n; i++) {
        nums[i] = res[i];
    }
}