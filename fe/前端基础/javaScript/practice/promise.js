

/**
 * Promise/Deferred 模式其实包含两部分： Promise 和 Deferred
 * * Deferred 主要用于内部，来维护异步模型的状态
 * * Promise 主要用于外部，用过then方法，暴露给外部调用，以添加业务逻辑和业务的组装
 *  
 */


const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'


 function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError("Cyclic reference"));
    }
    let isCalled = false
    if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then
            if(typeof then === 'function') {
                then.call(x,
                    y => {
                        if(isCalled) return;
                        isCalled = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    err => {
                        if(isCalled) return;
                        isCalled = true;
                        reject(err);
                    }
                )
            } else {
                resolve(x);
            }
        } catch(err) {
            if(isCalled) return;
            isCalled = true;
            reject(err);
        }
    } else {
        resolve(x);
    }
 }
 function myPromise(fn) {
    let self = this;
    self.status = PENDING;
    self.value = undefined;
    self.reason = undefined
    self.onFullfilledCallbacks = [];
    self.onRejectedCallbacks = [];

    // resolve
    function resolve(value) {
        if(self.status === PENDING) {
            self.status = RESOLVED;
            self.value = value;
            self.onFullfilledCallbacks.map(cb => cb(self.value))
        }
    }

    // reject
    function reject(reason) {
        if(self.status === PENDING) {
            self.status = REJECTED;
            self.reason = reason;
            self.onRejectedCallbacks.map(cb => cb(self.reason))
        }
    }

     try {
         fn(resolve, reject);
     } catch(err) {
         reject(err)
     }
 }

 myPromise.prototype.then = function (onFullfilled, onRejected) {
      // 若传入的不是方法，则透传上一个promise的执行结果
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let self = this;
    let promise2 = undefined
    // 等待态则等待接受或者拒绝
    if(self.status === PENDING) {
        return (promise2 = new myPromise((resolve, reject) => {
            self.onFullfilledCallbacks.push(() => {
                setTimeout(() => {
                   try {
                       let x = onFullfilled(self.value);
                       resolvePromise(promise2, x, resolve, reject)
                   } catch(err) {
                       reject(err)
                   }
                }, 0);
            });
            self.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                   try {
                       let x = onRejected(self.reason);
                       resolvePromise(promise2, x, resolve, reject)
                   } catch(err) {
                       reject(err)
                   }
                }, 0);
            });
        }))
    }
    if(self.status === RESOLVED) {
        return (promise2 = new myPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFullfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(err) {
                    reject(err);
                }
            }, 0);
        }));
    }

    if(self.status === REJECTED) {
        return (promise2 = new myPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(err) {
                    reject(err);
                }
            }, 0);
        }));
    }
 }

myPromise.deferred = function () {
     let dfd = {}
     dfd.promise = new myPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
     })
     return dfd;
 }

 module.exports = myPromise