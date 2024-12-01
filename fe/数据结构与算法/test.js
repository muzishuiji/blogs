// 冒泡排序
function bubbleSort(arr) {
    let len = arr.length;
    for(let i = 0; i < len; i++) {
        let changeSign = false;
        // 从后往前，让大的值沉淀在下面，小的值冒泡到上面
        for(let j = 0; j < len - 1 - i; j++) {
            if(arr[j] > arr[j+1]) {
                changeSign = true;
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
        if(!changeSign) {
            return arr;
        }
    }
    return arr;
}

// 选择排序
// 总体思路：每次把i位置后的最小值放到i位置上
function selectSort(arr) {
    let len = arr.length;
    let minIndex;
    for(let i = 0; i < len; i++) {
        minIndex = i;
        for(let j = i; j < len; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if(minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
selectSort(arr);

// 插入排序，总体思路，每次把元素i插入到前面已经排好的数组中
// 每次把元素i插入到前面已经排好序的数组中
function insertSort(arr) {
    let len = arr.length;
    for(let i = 0; i < len; i++) {
        let temp = arr[i];
        let j = i;
        while(j >= 0 && arr[j-1] > temp) {
            arr[j] = arr[j-1];
            j--;
        }
        arr[j] = temp;
    }
    return arr;
}
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
insertSort(arr);

// 快速排序

function quickSort(arr) {
    let partition = (arr, left, right) => {
        let target = arr[right];
        let i = left;
        for(let j = i; j < right; j++) {
            if(arr[j] < target) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }
        [arr[i], arr[right]] = [arr[right], arr[i]];
        return i;
    }
    let innerQuickSort = (arr, left, right) => {
        // 数组长度为1时直接返回
        if(left >= right) {
            return;
        }
        let pivot = partition(arr, left, right);
        innerQuickSort(arr, left, pivot - 1);
        innerQuickSort(arr, pivot + 1, right);
    }
    innerQuickSort(arr, 0, arr.length - 1);
    return arr;
}
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
quickSort(arr);


// 归并排序
// 总体思路：不断往下分解子数组，直到分割到最小，然后合并两个子数组，不断合并有序子数组
// 最终整个数组达到有序状态
function mergeSort(arr) {
    let mergeList = (list1, list2) => {
        let res = [], l1 = list1.length, l2 = list2.length;
        let i = 0, j = 0;
        while(i < l1 && j < l2) {
            if(list1[i] < list2[j]) {
                res.push(list1[i]);
                i++;
            } else {
                res.push(list2[j]);
                j++;
            }
        }
        while(i < l1) {
            res.push(list1[i]);
            i++;
        }
        while(j < l2) {
            res.push(list2[j]);
            j++;
        }
        return res;
    }
    let len = arr.length;
    if(len < 2) {
        return arr;
    }
    let mid = Math.floor(len / 2);
    return mergeList(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid))) 
}
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
mergeSort(arr);

// 两数之和
function twoSum(nums, target) {
    let obj = {}, len = nums.length;
    for(let i = 0; i < len; i++) {
        if(obj[target - nums[i]] !== undefined) {
            return [obj[target - nums[i]], i];
        }
        obj[nums[i]] = i;
    }
}

// 三数之和
// 增加一层循环，将其转换成两数之和的计算
function threeNum(nums, target = 0) {
    let len = nums.length, res = [];
    if(!len || len < 3) {
        return res;
    }
    nums.sort((a, b) => a - b);
    for(let i = 0; i < len; i++) {
        if(nums[i] > target) break;
        if(i > 0 && nums[i] === nums[i - 1]) continue;
        let L = i + 1, R = len - 1;
        while(L < R) {
            let sum = nums[i] + nums[L] + nums[R];
            if(sum === target) {
                res.push([nums[i], nums[L], nums[R]]);
                while(L < R && nums[R] === nums[R - 1]) R--;
                while(L < R && nums[L] === nums[L + 1]) L++;
                L++;
                R--;
            } else if(sum > target) {
                R--;
            } else {
                L++;
            }
        }
    }
    return res;
}
