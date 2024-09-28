// 排序算法大汇总，一网打尽排序问题

// 归并排序
const mergeSort = arr => {
    if(arr.length < 2) {
        return arr;
    }
    const len = arr.length;
    let middle = Math.floor(len / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
const merge = (left, right) => {
    let i = 0, j = 0, res = [];
    while(i < left.length && j < right.length) {
        if(left[i] <= right[j]) {
            res.push(left[i++]);
        } else {
            res.push(right[j++]);
        }
    }
    while(i < left.length) res.push(left[i++]);
    while(j < right.length) res.push(right[j++]);
    return res;
}


// 快速排序
const sort = (nums, lo, hi) => {
    if(lo > hi) {
        return;
    }
    let p = partition(nums, lo, hi);
    sort(nums, lo, p - 1);
    sort(nums, p + 1, hi);
}
const partition = (nums, lo, hi) => {
    let i =lo, j = hi;
    let privot = nums[i];
    while(i < j) {
        while(i < j && nums[j] > privot) j--;
        if(i < j) nums[i] = nums[j];
        while(i < j && nums[i] < privot) i++;
        if(i < j) nums[j] = nums[i];
    }
    nums[i] = privot;
    return i;
}
const quickSort = (nums) => {
    if(!Array.isArray(nums) || !nums.length || nums.length === 1) {
        return nums;
    }
    sort(nums, 0, nums.length - 1);
    return nums;
}

let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
quickSort(arr);


const swap = (nums, i, j) => {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}
const partition = (nums, lo, hi) => {
    let privot = nums[lo], i = lo;
    for(let j=lo+1;j<=hi;j++) {
        while(j<=hi && nums[j]<= privot) {
            swap(nums,i,j);
            i++;
            j++;
        }
    }
    swap(nums, i, lo);
    return i;
}
const sort = (nums, lo, hi) => {
    if(lo > hi) return;
    let p = partition(nums, lo, hi);
    sort(nums, lo, p-1);
    sort(nums, p+1, hi);
}
const quickSort = (nums) => {
    if(!Array.isArray(nums) || !nums.length || nums.length === 1) {
        return nums;
    }
    sort(nums, 0, nums.length - 1);
    return nums;
}
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
quickSort(arr);



function bubble(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < i; j++) {
            if(arr[i] < arr[j]) {
                let temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
    return arr;
}
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
bubble(arr);






