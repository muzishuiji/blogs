/** 冒泡排序 */
function bubbleSort(nums) {
    let n = nums.length;
    // 外循环：未排序区间为 [0, i]
    for(let i = n - 1; i > 0; i--) {
        // 内循环：将未排序区间 [0, i] 中的最大元素交换至该区间的最右端
        for(let j = 0; j < i; j++) {
            if(nums[j] > nums[j+1]) {
                // 交换 nums[j] 与 nums[j + 1]
                let tmp = nums[j];
                nums[j] = nums[j+1];
                nums[j+1] = tmp;
            }
        }
    }
    return nums;
}

/** 冒泡排序（标志优化） */
function bubbleSortWithFlag(nums) {
    let n = nums.length;
    // 外循环：未排序区间为 [0, i]
    for(let i = n - 1; i > 0; i--) {
        let flag = false; // 初始化标志位
        // 内循环：将未排序区间 [0, i] 中的最大元素交换至该区间的最右端
        for(let j = 0; j < i; j++) {
            if(nums[j] > nums[j+1]) {
                // 交换 nums[j] 与 nums[j + 1]
                let tmp = nums[j];
                nums[j] = nums[j+1];
                nums[j+1] = tmp;
                flag = true; // 记录交换元素
            }
        }
        if(!flag) break; // 此轮冒泡未交换任何元素，直接跳出
    }
    return nums;
}

function bubbleSortWithFlag1(arr)  {
    let len = arr.length;
    for(let i = 0; i < len; i++) {
        let flag = true;
        for(let j = 0; j < len - i - 1; j++) {
            if(arr[j] > arr[j+1]) {
                flag = false;
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
        // 如果某次循环没有交换过于元素，则说明排序已完成
        if(flag) {
            break;
        }
    }
    return arr;
}

