

/**
 * 搜索生成的递归树存在大量的重叠子问题
 * 导致时间复杂度为指数阶O(2^n)
 * 指数阶的时间复杂度是由于“重叠子问题”导致的
 * 我们希望所有的重叠子问题都只被计算一次，
 * 因此，可以声明一个数组mem来记录每个子问题的解，并在搜索过程中将重叠子问题进行剪枝
 * 经过记忆化处理后，所有重叠子问题都只需要被计算一次，时间复杂度优化至O(n)
 */
/** 记忆化搜索 */
function dfs(i, mem) {
    // 已知dp[1]和dp[2]，返回
    if(i == 1 || i == 2) return i;
    // 若存在记录dp[i]，则直接返回
    if(mem[i] !== -1) return mem[i];
    // dp[i] = dp[i-1] + dp[i-2]
    const count = dfs(i  - 1, mem) + dfs(i  - 2, mem);
    // 记录dp[i]
    mem[i] = count;
    return count;
}
/** 爬楼梯：搜索 */
function climbingStairDFSMem(n) {
    const mem = new Array(n+1).fill(-1);
    mem[1] = 1;
    mem[2] = 2
    return dfs(n, mem);
}