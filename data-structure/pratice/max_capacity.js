/** 最大容量：贪心 */
function maxCapacity(ht) {
    // 初始化i，j分列数两端
    let i = 0, j = ht.length - 1;
    // 初始化最大容量为0
    let res = 0;
    // 循环贪心选择，直到两板相遇
    while(i < j) {
        // 更新最大容量
        const cap = Math.min(ht[i], ht[j]) * (j - i);
        res = Math.max(res, cap);
        // 向内移动短板
        if(ht[i] < ht[j]) {
            i += 1;
        } else {
            j -= 1;
        }
    }
    return res;
}