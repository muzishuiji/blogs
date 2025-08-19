const asyncFunc = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('resolved');
        }, 1000);
    })
}
const retryWithDelay = (fn, retryArr) => {
    let attemptFunc = () => {
        return new Promise((resolve, reject) => {
            fn().then(res => {
                console.log('success: ', res)
                resolve(res);
            }).catch((err) => {
                if(retryArr.length) {
                    const timer = retryArr.pop();
                    console.log('retry: ', timer)
                    setTimeout(() => {
                        attemptFunc();
                    }, timer);
                } else {
                    reject(err);
                }
            })
        })
    }
    attemptFunc();
}

retryWithDelay(asyncFunc, [200, 500])


const promiseWithRetry = (fn, retryCount, delay = 1000) => {
    let attemptFunc = () => {
        return new Promise((resolve, reject) => {
            fn().then(resolve).catch(err => {
                if(retryCount > 0) {
                    console.log(`倒数第${retryCount}次重试`)
                    retryCount--;
                    setTimeout(() => {
                       resolve(attemptFunc());
                    }, delay)  
                } else {
                    reject(err)
                }
            })
        })
    }
    return attemptFunc();
}
const asyncFunc1 = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error');
        }, 1000);
    })
}
promiseWithRetry(asyncFunc1, 3).then(res => {
    console.log(res, '----')
}).catch(err => {
    console.log(err, '----err')
})

// 动态规划和贪心的区别在于，动态规划中的每一个状态都是由上一个状态推导出来的，这一点区别于贪心，贪心是每次从局部中选择最优的
// 动态规划的核心思想是 最优子结构 + 重叠子问题
// 


// 使用Redux实现一个交易订单管理系统
// 包含：添加订单、取消订单、查询订单状态等功能


// 优化给定的React组件，解决以下问题：
// 1. 不必要的重新渲染
// 2. 内存泄漏
// 3. 大量数据渲染的性能问题

// 内存泄漏问题如何排查如何解决
