/** 爬楼梯最小代价： 动态规划 */
function minCostClimbingStairsDP(cost) {
    const n = cost.length - 1;
    if(n === 1 || n === 2) return cost[n];
    // 初始化dp表，用于存储子问题的解
    const dp = new Array(n+1).fill(-1);
    // 初始状态，预设最小子问题的解
    dp[1] = cost[1];
    dp[2] = cost[2]
    // 状态转移：从较小子问题逐步求解较大子问题
    for(let i = 3; i <=n; i++) {
        dp[i] = Math.min(dp[i-1], dp[i-2]) + cost[i];
    }
    return dp[n];
}

/** 爬楼梯最小代价：状态压缩后的动态规划 */
function minCostClimbingStairsDPComp(cost) {
    const n = cost.length - 1;
    if(n === 1 || n === 2) return cost[n];
    // 初始化dp表，用于存储子问题的解
    const dp = new Array(n+1).fill(-1);
    // 初始状态，预设最小子问题的解
    let a = cost[1];
    let b = cost[2]
    // 状态转移：从较小子问题逐步求解较大子问题
    for(let i = 3; i <=n; i++) {
        let tmp = b;
        b = Math.min(a, tmp) + cost[i];
        a = tmp;
    }
    return dp[n];
}