// 尝试写一个完整的promise
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED  = 'rejected';

class MyPromise {
    constructor(executor) {
        this._value = undefined;
        this._reason = undefined;
        this._status = PENDING;
        this._resolveQueue = [];
        this._rejectQueue = [];


        let _resolve = (value) => {
            queueMicrotask(() => {
                if(this._status === PENDING) {
                    this._value = value;
                    this._status = FULFILLED;
                    while(this._resolveQueue.length) {
                        let callback = this._resolveQueue.shift();
                        callback(value);
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
                        let callback = this._rejectQueue.shift();
                        callback(value);
                    }
                }
            })

        }
        executor(_resolve, _reject);
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
        let promise = new MyPromise((resolve, reject) => {
            let fulfilledCallback = () => {
                queueMicrotask(() => {
                    try {
                        let x = onFulfilled(this._value);
                        resolvePromise(promise, x, resolve, reject);
                    } catch(err) {
                        reject(err);
                    }
                })
            }
            let rejectedCallback = () => {
                queueMicrotask(() => {
                    try {
                        let x = onRejected(this._reason);
                        x instanceof MyPromise ? x.then(resolve, reject) : reject(reason)
                    } catch(err) {
                        reject(err);
                    }
                })
            }

            switch(this._status) {
                case FULFILLED:
                    fulfilledCallback();
                    break;
                case REJECTED:
                    rejectedCallback();
                    break;
                case PENDING:
                    this._resolveQueue.push(fulfilledCallback);
                    this._rejectQueue.push(rejectedCallback);
                    break;
                default:
                    break;
            }
        })
        return promise;
    }

    static resolve(value) {
        if(value instanceof MyPromise) {
            return value;
        }
        return new MyPromise(resolve => {
            resolve(value)
        });
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason));
    }
}

function resolvePromise(promise, x, resolve, reject) {
    // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
    // 这是为了防止死循环
    if (promise === x) {
      return reject(new TypeError('The promise and the return value are the same'));
    }
  
    if (typeof x === 'object' || typeof x === 'function') {
      // 这个坑是跑测试的时候发现的，如果x是null，应该直接resolve
      if (x === null) {
        return resolve(x);
      }
  
      let then;
      try {
        // 把 x.then 赋值给 then 
        then = x.then;
      } catch (error) {
        // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
        return reject(error);
      }
  
      // 如果 then 是函数
      if (typeof then === 'function') {
        let called = false;
        // 将 x 作为函数的作用域 this 调用之
        // 传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
        // 名字重名了，我直接用匿名函数了
        try {
          then.call(
            x,
            // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
            y => {
              // 如果 resolvePromise 和 rejectPromise 均被调用，
              // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
              // 实现这条需要前面加一个变量called
              if (called) return;
              called = true;
              resolvePromise(promise, y, resolve, reject);
            },
            // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
            r => {
              if (called) return;
              called = true;
              reject(r);
            });
        } catch (error) {
          // 如果调用 then 方法抛出了异常 e：
          // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
          if (called) return;
  
          // 否则以 e 为据因拒绝 promise
          reject(error);
        }
      } else {
        // 如果 then 不是函数，以 x 为参数执行 promise
        resolve(x);
      }
    } else {
      // 如果 x 不为对象或者函数，以 x 为参数执行 promise
      resolve(x);
    }
  }


MyPromise.resolve().then(() => {
    console.log(0);
    return MyPromise.resolve(4)
}).then(res => {
    console.log(res);
});

MyPromise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() => {
    console.log(6);
});




