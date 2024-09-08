/** 移动一个圆盘 */
function move(src, tar) {
    // 从src顶部拿出一个圆盘
    const p = src.pop();
    // 将圆盘放入tar顶部
    tar.push(p);
}
/** 求解汉诺塔：问 f(i) */
function bfs(i, src, buf, tar) {
    // 若src只剩下一个圆盘，则直接将其移到tar
    if(i === 1) {
        move(src, tar);
        return;
    }
    // 子问题 f(i - 1): 将src顶部的i-1个圆盘移动到buf
    bfs(i - 1, src, tar, buf);
    // 子问题 f(1): 将src剩余一个圆盘移动到tar
    move(src, tar);
    // 子问题 f(i - 1): 将buf顶部的i-1个圆盘移动到buf
    bfs(i - 1, buf, src, tar);
}
/* 求解汉诺塔 */
function resolveHanota(A, B, C) {
    const n  = A.length;
    // 将 A 顶部 n 个圆盘借助 B 移到 C
    return bfs(n, A, B, C)
}
// 时间复杂度：O(2^n)
// 相当于把一个f(n)的问题拆解成 f(n-1),f(1),f(n-1)
// 持续向下分解至最后一层f(1),f(1),f(1),f(1),f(1),
// 1 + 2^2 + 2^3 + ... +  2^n = 2^(n+1) - 1;

// 空间复杂度：O(n)

