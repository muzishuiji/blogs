/** 回溯算法-实现全排列 */
function backtrack(state, target, start, choices, res) {
    // 判断是否为解
    // 可以在这里判断组合是否重复
    // 但这个方法效率很低
    // - 当数组元素比较多时，尤其target较大时，会产生大量重复子集
    // - 比较子集：需要先排序数组，再比较数组中每个元素的异同
    if(target === 0) {
        // 记录解
        res.push([...state]);
        // 停止继续搜索
        return;
    }
    // 遍历所有选择
    for(let i = start; i < choices.length; i++) {
        // 剪枝：若子集和超过taregt，则跳过该选择
        if(target - choices[i] < 0) {
            break;
        }
        // 如果元素与左边元素相等，说明搜索分治重复，直接跳过
        if(i > start && choices[i] === choices[i - 1]) {
            continue;
        }
        // 尝试：做出选择，更新状态
        state.push(choices[i]);
        backtrack(state, target - choices[i], i, choices, res);
        // 回退：撤销选择，恢复到之前的状态
        state.pop();
    }
}
/** 全排列 II */
//  全排列中去除重复元素的思路，使用set结构处理下，避免重复元素导致排列结果的重复
function subsetSumINaive(nums) {
    const res = [];
    const target = 9;
    const state = [];
    const start = 0;
    nums.sort((a, b) => a - b); // 对 nums 进行排序
    backtrack(state, target, start, nums, res);
    return res;
}
subsetSumINaive([5,4,3,4]);



/* 回溯算法：子集和 II */
function backtrack(state, target, choices, start, res) {
    // 子集和等于 target 时，记录解
    if (target === 0) {
        res.push([...state]);
        return;
    }
    // 遍历所有选择
    // 剪枝二：从 start 开始遍历，避免生成重复子集
    // 剪枝三：从 start 开始遍历，避免重复选择同一元素
    for (let i = start; i < choices.length; i++) {
        // 剪枝一：若子集和超过 target ，则直接结束循环
        // 这是因为数组已排序，后边元素更大，子集和一定超过 target
        if (target - choices[i] < 0) {
            break;
        }
        // 剪枝四：如果该元素与左边元素相等，说明该搜索分支重复，直接跳过
        if (i > start && choices[i] === choices[i - 1]) {
            continue;
        }
        // 尝试：做出选择，更新 target, start
        state.push(choices[i]);
        // 进行下一轮选择
        backtrack(state, target - choices[i], choices, i + 1, res);
        // 回退：撤销选择，恢复到之前的状态
        state.pop();
    }
}

/* 求解子集和 II */
function subsetSumII(nums) {
    const state = []; // 状态（子集）
    nums.sort((a, b) => a - b); // 对 nums 进行排序
    const start = 0; // 遍历起始点
    const res = []; // 结果列表（子集列表）
    const target = 9;
    backtrack(state, target, nums, start, res);
    return res;
}

subsetSumII([5,4,3,4]);