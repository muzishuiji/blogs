/** 插入排序 */
function insertionSort(nums) {
    let n = nums.length;
    // 外循环：已排序元素数量为 1, 2, ..., n
    for(let i = 0; i < n; i++) {
        let base = nums[i];
        // 用二分法将base插入到有序数组里
        let j = i - 1;
        // 内循环：将base插入到已排序部分的正确位置
        while(j > 0 && nums[j] > base) {
            nums[j+1] = nums[j]; // 将数组整体后移，给base挪位置
            j--;
        }
        nums[j+1] = base; // 将base赋值到正确位置
    }
    return nums;
}