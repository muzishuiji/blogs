/** 回溯 */
function backtrack(choices, state, n, res) {
    // 当爬到第n阶时，方案数量加1
    if(state === n) res.set(0, re.get(0) + 1);
    // 遍历所有选择
    for(const choice of choices) {
        // 剪枝：不允许超过第n阶
        if(state + choice > n) break;
        //尝试：做出选择，更新状态
        backtrack(choices, state + choice, n, res);
        // 回退
    }
}
/** 爬楼梯：回溯 */
function climbingStairsBacktrack(n) {
    const choices = [1,2]; // 可选择向上爬1或2阶
    const state = 0; // 从底0阶开始爬
    const res = new Map();
    res.set(0, 0); // 使用res[0]记录方案数量
    backtrack(choices, state, n, res);
    return res.get(0);

}