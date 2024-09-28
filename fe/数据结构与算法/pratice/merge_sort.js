/** 合并左子数组和右子数组 */
// 左子数组区间[left,mid]
// 右子数组区间[mid+1,right]
function merge(nums, left, mid, right) {
    // 初始化辅助数组
    let tmp = nums.slice(left, right + 1);
    // 左子数组的起始索引和结束索引
    let leftStart = left - left;
    let leftEnd =  mid - left;
    // 右子数组的起始索引和结束索引
    let rightStart = mid + 1 - left;
    let rightEnd =  right - left;
    // i、j分别指向左子数组、右子数组的首元素
    let i = leftStart;
    let j = rightStart;
    // 通过覆盖原数组nums来合并左子数组和右子数组
    for(let k = left; k < right; k++) {
        if(i > leftEnd) {
            // 若“左子数组已全部合并完，则选取右子数组元素，并且j++”
            nums[k] = tmp[j++];
        } else if(j > rightEnd || tmp[i] <= tmp[j]) {
            // 否则，若“右子数组已全部合并完“或”左子数组<= 右子数组元素”，则选取左子数组元素，并且i++
            nums[k] = tmp[i++];
        } else {
            // 否则，若“左右子数组都未全部合并完”且“左子数组元素 > 右子数组元素”，则选取右子数组元素，并且 j++
            nums[k] = tmp[j++];
        }
    }
}

/** 归并排序 */
function mergeSort(nums, left, right) {
    // 终止条件
    if(left >= right) return; // 当子数组长度为1是终止递归
    // 划分阶段
    let mid = Math.floor((left + right) / 2); // 计算中点
    mergeSort(nums, left, mid); // 递归左子数组
    mergeSort(nums, mid + 1, right); // 递归右子数组
    // 合并阶段
    merge(nums, left, mid, right);
}


// 整体的思路就是不停往下拆解子数组，使得子数组是有序的，然后合并子数组
function merge(nums) {
    function mergeSort(arr1, arr2) {
        let res =[];
        let i = 0, j = 0;
        while(i < arr1.length && j < arr2.length) {
            if(arr1[i] < arr2[j]) {
                res.push(arr1[i]);
                i++;
            } else {
                res.push(arr2[j]);
                j++;
            }
        }
        while(i < arr1.length) {
            res.push(arr1[i]);
            i++;
        }
        while(j < arr2.length) {
            res.push(arr2[j]);
            j++;
        }
        return res;
    }
    let len = nums.length;
    if(len <= 1) {
        return nums;
    }
    let mid = Math.floor(len / 2);
    let left = nums.slice(0, mid);
    let right = nums.slice(mid);
    return mergeSort(merge(left), merge(right));
}
const array2 = [64, 34, 25, 12, 22, 11, 90];
console.log(merge(array2));