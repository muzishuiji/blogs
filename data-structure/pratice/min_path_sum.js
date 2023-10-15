/* 最小路径和：暴力搜索 */
function minPathSumDFS(grid, i, j) {
    if(i === 0 && j ===0) {
        return grid[i][j];
    }
    // 索引越界
    if(i < 0 || j < 0) {
        return Infinity;
    }
    // 计算从左上角(i - 1, j)和(i, j - 1)的最小路径代价
    const up = minPathSumDFS(grid, i - 1, j);
    const left = minPathSumDFS(grid, i, j - 1);
    // 返回左上角到(i, j)的最小路径代价
    return Math.min(up, left) + grid[i][j];
}
const row = grid.length;
const col = grid[0].length;
minPathSumDFS(grid, row - 1, col - 1);

/** 最小路径和：记忆化搜索 */
function minPathSumDFSMem(grid, i, j, mem) {
    if(i === 0 && j ===0) {
        return grid[i][j];
    }
    // 索引越界
    if(i < 0 || j < 0) {
        return Infinity;
    }
    if(mem[i, j] !== -1) {
        return mem[i, j];
    }
    // 计算从左上角(i - 1, j)和(i, j - 1)的最小路径代价
    const up = minPathSumDFSMem(grid, i - 1, j, mem);
    const left = minPathSumDFSMem(grid, i, j - 1, mem);
    mem[i, j] = Math.min(up, left) + grid[i][j];
    // 返回左上角到(i, j)的最小路径代价
    return mem[i, j];
}
const mem = new Array(n + 1).fill(new Array.fill(-1))
mem[0][0] = grid[0][0];
// const row = grid.length;
// const col = grid[0].length;
minPathSumDFSMem(grid, row - 1, col - 1, mem);


/** 最小路径和：动态规划 */
function minPathSumDP(grid) {
    const n = grid.length;
    const m = grid[0].length;
    
    // 初始化 dp 表
    const dp = Array.from({ length: n }, () =>
        Array.from({ length: m }, () => 0)
    );
    dp[0][0] = grid[0][0];
    // 状态转移：首行
    for(let j = 1 ; j < m; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    }
    // 状态转移：首列
    for(let i = 1 ; i < n; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    }
    // 状态转移：其余行列
    for(let j = 1; j < n; j++) {
        for(let i = 1; i < m; i++) {
            dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j];
        }
    }
    return dp[n - 1][m - 1];
}
minPathSumDP(grid);

/** 最小路径和：状态压缩后的动态规划 */
function minPathSumDPComp(grid) {
    const n = grid.length;
    const m = grid[0].length;
    
    // 初始化 dp 表
    const dp = Array.from(m);
    dp[0] = grid[0][0];
    // 状态转移：首行
    for(let j = 1; j < m; j++) {
        dp[j] = dp[j - 1] + grid[0][j]
    }
    // 状态转移：其余行
    for(let j = 1; j < n; j++) {
        // 状态转移：首列
        dp[0] = dp[0] + grid[i][0]
        // 状态转移：其余列
        for(let i = 1; i < m; i++) {
            dp[j] = Math.min(dp[j - 1], dp[j]) + grid[i][j];
        }
    }
    return dp[m - 1];
}


minPathSumDP(grid);