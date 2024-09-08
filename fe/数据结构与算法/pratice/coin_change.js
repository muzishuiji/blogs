/** 
 * 求解动态规划的关键在于：
 * - 找到状态转移方程
 * - 找出最优子结构，进而推导出状态转移方程
 * dp[i,a] = min(dp[i-1, a], dp[i, a - coins[i - 1]] + 1)
 */
/** 零钱兑换：动态规划 */
function coinChangeDP(coins, amt) {
    const n = coins.length;
    const MAX  = amt + 1;
    // 初始化dp表
    const dp = Array.from({ length: n + 1 }, () =>
        Array.from({ length: amt + 1 }, () => 0)
    );
    // 状态转移：首行
    for(let a = 1; a < amt; a++) {
        dp[0][a] = MAX;
    }
    for(let i = 1; i <= n; i++) {
        for(let a = 1; a <= amt; a++) {
            if(coins[i - 1] > a) {
                // 若超过背包容量，则不选硬币i
                dp[i][a] = dp[i-1][a];
            } else {
                // 不选和选硬币 i 这两种方案的较小值
                dp[i][a] = Math.min(dp[i - 1][a], dp[i][a - coins[i - 1]] + 1);
            }
        }
    }
    return dp[n][amt] !== MAX ? dp[n][mat] : -1;
}

/** 零钱兑换：状态压缩后的动态规划 */
function coinChangeDPComp(coins, amount) {
    const n = coins.length;
    const MAX = amount + 1;
    // 初始化 dp 表
    const dp = Array.from({ length: amount + 1 }, () => MAX);
    dp[0] = 0;
    // 状态转移
    for (let i = 1; i <= n; i++) {
        for (let a = 1; a <= amount; a++) {
            if (coins[i - 1] > a) {
                // 若超过背包容量，则不选硬币 i
                dp[a] = dp[a];
            } else {
                // 不选和选硬币 i 这两种方案的较小值
                dp[a] = Math.min(dp[a], dp[a - coins[i - 1]] + 1);
            }
        }
    }
    return dp[amount] !== MAX ? dp[amount] : -1;
}