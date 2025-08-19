// 防抖节流
// 防抖：事件在被触发n秒后再执行，如果n秒内再次触发，则重新计时
function myDebounce(fn, wait) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    }
}
const debounceSearch = myDebounce(search, 200);

// 节流：一个单位时间内，只触发一次函数。如果这个单位时间内，触发多次函数，则只有一次生息哦啊

function myThrottle(fn, wait) {
    let timer = null
    return function(...args) {
        let context = this;
        if(!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                clearTimeout(timer);
                timer = null;
            }, wait);
        }
    }
}

function myThrottle1(fn, wait) {
    let startTime = 0;
    return function (...args) {
        let context = this;
        let current = Date.now()
        if(current - startTime >= wait) {
            fn.apply(context, args);
            startTime = Date.now();
        }
    }
}

Function.prototype.myCall = function (context, args) {
    const fn = Symbol();
    context[fn] = this;
    let result = context[fn](...args)
    delete context[fn];
    return result;
}

// new
function myNew(fn) {
    let obj = {};
    obj.__proto__ = fn.prototype;
    let args = Array.prototype.slice.call(arguments, 1);
    let res = fn.apply(obj, args);
    return res instanceof Object ? res : obj;
}

// Object.create 创建一个以传入对象为原型的对象
function myCreate(obj) {
    function F() {}
    if(obj && typeof obj === 'object') {
        F.prototype = obj;
    }
    return new F();
}
// tsc --noEmit 检查ts代码不会将ts生成编译文件


// with语句主要用于扩展一个语句的作用域链


// promise
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
    constructor(executor) {
        this._value = undefined;
        this._reason = undefined;
        this._status = PENDING;
        this._resolveQueue = [];
        this._rejectQueue = []

        let _resolve = (value) => {
            queueMicrotask(() => {
                if(this._status === PENDING) {
                    this._value = value;
                    this._status = FULFILLED;
                    while(this._resolveQueue.length) {
                        let cb = this._rejectQueue.pop();
                        cb(value)
                    }
                }
            })
        }

        let _reject = (reason) => {
            queueMicrotask(() => {
                if(this._status === PENDING) {
                    this._reason = reason;
                    this._status = REJECTED;
                    while(this._rejectQueue.length) {
                        let cb = this._rejectQueue.pop();
                        cb();
                    }
                }
            })
        }

        executor(_resolve, _reject);
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; }
        let promise = new MyPromise((resolve, reject) => {
            let resolveFn = () => {
                try {
                    let x = onFulfilled(this._value);
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch(err) {
                    reject(err);
                }
            }
            let rejectFn = (reason) => {
                try {
                    let x = onRejected(reason);
                    x instanceof MyPromise ? x.then(resolve, reject) : reject(reason)
                } catch(err) {
                    reject(err)
                }
            }
            switch(this._status) {
                case PENDING:
                    this._resolveQueue.push(resolveFn);
                    this._rejectQueue.push(rejectFn);
                    break;
                case FULFILLED:
                    resolveFn();
                    break;
                case REJECTED:
                    rejectFn();
                    break;
            }
        })
    }
}
MyPromise.prototype.resolve = function (value) {
    if(value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
}

MyPromise.prototype.reject = function(reason) {
    return new MyPromise((resolve, reject => reject(reason)))
}
MyPromise.all = function (promises) {
    let result = [];
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            Promise.resolve(promise).then(value => {
                result.push(value)
                if(result.length === promises.length) {
                    resolve(result)
                }
            }, err => reject(err))
        });
    })
}
MyPromise.race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            Promise.resolve(promise).then(value => {
                resolve(value)
            }, err => reject(err))
        });
    })
}
// finally 返回promise的同时执行callback



// 一些并发任务调度
class TaskPool {
    constructor(maxCount) {
        this.maxCount = maxCount;
        this.queue = [];
        this.runningCount = 0;
    }
    add(task) {
        this.queue.push(task);
        this.run();
    }
    run() {
        if(this.queue.length && this.runningCount < this.maxCount) {
            let task = this.queue.shift();
            this.runningCount++;
            return Promise.resolve(task()).then(() => {
                this.runningCount--;
                this.run();
            })
        }
    }
}
const taskpool = new TaskPool(2);

for (let i = 0; i < 10; i++) {
    const task = () => new Promise(resolve => {
        // 这里 i 的值也是以前非常高频的闭包题哦
        setTimeout(() => {
            console.log(`task${i} complete`);
            resolve(`task${i}`);
        }, 2000);
    });
    taskpool.add(task);
}

function schedule(n) {
    let maxCount = n;
    let runningCount = 0;
    return function runTasks(tasks) {
        let queue = tasks.slice();
        let taskLen = tasks.length;
        let result = []
        return new Promise((resolve, reject) => {
            let run = () => {
                while(queue.length && runningCount < maxCount) {
                    let task = queue.shift();
                    runningCount++;
                    Promise.resolve(task()).then(res => {
                        result.push(res);
                        if(taskLen === result.length) {
                            resolve(result);
                        }
                    }).finally(() => {
                        runningCount--;
                        run();
                    })
                }
            }
            run();
        })
    }
}
const runTask = schedule(4);

const tasks = new Array(10).fill(0).map((x, i) => () => new Promise(resolve => {
    setTimeout(() => {
        console.log(`task${i} complete`);
        resolve(`task${i}`);
    }, 2000);
}));

runTask(tasks).then(console.log);
// loader主要用于转换代码逻辑，后引入的先执行。
// plugin本身是一种事件流机制，到了固定的打包时间节点就广播特定的事件，用户可以在事件里执行特定的转换逻辑，类似于生命周期的概念
// 

// 存在一个正整数的坐标系，输入一个数组，数组的元素都是这个坐标系的坐标 [x, y]，现在需要将输入的坐标数组拆分为若干个子数组，
// 具有相邻关系（上下左右相邻）的坐标需要分配到同一个子数组中
// input 内坐标是无序的
const input = [
    [0, 0],
    [1, 1],
    [3, 1],
    [1, 2],
    [3, 2],
    [2, 3],
    [1, 4],
    [2, 4],
    [4, 4],
    [4, 5],
    [3, 4]
]
function getNears(x) {
    // 边界判断
    return [[x[0], x[1] - 1], [x[0] - 1, x[1]], [x[0] + 1, x[1]], [x[0], x[1] + 1]];
}
// 遍历分组
function groupBy(input) {
    let len = input.length;
    // 从左下角开始往右上角合并
    let i =0, j = 0, res =[];
    let obj = {}
    for(const item of input) {
        obj[`${item[0]}${item[1]}`] = true;
    }

    const dfs = (data, res, obj) => {
        delete obj[`${data[0]}${data[1]}`]; 
        let nears = getNears(data);
        // 过滤已经处理或不存在的节点
        nears = nears.filter(item => obj[`${item[0]}${item[1]}`]);
        if(!nears.length) {
            return res;
        }
        for(let near of nears) {
            res.push(near)
            dfs(near, res, obj)
        }
    }

    while(i < len) {
        let current = input[i];
        if(obj[`${current[0]}${current[1]}`]) {
            let group = [current];
            dfs(current, group, obj)
            res.push(group)
        }
        i++
        
    }
    return res;

}
console.log(groupBy(input))



//Proxy实现响应式
const reactive = (target) => {
    return new Proxy(target, {
        get(target, key, receiver) {
            // 依赖收集：记录哪个组件访问了这个数据；
            track(target, key);
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            // 触发更新：只更依赖这个数据的组件
            trigger(target, key);
            return result;
        }
    })
}

function patchKeyedChildren(oldChildren, newChildren) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldChildren.length - 1;
    let newEndIdx = newChildren.length - 1;
    while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if(oldChildren[oldStartIdx] === null) {
            oldStartIdx++;
        } else if(oldChildren[oldEndIdx] === null) {
            oldEndIdx--;
        } else if(oldChildren[oldStartIdx] === newChildren[newStartIdx]) {
            // 头部相同，继续比较
            patch(oldChildren[oldStartIdx], newChildren[newStartIdx]);
            oldStartIdx++;
            newStartIdx++;
        } else if(oldChildren[oldEndIdx] === newChildren[newEndIdx]) {
            // 尾部相同，继续比较
            patch(oldChildren[oldEndIdx], newChildren[newEndIdx]);
            oldEndIdx--;
            newEndIdx--;
        } else if(oldChildren[oldStartIdx] === newChildren[newEndIdx]) {
            // 头部和尾部相同，继续比较
            patch(oldChildren[oldStartIdx], newChildren[newEndIdx]);
            parent.insertBefore(oldChildren[oldStartIdx].el, oldEndVnode.el.nextSibling);
            oldStartIdx++;
            newEndIdx--;
        } else if(oldChildren[oldEndIdx] === newChildren[newStartIdx]) {
            // 尾部和头部相同，继续比较
            patch(oldChildren[oldEndIdx], newChildren[newStartIdx]);
            parent.insertBefore(oldChildren[oldEndIdx].el, oldStartVnode.el);
            oldEndIdx--;
            newStartIdx++;
        } else {
            // 以上四种情况都不满足，则需要遍历查找
            let oldKeyToIdx = new Map();
            for(let i = oldStartIdx; i <= oldEndIdx; i++) {
                oldKeyToIdx.set(oldChildren[i].key, i);
            }
            let idxInOld = oldKeyToIdx.get(newChildren[newStartIdx].key);
            if(idxInOld === undefined) {
                // 新节点在旧节点中不存在，直接插入
            } else {
                // 新节点在旧节点中存在，则进行patch
                patch(oldChildren[idxInOld], newChildren[newStartIdx]);
                oldChildren[idxInOld] = null;
            }
            newStartIdx++;
        }
    }
    if(oldStartIdx <= oldEndIdx) {
        // 旧节点有剩余，删除
        for(let i = oldStartIdx; i <= oldEndIdx; i++) {
            if(oldChildren[i] !== null) {
                parent.removeChild(oldChildren[i].el);
            }
        }
    }
}

// then 方法的参数是 promise变为resolve状态的value
