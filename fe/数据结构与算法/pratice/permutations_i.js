/** 回溯算法-实现全排列 */
function backtrack(state, choices, selected, res) {
    // 判断是否为解
    if(state.length === choices.length) {
        // 记录解
        res.push([...state])
        // 停止继续搜索
        return;
    }
    // 遍历所有选择
    for(let i = 0; i < choices.length; i++) {
        const choice = choices[i];
        // 剪枝：判断选择是否合法
        if(!selected[i]) {
            // 尝试：做出选择，更新状态
            selected[i] = true;
            state.push(choice);
            backtrack(state, choices, selected, res);
            // 回退：撤销选择，恢复到之前的状态
            selected[i] = false;
            state.pop();
        }
    }
}
/** 全排列 I */
function permutationsI(nums) {
    const res = [];
    backtrack([], nums, new Array(nums.length).fill(false), res);
    return res;
}
permutationsI([1,2,3]);
