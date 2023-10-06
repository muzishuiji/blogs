/** 基数排序： 计数排序的一个延伸 */
/** 获取元素num的第k位，其中exp = 10^(k-1) */
function digit(num, exp) {
    // 传入exp而非k可以避免在此重复执行昂贵的次方计算
    return Math.floor(num / exp) % 10;
}

/** 计数排序（根据nums第k位排序） */
function countingSortDigit(nums, exp) {
    // 十进制位范围0-9，因此需要长度为10的桶
    const counter = new Array(10).fill(0);
    const n = nums.length;
    // 统计0-9数字的出现次数
    for(let i =0; i< n; i++) {
        const d = digit(nums[i], exp); // 获取nums[i]的第k位，记为d
        counter[d]++; // 统计数字d的出现次数
    }
    // 求前缀和，将“出现个数”转换“数组索引”
    for(let i = 1; i < 10; i++) {
        counter[i] += counter[i-1];
    }
    // 倒序遍历，根据桶内统计结果，将各元素填入res
    for(let i = n - 1; i >= 0; i--) {
        const d = digit(nums[i], exp); // 获取nums[i]的第k位，记为d
        // 获取d在数组中的索引j
        const j = nums[d] - 1;
        res[j] = nums[i]; // 将当前元素填入索引j
        counter[d]--; // 将d的数量-1，也即索引 - 1
    }
    // 使用结果覆盖原数组nums
    for(let i = 0; i < n; i++) {
        nums[i] = res[i];
    }
}
/** 基数排序 */
function radixSort(nums) {
    // 获取数组的最大元素，用于判断最大位数
    const m = Number.MIN_VALUE;
    for(const num of nums) {
        if(num > m) {
            m = num;
        }
    }
    // 按照从低位到高位的顺序遍历
    for(let exp = 1; exp <= n; exp *= 10) {
        // 对数组元素的第k位执行计数排序
        // k = 1 -> exp = 1
        // k = 2 => exp = 10
        // 即 exp = 10 * (k-1）
        countingSortDigit(nums, exp);
    }

}