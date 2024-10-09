// 1. 实现call
Function.prototype.myCall = function () {
    let [context, ...args] = [...arguments];
    if(!context || typeof context !== 'object') {
        context = typeof window === 'undefined' ? global : window;
    }
    let sym = Symbol();
    context[sym] = this;
    let result = context[sym](...args);
    delete context[sym];
    return result;
}

// 2. 实现apply
Function.prototype.myApply = function (context, args = []) {
    if(args && !(args instanceof Object)) {
        throw TypeError('error');
    }
    if(!context || typeof context !== 'object') {
        context = typeof window === 'undefined' ? global : window;
    }
    const sym =Symbol();
    context[sym] = this;
    let result = context[sym](...args);
    delete context[sym];
    return result;
}

// 3. 实现bind
Function.prototype.bind = function (context) {
    if(!context || typeof context !== 'object') {
        context = typeof window === 'undefined' ? global : window;
    }
    let _this = this;
    const args = [...arguments].slice(1);
    return function F() {
        // 判断是否使用new调用
        if(_this instanceof F) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(context,args.concat(...arguments))
    }
}

// 4. 实现new
const  myNew =function (fun) {
    let obj = {};
    obj.__proto__ = fun.prototype;
    const args = [...arguments].slice(1);
    let result = fun.apply(obj, args);
    return typeof result === 'object' ? result : obj;
}
// 5. 数组去重
// Set， map + for循环， indexOf + for循环， 快慢指针（有序数组，或者现将数组排序）；

// 6. flatArray

const flatArray = (arr) => {
    return arr.reduce((pre, cur) => Array.isArray(cur) ? pre.concat(flatArray(cur)): pre.concat(cur), []);
}
flatArray([1,2,3,[1,4,[8,9,10]]]); // [1, 2, 3, 1, 4, 8, 9, 10]

// 7. instanceOf
function myInstanceof(target, origin) {
    let proto = target.__proto__;
    while(proto) {
        if(origin.prototype === proto) {
            return true;
        } else {
            proto = proto.__proto__;
        }
    }
    return false;
}

// 8. 函数柯里化

function currying(fn, ...args) {
    return args.length < fn.length ? (...args1) => currying(fn, ...args, ...args1): fn(...args);
}
function countTotal(a, b, c, d) {
    return a + b + c + d;
}
const sum = currying(countTotal);
sum(2,3)(1,4)

// 9. 实现 a == 1 && a == 2 && a == 3
// 写法一
var a = {
    value: [3,2,1],
    valueOf: function () {
        return this.value.pop();
    }
}

// 写法二
var a = {
    value: [3,2,1],
    [Symbol.toPrimitive]: function ()  {
        return this.value.pop();
    }
}

// 10. 手写实现Object.create

// 实现原理就是以传入的对象为原型创建一个实例
function myCreate(obj) {
    function F() {}
    if(obj && typeof obj === 'object') {
        F.prototype = obj;
    }
    return new F();
}

// 11. 手写实现Object.is
Object.defineProperty(Object, 'is', {
    value: function(x, y) {
        if(x === y) {
            return x !== 0 || y !== 0 || 1/x === 1/y;
        } else {
            return x !== x && y !== y;
        }
    }
})

// 12. 手写实现神拷贝，解决循环引用，数组和对象的拷贝
function deepClone(target, map = new WeakMap()) {
    if(!target || typeof target !== 'object') return target;
    if(map.get(target)) {
        console.log(map)
        return map.get(target);
    }
    let cloneTarget = Array.isArray(target) ? [] : {}
    map.set(target, cloneTarget)
    for(let key in target) {
        cloneTarget[key] = deepClone(target[key], map)
    }
    return cloneTarget;
}
let obj1 = {
    a: 2,
    b: 3,
    c: function() {
        console.log('sdfsdfsd')
    }
}
deepClone(obj1)
let obj2 = {
    a: 2,
    b: 3,
    c: function() {
        console.log('sdfsdfsd')
    },
    d: {
        e: obj2.c
    },
    e:  /^fff/
}
deepClone(obj2)

// 13. 节流的手写实现，保证一段时间内只触发一次
const throttle=(cb, delay) => {
    let start = Date.now()
    return function(cb) {
        let current = Date.now();
        if(current - start >= delay) {
            cb();
            start = Date.now();
        }
    }
}
document.getElementById('222').onclick = throttle(() => {}, 2000);
// input输入框的搜索， 

// 14. 防抖的手写实现，一段时间间隔内没有触发，则执行
const debounce = (cb, delay) => {
    let timer = null
    return function() {
        timer && cleartimeout(timer);
        timer = setTimeout(cb, delay);
    }
}
document.getElementById('222').onclick = debounce(() => {}, 2000);
// resize，滚动操作，拖拽操作

// 15. 实现JSON.parse，使用eval
// 16. 手写实现Promise

const PENDING='pending';
const RESOLVED='resolved';
const REJECTED='rejected';
function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return new TypeError('cycle reference');
    }
    let isCalled = false;
    if(x !== null && (typeof x === 'function' || typeof x === 'object')) {
        let then = x.then;
        if(typeof then === 'function') {
            then.call(x, 
                y => {
                    if(isCalled) return;
                    isCalled = true;
                    resolvePromise(promise2, y, resolve, reject)
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
    } else {
        resolve(x);
    }
}
function myPromise(fn) {
    let self = this;
    self.status = PENDING
    self.value = undefined;
    self.reason = undefined;
    self.resolvedCallbacks = [];
    self.rejectedCallbacks = []


    function resolve(value) {
        if(value instanceof myPromise) {
            return value.then(resolve, reject)
        }
        setTimeout(() => {
            if(self.status === PENDING) {
                self.start = RESOLVED;
                self.value = value;
                self.resolvedCallbacks(cb => cb(value));
            }
        }, 0);
    }
    function reject(reason) {
        setTimeout(() => {
            if(self.status === PENDING) {
                self.status = REJECTED;
                self.reason = reason;
                self.rejectedCallbacks(cb => cb(self.reason));
            }
        }, 0);
    }
    try {
        fn(resolve, reject)
    } catch(err) {
        console.log(err);
    }
}

myPromise.prototype.then = function(onFullfilled, onRejected) {
    // 若onFullfilled传入的不是函数，则发生透传， 若onRejected传入的不是函数，则定义一个抛出异常的回调
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw new Error(err)};
    const self = this;
 
    let promise2 = undefined;
    if(self.status === PENDING) {
        return (promise2 = new myPromise((resolve, reject) => {
        // promise的状态还未完成
       
            self.resolvedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFullfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(err) {
                        reject(err)
                    }
                }, 0);
            })
            self.rejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(err) {
                        reject(err)
                    }
                }, 0);
            })
        })) 
    }
    if(self.status === REJECTED) {
        return (promise2 = new myPromise((resolve, reject) => {
            setTimeout(() => {
                try{
                    let x = onFullfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(err) {
                    reject(err)
                }
            }, 0);
        }))
    }
    if(self.status === REJECTED) {
        return (promise2 = new myPromise((resolve, reject) => {
            setTimeout(() => {
                try{
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(err) {
                    reject(err)
                }
            }, 0);
        }))
    }
}

// 17. 手写实现Promise.all
Promise.all = function (promises) {
    if(!Array.isArray(promises)) {
        return new TypeError('promises is not an array')
    }
    return new Promise((resolve, reject) => {
        let res = [], len = promises.length;
        promises.forEach((promise) => {
            Promise(promise).then(value => {
                res.push(value);
                if(res.length === len) {
                    resolve(res);
                }
            }, err => {
                reject(err);
            })
        })
    })
}
// 18. 手写实现Promise.race
Promise.race = function (promises) {
    if(!Array.isArray(promises)) {
        return new TypeError('promises is not an array')
    }
    return new Promise((resolve, reject) => {
        promises.forEach((promise) => {
            Promise(promise).then(value => {
                resolve(value);
            }, err => {
                reject(err);
            })
        })
    })
}

// 19. 实现一个简单的迭代器
const makeIterator = (arr) => {
    let nextIndex = 0;
    return {
        next: () => {
            return nextIndex < arr.length ? {
                value: arr[nextIndex++],
                done: false
            } : {
                value: undefined,
                done: true
            }
        }
    }
}
const it = makeIterator(['八月', '深化']);
console.log(it.next()) //  { value: "人月", done: false }
console.log(it.next()) // { value: "神话", done: false }
console.log(it.next()) // {value: undefined, done: true }

// 20. 手写实现异步调度器
let arr = [], i = 0;
for(let i = 0; i < 100; i++) {
    arr.push(new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('33')
            resolve('33')
        }, 100);
    }));
}
function resolveAjax(arr, max, callback) {
    let fetchArr = [], i = 0
    function toFetch() {
        if(i === arr.length) {
            callback();
            return Promise.resolve();
        }
        let one = arr[i++];
        one.then(() => fetchArr.splice(fetchArr.indexOf(one), 1));
        fetchArr.push(one);
        let p = Promise.resolve();
        if(fetchArr.length >= max) {
            p = Promise.race(fetchArr); 
        }
        return p.then(() => toFetch());
    }
    toFetch()
}
resolveAjax(arr, 10, () => {
    console.log('success')
})

// 21. 手写字符串模版
function strModel(str) {
    let reg = /\$\{([^\}]*)\}/g;
    str = str.replace(reg, function(x,y)  {
        return eval(y);
    });
    return str;
}

// 22. 手写实现async await
function getNum(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num + 1);
        }, 0);
    })
}
function asyncFunc(func) {
    const gen = func();
    function next(data) {
        let res= gen.next(data);
        if(res.done) return res.value;
        res.value.then((_data) => {
            next(_data)
        })  
    }
    next()
}
let func = function* () {
    let f1 = yield getNum(1);
    let f2 = yield getNum(f1);
    console.log(f2);
}
asyncFun(func);

// 23. 手写函数实现从n个数中产生m个随机数
function getNum(arr, m) {
    let res = [], n = arr.length;
    for(let i = 0;i< m;i++) {
        let random = parseInt(Math.ramdom() * (n-i) + i); // [i, n)
        res.push(arr[random])
    }
    return res;
}
getNum([1,2,3,4,5,6,7], 3); // [3, 4, 6]

// 24. 洗牌算法
// 从最后元素开始，数组中随机选择一个位置交换，直到最后一个位置终止
function disorder(arr) {
    if(!arr || arr.length < 2) {
        return arr;
    }
    let len = arr.length;
    let count = len - 1;
    while(count >= 0) {
        let random = Math.floor(len * Math.random());
        [arr[random], arr[count]] = [arr[count], arr[random]];
        count--;
    }
    return arr;
}
disorder([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]);