# JavaScript手写代码系列

## call

`fn.call(obj, args)`, call函数接收多个参数,第一个参数是指定函数执行时候的this,后面的另个或多个参数则是调用函数fn的传参.

    Function.prototype.myCall = function() {
      let [thisArg, ...args] = [...arguments];  // 使用数组的解构赋值获取要绑定的this对象和其他参数
      if(!thisArg) {
        // 如果传进来的要绑定的this对象为空
        thisArg = typeof window === 'undefined' ? global : window;
      }
      let sym = Symbol();
      // 给传进来的this对象创建一个独一无二的属性,避免属性污染
      thisArg[sym] = this;
      let result =  thisArg[sym](args);
      delete thisArg[sym];   
      return result;
    }
  
## apply

`fn.apply(obj, args: <Object>)`, apply函数接收两个参数,第一个参数是指定函数执行时候的this, 
第二个参数是调用函数fn的参数组成的数组,如果传入非Object的实例的参数,则会抛出错误.
  
     Function.prototype.myApply = function(thisArg, args) {
        // 如果传入的参数不是Object的实例,如"123", 25,则抛出错误
        if(args && !(args instanceof Object)) {
          throw Error("CreateListFromArrayLike called on non-object");
        }
        if(!thisArg) {
          // 如果传进来的要绑定的this对象为空
          thisArg = typeof window === 'undefined' ? global : window;
        }
        let sym = Symbol();
        // 给传进来的this对象创建一个独一无二的属性,避免属性污染
        thisArg[sym] = this;
        let result =  args ? thisArg[sym](args) : thisArg[sym]();
        delete thisArg[sym];   
        return result;
      }
    
   
## 函数柯里化

我个人的理解,函数柯里化就是定义一个已知函数fn,有n个参数,实现一个柯里化函数curry, 调用curry函数将fn函数传入,curry函数主要负责把后面调用的函数参数都收集起来,
当收集的参数个数达到fn的参数个数后,则调用fn,并传入收集到的参数.

    const currying = (fn, ...args) => {
      return args.length < fn.length
              ? (...arguments) => curry(fn, ...args, ...arguments)
              : fn(...args);
    }
    function countTotal(a, b, c, d) {
      return a * b *c * d;
    }
    let sum = currying(countTotal);
    sum(1)(2)(3)(4);   // 24
    sum(1, 2)(3)(4);   // 24
    sum(1, 2, 3)(4);   // 24
    sum(1, 2, 3, 4);   // 24
    
柯里化函数的主要作用:

* 参数复用
* 提前返回-返回接收余下的参数且返回结果的新函数.
* 言之执行-返回新函数,等待执行

## 实现数组去重,数组乱序,sleep

    // 数组去重
    function arraySet(arr) {
        if(!Array.isArray(arr)) {
          throw Error('arr is not an array');
        }
        return [...new Set(arr)];
    }
    // 数组乱序
    function disorder(arr) {
        if(!Array.isArray(arr)) {
          throw Error('arr is not an array');
        }
        let tempArr = [];
        while(arr.length) {
          let index = Math.floor(Math.random() * arr.length);
          tempArr.push(arr[index]);
          arr.splice(index, 1);
        }
        return tempArr;
    }
    function mySleep(delay) {
      let startTime = +new Date
      while(true) {
        if(+new Date - startTime >= delay) {
          break;
        }
      }
    }
    mySleep(3000)
    console.log('111');    // 停顿了三秒钟
 
## 实现 a == 1 && a == 2 && a ==3
  
    // 写法一
    var a = {
      value: [3,2,1],
      valueOf: function() {
        return this.value.pop();
      }
    }
    // 写法二
    let a = {
        value: [3,2,1],
        [Symbol.toPrimitive]: function() {
                return this.value.pop();
        }
    }
    a == 1 && a == 2 && a ==3   // true

为什么会出现上述情况呢?是因为a在和1,2,3这些数值类型的值进行比较的时候发生了隐式类型转换, 规则如下:

* 如果引用类型`a`部署了[Symbol.toPrimitive] 接口,那么会调用此接口,若返回的不是基本类型的数据,则抛出错误.
* 如果引用类型`a`没有部署[Symbol.toPrimitive] 接口,那么会根据需要转换的类型,这个时候和数值比较,会默认转换成number类型,则根据转换规则,会先调用`a`的`valueOf`方法,
若返回的不是基本类型的数据,则抛出错误, 然后调用`a`的`toString`方法,若返回的不是基本类型的数据,则抛出错误.从而上述表达式会分别返回字符串1,2,3.
* 非Date类型的引用类型在转换成原始类型的时候默认是转换成number类型的,但是Date类型的数据转换成原始类型的时候默认是转换成string类型.
* 没有部署[Symbol.toPrimitive] 接口的引用类型的数据,如果要转换成string类型,则先调用toString方法,在调用valueOf方法;
如果要转换成number类型,则先调用valueOf方法,再调用toString方法.
以上调用过程如果返回结果不是原始类型,则抛出错误.

**引用类型转换成原始类型的过程也被称为拆箱.**

## 数据劫持defineProperty和Proxy
  
    // defineProperty
    let obj = {age: 1};
    let age = 1;
    Object.defineProperty(obj, 'age', {
      get: function() {
        return age++;
      }
    });
    obj.age;    // 1
    obj.age;    // 2
    obj.age;    // 3

    // Proxy
    let obj1 = new Proxy({}, {
      age: 1,
      get: function() {
        return this.age++;
      }
    });
    obj1.age;    // 1
    obj1.age;    // 2
    obj1.age;    // 3
    
## Promise

    // 创建三个用于表示状态的常量
    const PENDING = 'pending';
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'
    function MyPromise(fn) {
      const that = this;
      that.state = PENDING;
      this.value = null;
      that.resolvedCallbacks = [];
      this.rejectedCallbacks = [];
      // 定义resolve函数
      function resolve(value) {
        // value的promise化
        if(value instanceof MyPromise) {
          return value.then(resolve, reject)
        }
        // 实现异步的效果
        setTimeout(() => {
          if (that.state === PENDING) {
            that.state = RESOLVED
            that.value = value
            that.resolvedCallbacks.map(cb => cb(that.value))
          }
        }, 0)
      }
      // 定义reject函数
      function reject(value) {
        setTimeout(() => {
          if(this.state === PENDING) {
            // 修改状态，修改value
            that.state = REJECTED;
            that.value = value;
            // 遍历回调数组并执行
            that.rejectedCallbacks.map(cb => cb(that.value))
          }
        })
      }
      // 注意这里有一个异常捕获
      try {
        fn(resolve, reject);
      } catch(e) {
        reject(e);
      }
    }
    // 然后就是then函数
    MyPromise.prototype.then = function(onFulfilled, onRejected) {
      const that = this;
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
      onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r; }
      if(that.state === PENDING) {
        // 每个then函数都会返回一个新的promise对象
        return (promise2 = new MyPromise((resolve, reject) => {
          that.resolvedCallbacks.push(() => {
            try {
              const x = onFulfilled(that.value)
              resolutionProcedure(promise2, x, resolve, reject)
            } catch (r) {
              reject(r)
            }
          })
          that.rejectedCallbacks.push(() => {
            try {
              const x = onRejected(that.value)
              resolutionProcedure(promise2, x, resolve, reject)
            } catch (r) {
              reject(r)
            }
          })
        }))
      }
      if(that.state === RESOLVED) {
        return (promise2 = new MyPromise((resolve, reject) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(that.value)
              resolutionProcedure(promise2, x, resolve, reject)
            } catch (reason) {
              reject(reason)
            }
          })
        }))
      }
      if(that.state === REJECTED) {
        return (promise2 = new MyPromise((resolve, reject) => {
          setTimeout(() => {
            try {
              const x = onRejected(that.value)
              resolutionProcedure(promise2, x, resolve, reject)
            } catch (reason) {
              reject(reason)
            }
          })
        }))
      }
    }
    // 实现兼容多种 Promise 的 resolutionProcedure 函数
    function resolutionProcedure(promise2, x, resolve, reject) {
      if (promise2 === x) {
        return reject(new TypeError('Error'))
      }
      if (x instanceof MyPromise) {
          x.then(function(value) {
              resolutionProcedure(promise2, value, resolve, reject)
          }, reject)
      }
      let called = false
      if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
          let then = x.then
          if (typeof then === 'function') {
            then.call(
              x,
              y => {
                if (called) return
                called = true
                resolutionProcedure(promise2, y, resolve, reject)
              },
              e => {
                if (called) return
                called = true
                reject(e)
              }
            )
          } else {
            resolve(x)
          }
        } catch (e) {
          if (called) return
          called = true
          reject(e)
        }
      } else {
        resolve(x)
      }
    }
    // promise的调用
    new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(1)
      }, 0)
    }).then(value => {
      console.log(value)
    })
  
## Promise.all

    Promise.myAll = function(promises) {
        return new Promise((resolve, reject) => {
            // Array.from将可迭代对象转换成数组
            let promiseArray = Array.from(promises);
            let index = 0;
            let result = [];
            for(let i = 0, len = promiseArray.length; i < len; i++) {
                Promise.resolve(promiseArray[i]).then(function(value) {
                    result.push(value);
                    if(i === len - 1) {
                        resolve(result);
                    }
                }, (err) => {
                    reject(err);
                    return;
                })
            }
        })
    }

## Promise.retry


## Array.prototype.flat 实现数组扁平化

    // 使用reduce和concat结合实现数组扁平化
    function myFlat(arr) {
      if(!Array.isArray(arr)) {
        return arr;
       }
      return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(myFlat(val)) : acc.concat(val), [])
    }
## Array.prototype.filter 实现数组扁平化

    // 使用reduce和concat结合实现数组扁平化
    function myFlat(arr) {
      if(!Array.isArray(arr)) {
        return arr;
       }
      return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(myFlat(val)) : acc.concat(val), [])
    }
  
## 使用requestAnimationFrame实现setInterval

    function setInterval(callback, interval) {
      let timer
      const now = Date.now
      let startTime = now()
      let endTime = startTime
      const loop = () => {
        timer = window.requestAnimationFrame(loop)
        endTime = now()
        if (endTime - startTime >= interval) {
          startTime = endTime = now()
          callback(timer)
        }
      }
      timer = window.requestAnimationFrame(loop)
      return timer
    }

    let a = 0
    setInterval(timer => {
      console.log(1)
      a++
      if (a === 3) cancelAnimationFrame(timer)
    }, 1000)
  
  
