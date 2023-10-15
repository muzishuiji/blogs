/** 回溯算法： N皇后 */
function backtrack(col, n, state, res, cols, diags1, diags2) {
    // 当放置完所有行时，记录解
    if(col === n) {
        res.push(state.map(row => row.slice()));
        return;
    }
    // 遍历所有列
    // 只需要判断向下的对角线位置即可，向上的意境处理不存在冲突
    for(let row = 0; row < n; row++) {
        // 计算该格子对应的主对角线和副对角线
        // 关键在于找到主对角线/副对角线的索引与当前单元格索引的关系
        const diag1 = row - col + n + 1;
        const diag2 = row + col;
        // 剪枝：不允许该格子所在列，主对角线，副对角线存在皇后
        if(!cols[col] && !diags1[diag1] && !diags2[diag2]) {
            // 尝试：将皇后放置在该格子
            state[row][col] = 'Q';
            cols[col] = diags1[diag1] = diags2[diag2] = true;
            // 放置下一行
            backtrack(col + 1, n, state, res, cols, diags1, diags2);
            // 回退
            state[row][col] = '#';
            cols[col] = diags1[diag1] = diags2[diag2] = false;
        }
    }
}   
/** 求解N皇后 */
function nQueues(n) {
    // 初始化 n*n 大小的棋盘，其中 'Q' 代表皇后，'#' 代表空位
    const state = Array.from({ length: n }, () => Array(n).fill('#'));
    const cols = Array(n).fill(false); // 记录列是否有n皇后
    const diags1 = Array(n).fill(false); // 记录主对角线是否有n皇后 
    const diags2 = Array(n).fill(false); // 记录副对角线是否有n皇后 
    const res = [];
    backtrack(0, n, state, res, cols, diags1, diags2);
    return res;
}
nQueues(4);

/**
 * N皇后问题的时间复杂度是O(n!)
 * 空间复杂度是O(n^2)
 */


/** 回溯算法： N皇后 */
function backtrack(row, n, state, res, cols, diags1, diags2) {
    // 当放置完所有行时，记录解
    if(row === n) {
        res.push(state.map(row => row.slice()));
        return;
    }
    // 遍历所有列
    // 只需要判断向下的对角线位置即可，向上的意境处理不存在冲突
    for(let col = 0; col < n; col++) {
        // 计算该格子对应的主对角线和副对角线
        const diag1 = row - col + n + 1;
        const diag2 = row + col;
        // 剪枝：不允许该格子所在列，主对角线，副对角线存在皇后
        if(!cols[col] && !diags1[diag1] && !diags2[diag2]) {
            // 尝试：将皇后放置在该格子
            state[row][col] = 'Q';
            cols[col] = diags1[diag1] = diags2[diag2] = true;
            // 放置下一行
            backtrack(row + 1, n, state, res, cols, diags1, diags2);
            // 回退
            state[row][col] = '#';
            cols[col] = diags1[diag1] = diags2[diag2] = false;
        }
    }
}   
/** 求解N皇后 */
function nQueues(n) {
    // 初始化 n*n 大小的棋盘，其中 'Q' 代表皇后，'#' 代表空位
    const state = Array.from({ length: n }, () => Array(n).fill('#'));
    const cols = Array(n).fill(false); // 记录列是否有n皇后
    const diags1 = Array(n).fill(false); // 记录主对角线是否有n皇后 
    const diags2 = Array(n).fill(false); // 记录副对角线是否有n皇后 
    const res = [];
    backtrack(0, n, state, res, cols, diags1, diags2);
    return res;
}
nQueues(4);

/**
 * N皇后问题的时间复杂度是O(n!)
 * 空间复杂度是O(n^2)
 */