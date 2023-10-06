/** 基于堆查找元素中最大的K个元素 */
function topHeap(nums, k) {
    /**
     * 1. 初始化一个小顶堆，其堆顶元素最小；
     * 2. 先将数字的前k个元素依次入堆；
     * 3. 从第 k+1个元素开始，当前元素大于堆顶元素，则将堆顶元素出堆，并将当前元素入堆
     * 4. 遍历完成后，堆中保存的就是最大的k个元素。
     */
    // 使用大顶堆MaxHeap，对数组nums取相反数
    const invertedNums = nums.map(num => -num);
    // 将数组的前k个元素入堆
    const heap = new MaxHeap(invertedNums.slice(0, k));
    // 从k+1个元素开始，保持堆的长度为k
    for(let i = k;i < invertedNums.length;i++) {
        // 若当前元素小于堆顶元素，则将堆顶元素出堆，当前元素入堆
        if(invertedNums[i] < heap.peek()) {
            heap.pop();
            heap.push(invertedNums[i])
        }
    }
    // 取出堆中元素
    const maxHeap = heap.getMaxHeap();
    // 对堆中元素取相反数
    const invertedMaxHeap = maxHeap.map(num => -num);
    return invertedMaxHeap;
}