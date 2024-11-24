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
                    let x = onRejectedCb(rea(son);
                    x instanceof myPromise ? x.then(resolve, reject) : reject(x);
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
    return new MyPromise((resolve) => resolve(value));
}
// 返回一个带拒绝原因的promise对象
MyPromise.prototype.reject = function (reason) {
    return new MyPromise((resolve,  reject) => reject(reason));
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