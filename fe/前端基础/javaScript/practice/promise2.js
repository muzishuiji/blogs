const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        this._status = PENDING;
        this._value = undefined;
        this._reason = undefined;
        this._resolveQueue = [];
        this._rejectQueue = [];
        const _resolve = (value) => {
            const _run = () => {
                if(this._status !== PENDING) {
                    return;
                }

                this._status = FULFILLED;
                this._value = value;
                while(this._resolveQueue.length) {
                    const callback  = this._resolveQueue.shift();
                    callback(value);
                }
            }
            setTimeout(_run);
        }
        const _reject = (reason) => {
            const _run = () => {
                if(this._status !== PENDING) {
                    return;
                }
                this._status = REJECTED;
                this._reason = reason;
                while(this._rejectQueue.length) {
                    const callback = this._rejectQueue.shift();
                    callback(reason);
                }
            }
            setTimeout(_run);
        }

        executor(_resolve, _reject);
    }

    // 返回一个给定值解析后的promise对象，如果改值是promise，返回这个promise
    // 如果不是，则将其promise化后返回
    static resolve(value) {
        if(value instanceof MyPromise) {
            return value;
        }
        return new MyPromise((resolve, reject) => resolve(value));
    }
    // 返回一个带有拒绝原因的promise对象
    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason));
    }

    then(resolveCb, rejectCb) {
        resolveCb = typeof resolveCb === 'function' ? resolveCb : value => value;
        rejectCb = typeof rejectCb === 'function' ? rejectCb : (err) => { 
            return new Error(err instanceof Error ? err.message : err)
        };
        return new MyPromise((resolve, reject) => {
            let fulfilledFn = (value) => {
                try {
                    let x = resolveCb ? resolveCb(value) : value;
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch(err) {
                    reject(err);
                }
            }
            let rejectedFn = (reason) => {
                try {
                    let x = rejectCb ? rejectCb(reason) : reason;
                    x instanceof MyPromise ? x.then(resolve, reject) : reject(x);
                } catch(err) {
                    reject(err);
                }
            }

            switch(this._status) {
                case PENDING:
                    this._resolveQueue.push(fulfilledFn);
                    this._rejectQueue.push(rejectedFn);
                    break;
                case FULFILLED:
                    fulfilledFn(this._value);
                    break;
                case REJECTED:
                    rejectedFn(this._reason);
                    break;
            }
        })
    }

    // catch：返回一个promise，处理拒绝的情况
    catch(rejectFn) {
        return this.then(null, rejectFn);
    }
    // 相当于一个then回调，把当前promise的计算结果透传下去
    finally(callback) {
        return this.then(
            value => MyPromise.resolve(callback()).then(() => value),
            reason => MyPromise.resolve(callback()).then(() => {throw reason})
        )
    }
}

MyPromise.prototype.all = function(promises) {
    return new MyPromise((resolve, reject) => {
        let result = [], len = promises.length;
        promises.forEach(p => {
            // MyPromise.resolve 处理传入值不是promise的情况
            MyPromise.resolve(p).then(
                (res) => {
                    result.push(res);
                    if(result.length === len) {
                       resolve(result);
                    }
                },
                (reason) => {
                    reject(reason);
                }
            )
        });
    })
}

MyPromise.prototype.race = function (promises) {
    return new Promise((resolve, reject) => {
        for(let p of promises) {
            MyPromise.resolve(p).then(
                res => {
                    resolve(res)
                },
                reason => {
                    reject(reason)
                }
            )
        }
    })
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
