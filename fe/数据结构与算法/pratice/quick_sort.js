/** 元素交换 */
function swap(nums, i, j) {
    let tmp = nums[i];
    nums[i] = nums[j];
    nums[j] = tmp;
}

/** 选取三个元素的中位数 */
function medianThree(nums, left, mid, right) {
    // 此处使用异或运算来简化代码
    // 抑或规则 0^0 = 1^1 = 0 ,1^0 = 0^1 = 1
    if((nums[left] < nums[mid]) ^(nums[left] < nums[right])) {
        return left;
    } else if((nums[mid] < nums[left]) ^(nums[mid] < nums[right])) {
        return mid
    } else {
        return right;
    }
}

/** 哨兵划分 */
function partition(nums, left, right) {
    // 以nums[left]作为基准数
    let i = left;
    let j = right;
    while(i < j) {
        while(i < j && nums[j] >= left) {
            j -= 1; // 从右向左找到首个小于基准数的元素
        }
        while(i < j && nums[j] >= left) {
            j -= 1; // 从右向左找到首个小于基准数的元素
        }
        // 元素交换
        this.swap(nums, i, j); // 交换两个元素
    }
    this.swap(nums, i, left); // 将基准数交换至两子数组的分界线
    return i; // 返回基准数的索引
}
/** 哨兵划分, 中位数优化 */
function partitionOptimize(nums, left, right) {
    // 选取三个候选元素的中位数
    let mid = medianThree(
        nums,
        left,
        Math.floor((left + right) / 2),
        right,
    )
    // 将中位数交换至数组最左端
    this.swap(nums, left, mid);
    let i = left;
    let j = right;
    while(i < j) {
        while(i < j && nums[j] >= left) {
            j -= 1; // 从右向左找到首个小于基准数的元素
        }
        while(i < j && nums[j] >= left) {
            j -= 1; // 从右向左找到首个小于基准数的元素
        }
        // 元素交换
        this.swap(nums, i, j); // 交换两个元素
    }
    this.swap(nums, i, left); // 将基准数交换至两子数组的分界线
    return i; // 返回基准数的索引
}
/** 快速排序 */
function quickSort(nums, left, right) {
    // 子数组长度为1时，终止递归
    if(left >= right) return;
    // 哨兵划分
    const pivot = partition(nums, left, right);
    // 递归左子数组，右子数组
    partition(nums, left, pivot - 1);
    partition(nums, pivot + 1, right);
}

/** 快速排序（尾递归优化） */
function quickSortOptimize(nums, left, right) {
    // 子数组长度为1时终止
    while(left < right) {
        // 哨兵划分操作
        let pivot = partition(nums, left, right);
        // 对两个子数组中较短的那个执行快排
        if(pivot - left < right - pivot) {
            partition(nums, left, pivot - 1); // 递归排序左子数组
            left = pivot + 1; // 剩余未排序区间为 [pivot + 1, right]
        } else {
            partition(nums, pivot + 1, right); // 递归排序右子数组
            right = pivot - 1; // 剩余未排序区间为 [left, pivot-1]
        }
    }
}



function partition(nums, left, right) { 
    let pivot = nums[right];
    let i = left;
    for(let j = left; j <= right; j++)  {
        if(nums[j] < pivot) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            i++; 
        }
    } 
    [nums[i], nums[right]] = [nums[right], nums[i]];
    return i;
}
function quickSort(nums) {
    const innerQuickSort = (nums, left, right) => {
        if(left >= right)  return;
        let pivot = partition(nums, left, right);
        innerQuickSort(nums, left, pivot - 1);
        innerQuickSort(nums, pivot + 1, right);
    }
    innerQuickSort(nums, 0, nums.length - 1);
    return nums;
}

const array1 = [64, 34, 25, 12, 22, 11, 90];
console.log(quickSort(array));

function quickSort(nums) {
    function partition(nums, left, right) {
        let pivot = nums[right];
        let i = left;
        for(let j = left; j < right; j++) {
            if(nums[j] < pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        [nums[i], nums[right]] = [nums[right], nums[i]];
        return i;
    }
    function innerQuickSort(nums, left, right)  {
        if(left < right) {
            let pivot = partition(nums, left, right);
            innerQuickSort(nums, left, pivot - 1);
            innerQuickSort(nums, pivot + 1, right);
        }
    }
    innerQuickSort(nums, 0, nums.length - 1);
    return nums;
}

const array2 = [64, 34, 25, 12, 22, 11, 90];
console.log(quickSort(array2));
