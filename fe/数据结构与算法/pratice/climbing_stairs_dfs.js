

/**
 * 搜索生成的递归树存在大量的重叠子问题
 * 导致时间复杂度为指数阶O(2^n)
 * 指数阶的时间复杂度是由于“重叠子问题”导致的
 */
/** 搜索 */
function dfs(i) {
    // 已知dp[1]和dp[2]，返回
    if(i == 1 || i == 2) return i;
    // dp[i] = dp[i-1] + dp[i-2]
    const count = dfs(i  - 1) + dfs(i  - 2);
    return count;
}
/** 爬楼梯：搜索 */
function climbingStairDFS(n) {
    return dfs(n);
}