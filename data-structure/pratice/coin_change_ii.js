/** 零钱兑换：动态规划ii */
function coinChangeDP(coins, amt) {
    const n = coins.length;
    // 初始化dp表，首行已经被初始化为0
    const dp = Array.from({ length: n + 1 }, () =>
        Array.from({ length: amt + 1 }, () => 0)
    );
    // 首列
    for(let i = 1; i <= n; i++) {
        dp[i][0] = 1;
    }
    // 状态转移
    for(let i = 1; i <= n; i++) {
        for(let a = 1; a <= amt; a++) {
            if(coins[i - 1] > a) {
                // 若超过背包容量，则不选硬币i
                dp[i][a] = dp[i-1][a];
            } else {
                // 不选硬币i+选硬币i这两种方案的和
                dp[i][a] = dp[i - 1][a] + dp[i][a - coins[i - 1]];
            }
        }
    }
    return dp[n][amt];
}


/** 零钱兑换：状态压缩后的动态规划ii */
function coinChangeDPComp(coins, amt) {
    const n = coins.length;
    // 初始化dp表
    const dp = Array.from({ length: n + 1 }, () => 0);
    dp[0] = 1;
    // 状态转移
    for(let i = 1; i <= n; i++) {
        for(let a = 1; a <= amt; a++) {
            if(coins[i - 1] > a) {
                // 若超过背包容量，则不选硬币i
                dp[a] = [a];
            } else {
                // 不选硬币i+选硬币i这两种方案的和
                dp[a] = dp[a] + dp[a - coins[i - 1]];
            }
        }
    }
    return dp[amt];
}