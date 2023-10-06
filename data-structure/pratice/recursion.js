/** 递归 */
function recur(n) {
    // 终止条件
    if(n === 1) return 1;
    // 递：递归调用
    const res = recur(n - 1);
    // 归：返回结果
    return n + res;
}

/** 尾递归 */
function tailRecur(n, res) {
    // 终止条件
    if(n === 0) return res;
    // 尾递归调用
    // 求和操作是在“递”的过程中执行的，“归”的过程只需层层返回
    return tailRecur(n-1, res + n);
}
// 我们可以使用一个显示的栈来模拟递归调用栈的行为，从而将递归转换为迭代形式
function forLoopRecur(n) {
    // 使用一个显示的栈来模拟系统调用栈
    const stack = [];
    let res = 0;
    // 递：递归调用
    for(let i = 0; i <= n; i++) {
        //  通过入栈操作模拟“递“
        stack.push(i);
    }
    // 归：返回结果
    while(stack.length) {
        // 通过“出栈操作”模拟“归”
        res += stack.pop();
    }
    // res = 1+2+...+n;
    return res;
}

/** 指数阶（递归实现） */
function expRecur(n) {
    if(n === 1) return 1;
    return expRecur(n - 1) + expRecur(n - 1) + 1; 
}
// 对于数据规模较大的问题，指数阶是不可接受的，通常使用动态规划或贪心算法来解决。

// 一分为n的解决思路是对数阶的时间复杂度，对数的底数为n.