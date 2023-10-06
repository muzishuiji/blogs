/** 堆的长度为n，从节点i开始，从顶至底堆化 */
function shiftDown(nums, n, i) {
    while(true) {
        // 判断i，l，r中的最大值，记为ma
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        let ma = i;
        if(l < n && nums[l] > nums[ma]) {
            ma = l;
        }
        if(r < n && nums[r] > nums[ma]) {
            ma = r;
        }
        // 若节点i最大，或索引l、r越界，则无需继续堆化，跳出
        if(ma === i)  break;
        // 交换两节点
        [nums[i], nums[ma]] = [nums[ma], nums[i]];
        // 循环向下堆化
        i = ma;
    }
}
/** 堆排序 */
function heapSort() {
    // 建堆操作：堆化除叶节点以外的其他所有节点
    for(let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
        shiftDown(nums, num.length, i);
    }
    for(let i = nums.length - 1; i >= 0; i--) {
        // 交换根节点与最右叶节点
        [nums[0], nums[i]] = [nums[i], nums[0]];
        // 以根节点为起点，从顶至底进行堆化
        shiftDown(nums, i, 0);
    }
}