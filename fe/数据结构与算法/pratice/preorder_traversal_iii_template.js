/** 回溯算法框架 */
function backtrack(state, choices, res) {
    // 判断是否为解
    if(isSolution(state)) {
        // 记录解
        recordSolution(state, res);
        // 停止继续搜索
        return;
    }
    // 遍历所有选择
    for(let choice of choices) {
        // 剪枝：判断选择是否合法
        if(isValid(state, choice)) {
            // 尝试：做出选择，更新状态
            makeChoice(state, choice);
            backtrack(state, choices, res);
            // 回退：撤销选择，恢复到之前的状态
            undoChoice(state, choice);
        }
    }
}

/** 判断当前状态是否为解 */
function isSolution(state) {
    return state && state[state.length - 1]?.val === 7;
}

/** 记录解 */
function recordSolution(state, res) {
    res.push([...state]);
}

/** 判断当前状态下，该选择是否合法 */
function isValid(state, choice) {
    return choice !== null && choice.val !== 3;
}
/** 更新状态 */
function makeChoice(state, choice) {
    state.push(choice);
}
/** 恢复状态 */
function undoChoice(state, choice) {
    state.pop();
}

/** 回溯算法的实现 */
function backtrack(state, choices, selected, res) {
    // 判断是否为解
    if(isSolution(state)) {
        // 记录解
        recordSolution(state, res);
        // 停止继续搜索
        return;
    }
    // 遍历所有选择
    for(let choice of choices) {
        // 剪枝：判断选择是否合法
        if(isValid(state, choice)) {
            // 尝试：做出选择，更新状态
            makeChoice(state, choice);
            backtrack(state, choices, res);
            // 回退：撤销选择，恢复到之前的状态
            undoChoice(state, choice);
        }
    }
}

