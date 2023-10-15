/** 编辑距离：动态规划 */
function editDistanceDP(s, t) {
    const n = s.length;
    const m = t.length;
    // 初始化dp表，首行已经被初始化为0
    const dp = Array.from({ length: n + 1 }, () =>
        Array.from({ length: m + 1 }, () => 0)
    );
    // 初始化首行
    for(let i = 1; i <= m; i++) {
        dp[0][i] = i;
    }
    // 初始化首列
    for(let i = 1; i <= n; i++) {
        dp[i][0] = i;
    }
    // 状态转移
    for(let i = 1; i <= n; i++) {
        for(let j = 1; j <= m; j++) {
            // 若两字符相等，则直接跳过此两字符
            if(s.charAt(i) === t.charAt(j)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i][j - 1] , dp[i-1][j], dp[i - 1][j - 1]) + 1;
            }
        }
    }
    return dp[n][m];
}

/** 编辑距离：状态压缩后的动态规划 */
function editDistanceDPComp(s, t) {
    const n = s.length;
    const m = t.length;
    // 初始化dp表，首行已经被初始化为0
    const dp = Array.from({ length: n + 1 }, () => 0);
    // 状态转移：首行
    for(let i = 1; i <= m; i++) {
        dp[i] = i;
    }
    // 状态转移：其余行
    for(let i = 1; i <= n; i++) {
        // 状态转移：首列
        let leftUp = dp[0]; // 暂存dp[i-1, j-1]
        dp[0] = i;
        // 状态转移：其余列
        for(let j = 1; j <= m; j++) {
            let temp = dp[j];
            // 若两字符相等，则直接跳过此两字符
            if(s.charAt(i - 1) === t.charAt(j - 1)) {
                dp[j] = leftUp;
            } else {
                dp[j] = Math.min(dp[j - 1] , dp[j], leftUp) + 1;
            }
            leftUp = temp;
        }
    }
    return dp[m];
}
editDistanceDPComp('algo', 'hello'); // 3
