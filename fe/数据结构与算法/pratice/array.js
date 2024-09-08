/** 在数组的索引index处插入元素num */
function insert(nums, num, index) {
    // 把索引index及之后的所有元素向后移动一位
    for(let i = nums.length - 1; i > index; i--) {
        nums[i] = nums[i - 1];
    }
    // 将num赋给index处元素
    nums[index] = num;
}
// 请注意，删除元素后，原先末尾的元素变得“无意义”了，所以我们无需特意去修改它
/** 删除索引index处元素 */
function remove(nums, index) {
    // 把索引index之后的所有元素向前移动一位
    for(let i = index; i < nums.length; i++) {
        nums[i] = nums[i+1];
    }
}

/** 扩容数组长度 */
// 请注意，javascript的array是动态数组可以直接扩展
// 暂且将array看作长度不可变得数组扩展
function extend(nums, enlarge) {
    // 初始化一个扩展长度后的数组
    const res = new Array(nums.length + enlarge).fill(0);
    // 将原数组中的所有元素复制到新数组
    for(let i = 0; i < nums.length; i++) {
        res[i] = nums[i];
    }
    return res;
}

