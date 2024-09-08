/**
 * 针对动态规划问题，最关键的是找到状态转移方程
 * dp[i, 1] = dp[i-1, 2]
 * dp[i,2] = dp[i-2, 1] + dp[i-2, 2]
 */
/** 带约束爬楼梯：动态规划 */
function climbingStairsConstraintDP(n) {
    if(n === 1 || n === 2) {
        return 1;
    }
    // 初始化dp表，用于存储子问题的解
    const dp = Array.from(new Array(n+1), () => new Array(3));
    // 初始状态：预设最小问题的解
    dp[1][1] = 1;
    dp[1][2] = 1;
    dp[2][1] = 0;
    dp[2][2] = 1;
    // 状态转移：从较小子问题逐步求解较大子问题
    for(let i = 3; i <= n;  i++) {
        dp[i][1] = dp[i - 1][2];
        dp[i][2] = dp[i - 2][1] + dp[i-2, 2];
    }
    return dp[n][1] + dp[n][2];
}