const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError('Cycle reference'));
    }
    let isCalled = false;
    if(x !== null && (typeof x=== 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if(typeof then === 'function') {
                then.call(x, 
                    y=> {
                        if(isCalled) return;
                        isCalled = true;
                        resolvePromise(promise2, y, resolvePromise, reject)
                    },
                    err => {
                        if(isCalled) return;
                        isCalled = true;
                        reject(err)
                    }
                )
            } else {
                resolve(x)
            }
        } catch(err) {
            if(isCalled) return;
            isCalled = true;
            reject(err)
        }
    } else {
        resolve(x);
    }
}

function myPromise(fn) {
    let self = this;
    self.status = undefined;
    self.value = undefined;
    self.reason = undefined;
    self.onFullfilledCallbacks = [];
    self.onRejectedCallbasks = [];

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
            self.onRejectedCallbasks.map(cb => cb(self.reason))
        }
    }

    try {
        fn(resolve, reject);
    } catch(err) {
        reject(err);
    }
}

myPromise.prototype.then = function(onFullfilled, onRejected) {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err; };
    let self = this;
    let promise2 = undefined;
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
            self.onRejectedCallbasks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(err) {
                        reject(err)
                    }
                }, 0);
            })
        }))
    }
    if(self.status === RESOLVED) {
        return (promise2 = new myPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFullfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject)
                }catch(err) {
                    reject(err)
                }
            }, 0);
        }))
    }
    // rejected
    return (promise2 = new myPromise((resolve, reject) => {
        setTimeout(() => {
            try {
                let x = onRejected(self.reason);
                resolvePromise(promise2, x, resolve, reject);
            }catch(err) {
                reject(err)
            }
        }, 0);
    }))
}



var arr = [], i = 0
function resolveAjax(arr, max, callback) {
    var fetchArr = [], i = 0;
    function toFetch() {
        if(i === arr.length) {
            return Promise.resolve()
        }
        let one = arr[i];
        i += 1;
        one.then(() => fetchArr.splice(fetchArr.indexOf(one), 1))
        fetchArr.push(one)
        let p
        if(fetchArr.length >= max) {
            p = Promise.race(fetchArr)
        }
        return p.then((res) => toFetch(res))
    }
    toFetch().then(() => Promise.all(fetchArr).then(() => {
        callback()
    }))
}
for(var i = 0; i < 100; i++) {
    arr.push(fetch('http://127.0.0.1:6002/?time=' + Math.random()))
}
resolveAjax(arr, 100, () => {
    console.log('111');
})
var arr = [], i = 0;
function resolveArr(arr, max, callback) {
    let fetchArr = [], i = 0;
    function fetch() {
        if(i === arr.elngth) {
            return Promise.resolve() 
        }
        let one
    }
}



