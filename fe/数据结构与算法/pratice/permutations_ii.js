/** 回溯算法-实现全排列 */
function backtrack(state, choices, selected, res) {
    // 判断是否为解
    if(state.length === choices.length) {
        // 记录解
        res.push([...state])
        // 停止继续搜索
        return;
    }
    const duplicated = new Set();
    // 遍历所有选择
    for(let i = 0; i < choices.length; i++) {
        const choice = choices[i];
        // 剪枝：判断选择是否合法
        if(!selected[i] && !duplicated.has(choice)) {
            // 尝试：做出选择，更新状态
            selected[i] = true;
            state.push(choice);
            duplicated.add(choice); // 记录选择过的元素值
            backtrack(state, choices, selected, res);
            // 回退：撤销选择，恢复到之前的状态
            selected[i] = false;
            state.pop();
        }
    }
}
/** 全排列 II */
//  全排列中去除重复元素的思路，使用set结构处理下，避免重复元素导致排列结果的重复
function permutationsII(nums) {
    const res = [];
    backtrack([], nums, new Array(nums.length).fill(false), res);
    return res;
}
permutationsII([1,2,1,3]);
