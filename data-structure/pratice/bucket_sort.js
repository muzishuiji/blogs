/** 桶排序 */
function bucketSort(nums) {
    // 初始化k = n/2 个桶，预期向每个桶分配2个元素
    const k = nums.length / 2;
    const buckets = [];
    for(let i = 0 ; i < k; i++) {
        buckets.push([]);
    }  
    // 1. 将数组元素分配到各个桶中
    for(const num of nums) {
        // 输入数据范围[0, 1)，使用num * k映射到索引范围[0, k-1]
        const i = Math.floor(num * k);
        // 将num添加进桶i
        buckets[i].push(num);
    }  
    // 2. 对各个桶执行排序
    for(const bucket of buckets) {
        // 使用内置排序函数，也可以替换成其他排序算法
        bucket.sort((a,b) => a - b);
    } 
    // 3. 遍历桶合并结果
    let i = 0;
    for(const bucket of buckets) {
        for(const num of bucket) {
            nums[i++] = num;
        }
    }
}