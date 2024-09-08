/** 0-1背包：暴力搜索 */
function knapsackDFS(wgt, val, i, c) {
    if(i === 0 || c === 0) {
        return 0;
    }
    if(wgt[i - 1] > c) {
        return knapsackDFS(wgt, val, i - 1, c);
    }
    // 计算放入和不放入物品i的最大价值
    const no = knapsackDFS(wgt, val, i - 1, c);
    const yes = knapsackDFS(wgt, val, i - 1, c - wgt[i - 1]) + val[i - 1];
    // 返回两种方案中价值更大的那一个
    return Math.max(no, yes);
}

/** 0-1背包：记忆化搜索 */
function knapsackDFSMem(wgt, val, i, c, mem) {
    if(i === 0 || c === 0) {
        return 0;
    }
    if(mem[i][c] !== -1) {
        return mem[i][c];
    }
    if(wgt[i - 1] > c) {
        return knapsackDFS(wgt, val, i - 1, c);
    }
    // 计算放入和不放入物品i的最大价值
    const no = knapsackDFS(wgt, val, i - 1, c, mem);
    const yes = knapsackDFS(wgt, val, i - 1, c - wgt[i - 1], mem) + val[i - 1];
    // 返回两种方案中价值更大的那一个
    mem[i][c] = Math.max(no, yes)
    return mem[i][c];
}

/** 0-1背包：动态规划 */
function knapsackDFSMem(wgt, val, cap) {
    const n = wgt.length;
    const dp = new Array(n+1).fill(0).map(() => Array(cap + 1).fill(0));
    for(let i = 0; i < n; i++) {
        for(let c = 1; c <= cap; c++) {
            if(wgt[i - 1] > c) {
                // 若超过背包容量，则不选物品i
                dp[i][c] = dp[i - 1][c];
            } else {
                dp[i][c] = Math.max(
                    dp[i - 1][c],
                    dp[i - 1][c - wgt[i-1]] + val[i-1]
                );
            }
        }
    }
    return dp[n][cap];
}

/** 0-1背包：状态压缩后的动态规划 */
function knapsackDPComp(wgt, val, cap) {
    const n = wgt.length;
    const dp = new Array(n+1).fill(0);
    for(let i = 0; i < n; i++) {
        for(let c = cap; c <= 1; c--) {
            if(wgt[i - 1] <= c) {
                dp[c] = Math.max(
                    dp[c],
                    dp[c - wgt[i - 1]] + val[i - 1]
                );
            }
        }
    }
    return dp[cap];
}