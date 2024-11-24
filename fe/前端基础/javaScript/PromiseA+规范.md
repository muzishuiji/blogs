
## Promise/A+ 规范(https://www.ituring.com.cn/article/66566)

### 术语

* 解决（fulfill）： 指一个promise成功时进行的一系列操作，如状态的改变，回调的执行。虽然规范中用fulfill来表示解决，但在后世的peomise实现多以resolve来取代之。

* 拒绝（reject）： 指一个promise失败时进行的一系列操作。

* 终值（eventual value）： 所谓终值，指的是promise被解决时传递给解决回调的值，由于promise有一次性的特征，因此当这个值被传递时，标志着promise等待态的结束，故称之为终值，有时也直接简称为值（value）。

* 拒因（reason）： 也就是拒绝原因，指在promise被拒绝时传递给拒绝回调的值。


Promise表示一个异步操作的最终结果，与之进行交互的方式主要是then方法，该方法注册了两个回调函数，用于接收promise 的终值或本promise不能执行的原因。


## Promise

promise 是一个拥有 then 方法的对象或函数，其行为符合本规范；

### thenable 对象

是一个拥有then方法的对象或函数

### 值（value）

指任何JavaScript的合法值（包括 undefined， thenable对象和promise）

### 拒因（reason）

表示一个 promise的拒绝原因

## Promise的状态

一个Promise的当前状态必须为以下三种状态中的一种，等待态（Pending），执行态（FulFilled）和 拒绝态（Rejected）

**等待态（Pending）**

处于等待态， promise 需满足以下条件：
* 可以迁移至执行态或拒绝态

**执行态（Fulfilled）**

处于执行态时，promise需满足以下条件：

* 不能迁移至其他任何状态
* 必须拥有一个不可变的终值

**拒绝态（Rejected）**

处于拒绝态时，promise需满足以下条件：

* 不能迁移至其他任何状态
* 必须拥有一个不可变的拒因

这里的不可变的终值和拒因如果是非基本类型的数据，只要求引用地址相等，属性值可被更改。

### then方法

一个Promise必须提供一个then方法以访问当前值，终值和拒因

promise的then方法接收两个可选参数,若传入的不是函数，则会被忽略

`promise.then(onFulfilled, onRejected)`

**`onFulfilled`特性**

如果onFulfilled是函数：

* 当promise执行结束后其必须被调用，其第一个参数为promise的终值
* promise执行结束前不可被调用
* 其调用次数不可超过一次

**`onRejected`特性**

如果onRejected是函数：

* 当promise被拒绝执行后其必须被调用，其第一个参数为promise的拒因
* 在promise被拒绝执行前不可被调用
* 其调用次数不可超过一次

**调用时机**

onFulfilled 和 onRejected只有在执行环境堆栈仅包含平台代码时才可被调用。

**调用要求**

onFulfilled 和 onRejected必须作为函数被调用（即没有this值）

**多次调用**

then方法可以背同一个promise调用多次

* 当promise成功执行时，所有onFulfilled需按照其注册顺序依次回调；

* 当promise拒绝执行时，所有的 onRejected 需按照其注册顺序依次回调。

**返回**

then方法必须返回一个promise对象

`promise2 = promise1.then(onFulfilled, onRejected);`
* 如果 onFulfilled  或者 onRejected 返回一个值x，则运行下面的promise解决过程： `[[Resolve]](promise2, x)`
* 如果 onFulfilled  或者 onRejected 抛出一个异常e，则promise2必须拒绝执行，并返回拒因e
* 如果onFulfilled不是函数且 promise1 成功执行，promise2 必须成功执行并返回相同的值
* 如果onRejected不是函数且 promise1 拒绝执行，promise2 必须拒绝执行并返回相同的拒因


**Promise解决过程**

Promise 解决过程是一个抽象的操作，其输入一个promise和一个值，我们表示为`[[Rresolve]](promise,x)`,如果x有then方法并且看上去像一个Promise，解决程序即尝试使promise接受x的状态，否则其用x的值来执行promise。


**Promise的手写实现**

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        this._status = PENDING;
        this._value = undefined;
        this._reason = undefined;
        // 注意这是一个栈结构，先push进去的先执行
        this._resolveQueue = [];
        this._rejectQueue = [];

        let _resolve = (value) => {
            let run = () => {
                if(this._status !== PENDING) {
                    return;
                }
                this._value = value;
                this._status = FULFILLED;
                while(this._resolveQueue.length) {
                    let callback = this._resolveQueue.shift();
                    callback(value);
                }
            }
            setTimeout(() => {
                run();
            });
        }
        let _reject = (reason) => {
            let run = (reason) => {
                if(this._status !== PENDING) {
                    return;
                }
                this._status = REJECTED;
                this._reason = reason;
                while(this._rejectQueue.length) {
                    let callback = this._rejectQueue.shift();
                    callback(reason)
                }
            }
            setTimeout(() => {
                run();
            });
        }
        executor(_resolve, _reject);
    }

    then(onResolvedCb, onRejectedCb) {
        onResolvedCb = typeof onResolvedCb === 'function' ? onResolvedCb : value => value;
        onRejectedCb = typeof onRejectedCb === 'function' ? onRejectedCb : err => {
            throw new Error(err instanceof Error ? err.message : err)
        } 
        return new MyPromise((resolve, reject) => {
            let resolvedFn = (value) => {
                try {
                    let x = onResolvesCb(value);
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch(err) {
                    reject(err);
                }
            } 
            let rejectedFn = (reason) => {
                try {
                    let x = onRejectedCb(reason);
                    x instanceof MyPromise ? x.then(resolve, reject) : reject(x);
                } catch(err) {
                    reject(err);
                }
            }

            switch(this._status) {
                case PENDING:
                    this._resolveQueue.push(resolvedFn);
                    this._rejectQueue.push(rejectedFn);
                    break;
                case FULFILLED:
                    resolvedFn();
                    break;
                case REJECTED:
                    rejectedFn();
                    break;
            }
        })
    }


}

MyPromise.prototype.resolve = function (value) {
    if(value instanceof MyPromise) return value;
    return new Promise((resolve) => resolve(value));
}
// 返回一个带拒绝原因的promise对象
MyPromise.prototype.reject = function (reason) {
    return new Promise((resolve,  reject) => reject(reason));
}

MyPromise.prototype.all = function (promises) {
    let result = [];
    return new MyPromise((resolve, reject) => {
        promises.forEach(element => {
            MyPromise.resolve(element).then((val) => {
                result.push(val);
                if(result.length === promises.length) {
                    resolve(result);
                }
            }, err => {
                reject(err);
            });
        })
    })
}

MyPromise.prototype.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        promises.forEach(element => {
            MyPromise.resolve(element).then(
                (val) => {
                    resolve(val)
                },
                err => {
                    reject(err);
                }
            )
        });
    })
}

MyPromise.prototype.catch = function (catchCb) {
    return this.then(null, catchCb)
}

// 传递当前promise的执行结果的同时，执行一个callback
MyPromise.prototype.finally = function (callback) {
    return this.then(
        value => Promise.resolve(callback()).then(() => value),
        reason => Promise.reject(callback()).then(() => {throw reason})
    )
}
const p1 = new MyPromise((resolve, reject) => {
    resolve(1)          //同步executor测试
  })
  
  p1
    .then(res => {
      console.log(res)
      return 2          //链式调用测试
    })
    .then()             //值穿透测试
    .then(res => {
      console.log(res)
      return new MyPromise((resolve, reject) => {
        resolve(3)      //返回Promise测试
      })
    })
    .then(res => {
      console.log(res)
      throw new Error('reject测试')   //reject测试
    })
    .then(() => {}, err => {
      console.log(err)
    })
```

