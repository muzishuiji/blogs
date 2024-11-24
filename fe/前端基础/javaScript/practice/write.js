// 1. 实现call
Function.prototype.myCall = function (context, ...args) {
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
    const sym = Symbol();
    context[sym] = this;
    let result = context[sym](...args);
    delete context[sym];
    return result;
}

// 3. 实现bind
Function.prototype.bind = function (context) {
    let _this = this;
    let args1 = Array.prototype.slice.call(arguments, 1);
    return function F(...args2) {
        if(this instanceof F) {
            return new _this(...args1, ...args2);
        }
        return _this.apply(context, args1.concat(args2));
    } 
}

// 4. 实现new
function myNew(fn) {
    let obj = {};
    obj.__proto__ = fn.prototype;
    let args = Array.prototype.slice.call(arguments, 1);
    let res = fn.apply(obj, args);
    return res instanceof Object ? res : obj;
}
function testFunc(name) {
    this.name = name;
}
let aa = myNew(testFunc, 'ddd');
// {
//     "name": "ddd"
// }

// 5. 数组去重
// Set， map + for循环， indexOf + for循环， 快慢指针（有序数组，或者现将数组排序）；

// 6. flatArray
function flattenArr(arr, depth) {
    return arr.reduce((pre, cur) => {
        if(Array.isArray(cur) && depth >= 1) {
            return pre.concat(flattenArr(cur, depth - 1))
        }
        pre.push(cur);
        return pre;
    }, []);
}

flattenArr([1, 2, 3, [4, 5]], 1);
flattenArr([1, 2, 3, [4, [5]]], 1);
flattenArr([1, 2, 3, [4, [5]]], 2);



// 7. instanceOf
function myInstanceof(target, origin) {
    let proto = target.__proto__;
    while(proto) {
        if(proto === origin.prototype) {
            return true
        }
        proto = proto.__proto__;
    }
    return false;
}

myInstanceof({aa: 'aa'}, Object);        // true
myInstanceof(function() {}, Function);   // true
myInstanceof({aa: 'aa'}, Function);      // false
myInstanceof(function() {}, Object);     // true

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
// 让新创建的对象的__proto__指向传入的对象，继承传入对象的属性和方法
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
    // 处理循环引用：如果已经存在，则直接返回
    if(map.has(target)) {
        return map.get(target);
    }
    // 处理基本类型数据的复制
    if(target === null || typeof target !== 'object') {
        return target;
    }
    // 处理日期类型
    if(target instanceof Date) {
        return new Date(target);
    }
    // 处理正则类型
    if(target instanceof RegExp) {
        return new RegExp(target);
    }
    // 其他
    // ...
    // 复制数组和对象
    let copy = Array.isArray(target) ? [] : {};
    map.set(target, copy);
    Object.keys(copy).forEach(key => {
        // 注意这里的map传递
        copy[key] = deepClone(target[key], map);
    });
    return copy;
}
let obj1 = {
    a: 2,
    b: 3,
    c: function() {
        console.log('sdfsdfsd')
    }
}
let copyObj1 = deepClone(obj1);
console.log(obj1 === copyObj1);
let obj2 = {
    a: 2,
    b: 3,
    c: function() {
        console.log('sdfsdfsd')
    },
    d: {},
    e:  /^fff/
}
obj2.d.e = obj2.c;
let copyObj2 = deepClone(obj2);
console.log(obj2 === copyObj2);

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
        let random = parseInt(Math.random() * (n-i) + i); // [i, n)
        res.push(arr[random])
    }
    return res;
}
getNum([1,2,3,4,5,6,7], 3); // [3, 4, 6]

// 产生n-m之间的随机数
// Math.random * (m - n) + n

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

// 25. promise + async await实现异步打印
function sleep(time, i) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(i);
        }, time);
    });
}
async function print() {
    for(let i = 0; i < 6; i++) {
        let result = await sleep(1000, i);
        console.log(result)
    }
}

// 26. 单例模式
// 方式一：改写构造函数
class Parent {
    instance = undefined;
    constructor() {
        if(!this.instance) {
            this.instance = new Parent()
        }
        return this.instance;
    }
    // some method
    // ...
}

// 方式二：通过独立的getInstance方法
class Parent {
    instance = undefined;
    constructor(name) {
        this.name = name;
    }
}
Parent.getInstance = (function() {
    let instance = undefined;
    return function(...args) {
        if(!instance) {
            instance = new Parent(...args);
        }
        return instance;
    }
})();

var a = Parent.getInstance('muzishuiji');
var b = Parent.getInstance('muzishuiji');
console.log(a === b); // true

// 27. 洗牌算法
function disorder(arr) {
    let len = arr.length;
    let count = len - 1;
    while(count >= 0) {
        let randomIndex = Math.floor(Math.random() * len);
        [arr[randomIndex], arr[count]] = [arr[count], arr[randomIndex]];
        count--;
    }
    return arr;
}
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
disorder(arr);

// 28. dom diff

// 29. dom list diff

// 30. webpack dynamic import

// 31. 借助闭包实现计数器
function createCounter() {
    let count = 0;
    return function() {
        count++;
        console.log(count)
    }
}

let counter = createCounter();
counter();
counter();
counter();

// 32. 寄生组合继承
/**
 * 构造函数的优点：
 * - 只调用一次父类构造函数；
 * - child可以继承parent函数内部定义的属性；
 * - 子类可以继承父类原型上的构造方法；
 * - 父类的引用属性不会被共享；
 */
function Parent(name) {
    this.name = name;
}
Parent.prototype.say = function() {
    console.log('say');
}
function Child(...args) {
    Parent.call(this, ...args);
}
function inheritPrototype(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}
inheritPrototype(Child, Parent);
let child1 = new Child('muzishuiji')

// 33. 手写promise
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    // 构造方法接收一个回调
    constructor(executor) {
        this._status = PENDING;
        this._resolveQueue = [];
        this._rejectQueue = [];
        this._value = undefined;
        this._reason = undefined;


        let _resolve = (val) => {
            // 将resolve异步化
            const run = () => {
                // 状态一经变更，则不会再变化
                if(this._status !== PENDING) {
                    return;
                }
                // 变更状态
                this._status = FULFILLED;
                this._value = val; // 存储当前then回调的执行结果
                while(this._resolveQueue.length) {
                    const callback = this._resolveQueue.shift();
                    callback(val);
                }
            }
            setTimeout(run);
        }  
        
        let _reject = (reason) => {
            // 将reject异步化
            const run = () => {
                // 状态一经变更，则不会再变化
                if(this._status !== PENDING) {
                    return;
                }
                // 变更状态
                this._status = REJECTED;
                this._reason = reason;
                while(this._rejectQueue.length) {
                    const callback = this._rejectQueue.shift();
                    callback(reason);
                }
            }
            setTimeout(run);
        }
        // 立即执行构造函数传入的cb
        executor(_resolve, _reject);
    }

    // 实现then的链式调用
    then(resolveFn, rejectFn) {
        // 判断then传入的是否是function，不是则封装成function
        resolveFn = typeof resolveFn === 'function' ? resolveFn : (value => value);
        rejectFn = typeof rejectFn === 'function' ? rejectFn : ((error) => {
            return  new Error(error instanceof Error ? error.message : error);
        })
        return new MyPromise((resolve, reject) => {
            let fulfilledFn = (value) => {
                try {
                    // 执行当前传入的then回调，并获取返回值
                    let x = resolveFn ?  resolveFn(value) : value;
                    // 如果传入的回调是一个promise，那么等待promise的状态变更，否则直接resolve
                    x instanceof MyPromise ? x.then(resolve ,reject) : resolve(x);
                } catch(err) {
                    reject(err);
                }
            }



            let rejectedFn = (reason) => {
                try {
                    let x = rejectFn ? rejectFn(reason) : reason;
                    return x instanceof MyPromise ? x.then(resolve ,reject) : reject(reason);
                } catch(err) {
                    reject(err);
                }
            }
            // 判断promise的状态，如果是pending则push进队列，如果是fulfilled或者rejected则立即执行
            switch(this._status) {
                case PENDING:
                    // 将封装后的then回调push进队列
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

    // 静态的resolve方法
    static resolve(value) {
        // 根据规范，如果参数是Promise实例，直接return整个实例
        if(value instanceof MyPromise) return value;
        return new MyPromise(resolve => resolve(value));
    }

    // 静态的reject方法
    static reject(reason) {
        // 返回一个带有拒绝原因的promise对象
        return new MyPromise((resolve, reject) => reject(reason));
    }

    // 静态的all方法
    static all(promiseArr) {
        let res = [];
        let index = 0;
        return new MyPromise((resolve, reject) => {
            promiseArr.forEach((element, i) => {
                // 处理传入值非promise的情况
                MyPromise.resolve(element).then(
                    value => {
                        res[i] = value;
                        index++;
                        // 所有then回调执行完，resolve结果
                        if(index === promiseArr.length) {
                            resolve(res);
                        }
                    },
                    (err) => {
                        reject(err)
                    }
                )
            });
        });
    }
    // 静态的race方法
    static race(promiseArr) {
        return new MyPromise((resolve, reject) => {
            promiseArr.forEach((element, i) => {
                // 处理传入值非promise的情况
                MyPromise.resolve(element).then(
                    value => {
                        resolve(value);
                    },
                    (err) => {
                        reject(err)
                    }
                )
            });
        });
    }
}

// catch方法就是将promise流转到rejected状态
MyPromise.prototype.catch = function (rejectFn) {
    return this.then(null, rejectFn);
}

// finally方法返回一个promise，在promise结束时，无论结果是fulfilled还是rejected，都会执行指定的回调函数
// 在finally之后，还可以继续执行then，并且将值原封不动的传递给后面的then。
MyPromise.prototype.finally = function (callback) {
    return this.then(
        value => MyPromise.resolve(callback()).then(() => value),
        reason => MyPromise.reject(callback()).then(() => {throw reason})
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
// 34. 状态管理redux

// 35. 状态管理mobx


// 36. jsonp
(function (window, document) {
    'use strict';
    var jsonp = function(url, data, callback) {
        // 1. 将传入的data数据转化为url字符串形式
        var dataString = url.indexOf('?') == -1 ? '?' : '&';
        for(var key in data) {
            dataString += key += '=' + data[key] + '&'
        }
        // 创建一个script标签
        let scriptEle = document.createElement('script');
        scriptEle.src = url + dataString;
        var cbFuncName = 'my_json_cb' + Math.random().toString().replace('.','');
        window[cbFuncName] = function (data) {
            callback(data);
            document.body.removeChild(scriptEle)
        }
        document.body.appendChild(scriptEle);
     }
     window.$jsonp = jsonp;
})(window, document);

// 37. 异步中间件控制
class AsyncQueue {
    constructor() {
      // 你的代码
      this.events = [];
    }
    // 事件注册
    tap(name, fn) {
      // 你的代码
      if(!this.events[name]) {
        this.events[name] = [];
      }
      this.events[name].push(fn);
    }
    // 事件触发
    exec(name, fn) {
      // 你的代码
      if(!this.events[name]) {
        return;
      }
      const executor = (i) => {
        if(!this.events[name][i]) {
            fn();
            return;
        }
        let event = this.events[name][i];
        event((error) => {
          if(error && error instanceof Error) {
            throw error;
          }
          executor(i + 1)
        });
      }
      executor(0);
    }
}
  
function fn1(cb) {
  console.log('fn1');
  cb();
}

function fn2(cb) {
  console.log('fn2');
  cb();
}

function fn3(cb) {
  setTimeout(() => {
    console.log('fn3');
    cb();
  }, 2000);
}

function fn4(cb) {
  setTimeout(() => {
    console.log('fn4');
    // 如果传递错误，则中断执行
    cb(new Error('dd'));
  }, 3000);
}

// 创建事件队列
const asyncQueue = new AsyncQueue();
// 注册事件队列
asyncQueue.tap('init', fn1);
asyncQueue.tap('init', fn2);
asyncQueue.tap('init', fn3);
asyncQueue.tap('init', fn4);

// 执行事件队列
asyncQueue.exec('init', () => {
  console.log('执行结束');
});
  
// 预期输出
// fn1
// fn2
// 2s 后
// fn3
// 再 3s 后
// fn4
// 执行结束

// 38. 找到对应节点的父节点数组
// 输入 45dss 返回 ['广东省', '深圳市']

const cityData = [
    {
    id: 'axzx',
    name: '广东省',
    children: [
    {
        id: 'sdsd',
        name: '深圳市',
        children: [
        {
            id: '45dss',
            name: '南山区',
        },
        {
            id: 'sdsd11',
            name: '福田区',
            children: [
            {
                id: 'ddrr2',
                name: 'A街道',
            },
            ],
        },
        ],
    },
    {
        id: '2323d',
        name: '东莞市',
        children: [
        {
            id: 'xxs2',
            name: 'A区',
        },
        {
            id: 'kklio2',
            name: 'B区',
        },
        ],
    },
    ],
    },
];

// 方案一：dfs
function traverseListDfs(data, targetId) {
    let dfs = (data, targetId, parentNames = []) => {
        for(let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            if(item.id === targetId) {
                return parentNames;
            }
            if(item.children) {
                let res = dfs(item.children, targetId, parentNames.concat(item.name));
                return res;
            }
            
        }
        return [];
    }
    return dfs(data, targetId, []);
}
traverseListDfs(cityData, '45dss');

// 方案二：bfs
function traverseListBfs(data, targetId) {
    let queue = [{
        node: data,
        path: []
    }];
    while(queue.length) {
        let { node, path} = queue.shift();
        for(let i = 0, len = node.length; i < len; i++) {
            let item = node[i];
            if(item.id === targetId) {
                return path;
            }
            if(item.children) {
                queue.push({
                    node: item.children,
                    path: path.concat(item.name),
                })
            }
        }
    }
}
traverseListDfs(cityData, '45dss');
// dom diff的逻辑梳理
// 自定义plugin如何编写
