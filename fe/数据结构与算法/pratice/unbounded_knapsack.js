/** 完全背包： 动态规划 */
function unboundedKnapsackDP(wgt, val, cap) {
    const n = wgt.length;
    // 初始化dp表
    const dp = Array.from({ length: n + 1 }, () =>
        Array.from({ length: cap + 1 }, () => 0)
    );
    // 状态转移
    for(let i = 1; i <= n; i++) {
        for(let c = 1; c <= cap; c++) {
            // 若超过背包容量，则不选物品i
            if(wgt[i - 1] > c) {
                dp[i] = dp[i-1][c];
            } else {
                // 选和不选物品i这两种方案中的较大值
                dp[i] = Math.max(
                    dp[i-1][c],
                    dp[i][c - wgt[i - 1]] + val[i - 1],
                );
            }
        }
    }
    return dp[n][cap];
}

/** 完全背包：状态压缩后的动态规划 */
function unboundedKnapsackDPComp(wgt, val, cap) {
    const n = wgt.length;
    // 初始化dp表
    const dp = Array.from({ length: cap + 1 }, () => 0);
    // 状态转移
    for(let i = 1; i <= n; i++) {
        for(let c = 1; c <= cap; c++) {
             // 若超过背包容量，则不选物品i
             if(wgt[i - 1] > c) {
                dp[c] = dp[c];
            } else {
                // 选和不选物品i这两种方案中的较大值
                dp[c] = Math.max(
                    dp[c],
                    dp[c - wgt[i - 1]] + val[i - 1],
                );
            }
        }
    }
    return dp[cap];
}
