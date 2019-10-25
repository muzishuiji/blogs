# JavaScript手写代码系列

## call, apply, bind, new

* 实现思路:
我们都知道函数执行时候的this是在函数调用的时候动态确定的,有一种隐私的this绑定,就是obj.fun(),这样fun函数的this就指向obj,call,apply,bind的实现就是利用了这一原理.

* 测试函数用的一些变量定义


        var obj = { name: '111' };
        window.name = '145';
        function func() {
            console.log(this.name);
        }

### 1. call
`fn.call(obj, args)`, call函数接收多个参数,第一个参数是指定函数执行时候的this,后面的另个或多个参数则是调用函数fn的传参.

    Function.prototype.myCall = function () {
        // 使用解构赋值获取要绑定的this对象和其他参数
        let [context, ...args] = [...arguments];
        // 要绑定的this独享为空
        if(!context || typeof context !== 'object') {
            args.unshift(context);
            context = typeof window === 'undefined' ? global : window;
        }
        let sym = Symbol();
        context[sym] = this;
        let result = context[sym](...args);
        delete context[sym];
        return result;
    }
    func.myCall(obj); // 111
    func.myCall();  // 145

### 2. apply

`fn.apply(obj, args)`, apply和call函数的区别就是apply接收两个参数,第一个参数是函数执行时候的this,第二个参数是fn调用时候的参数组成的数组.call函数一般用于函数参数个数确定的情况下,apply函数一般用于函数参数个数不确定的情况下.

    Function.prototype.myApply = function (context, args) {
        // 如果传入的参数不是Object的实例,如"123", 25等,抛出错误
        if(args && !(args instanceof Object)) {
            throw Error("CreateListFromArrayLike called on non-object");
        }
        if(!context) {
           context = typeof window === 'undefined' ? global : window; 
        }
        let sym = Symbol();
        context[sym] = this;
        let result = args ? context[sym](...args) : context[sym]();
        delete context[sym];
        return result;
    }
    func.myApply(obj); // 111
    func.myApply();  // 145
    func.myApply(obj, 14);  // 报错

### 3. bind
实现原理: bind函数的原理就是返回一个使用apply绑定了this的函数.

    Function.prototype.myBind = function (context) {
        if(!context) {
            context = typeof window === 'undefined' ? global : window;
        }
        const _this = this
        const args = [...arguments].slice(1);
        return function F() {
            // 如果该函数是以new运算符调用,则不对this做修改
            if(_this instanceof F) {
                return new _this(...args, ...argumrnts)
            }
            console.log(context)
            return _this.apply(context, args.concat(...arguments));
        }
    }
    func.myBind(obj)(); // 111
    func.myBind()();    // 145


### 4. new

实现原理: new操作符的原理就是创建并返回一个原型指向构造函数的原型的一个对象,就是通过继承的方式,让创建的实例拥有构造函数的属性和方法.如果构造函数自身有返回值,则返回构造函数自身的返回值.

    const New = function (Fun) {
        let obj = {};
        // 存参数
        const args = [...arguments].slice(1);
        // 继承构造函数原型上的属性和方法
        obj.__proto__ = Fun.prototype;
        // 改变构造函数执行时候的this,
        // 创建和构造函数相同的自己的私有属性
        // 其实就是将构造函数内部定义在this上的属性和方法复制一份给自己
        // 避免构造函数里有引用类型的变量时,不同的实例间相互污染
        let result = Fun.apply(obj, args);
        return typeof result === 'object' ? result : obj;
    }

### 5. 数组去重
实现原理: 可以使用ES6的Set结构的键值的唯一性的特性来实现数组去重,可以遍历数组,借用obj来实现数组去重.

    // 第一种方法
    function arraySet(arr) {
        if(!Array.isArray(arr)) {
            throw Error('arr is not an array');
        }
        return [...new Set(arr)]
    }
    // 第二种方法
    function arraySet1(arr) {
        if(!Array.isArray(arr)) {
            throw Error('arr is not an array');
        }
        let obj = {}, _tempArr = []
        for(var i = 0; i < arr.length; i++) {
            if(!obj[arr[i]]) {
                obj[arr[i]] = 1;
                _tempArr.push(arr[i])
            }
        }
        return _tempArr;
    }
    arraySet([1,2,2,4,5,1,6,7,4,5]);  // [1, 2, 4, 5, 6, 7]
    arraySet1([1,2,2,4,5,1,6,7,4,5]);  // [1, 2, 4, 5, 6, 7]

### 6. 数组乱序
实现原理: 定义一个新数组,数组乱序的原理就是生成0-arr.length(不包含arr.length)之间的随机数作为索引index,然后将arr[index]添加进新数组,并删除arr数组中index对应的数据,直到arr为空,返回新数组.

    function disorder(arr) {
        if(!Array.isArray(arr)) {
            throw Error('arr is not an array');
        }
        let tempArr = []
        while(arr.length) {
            let index = Math.floor(Math.random() * arr.length);
            tempArr.push(arr[index]);
            arr.splice(index, 1);
        }
        return tempArr;
    }
    disorder([1,2,2,4,5,1,6,7,4,5]);  // [7, 2, 5, 6, 1, 4, 1, 5, 4, 2]

### 7. flatArray(平铺数组)
实现原理: 数组平铺的原理就是定义一个空数组,遍历传入的数组,如果数组中的元素是基本类型,则添加进空数组,如果是数组,则递归遍历,依次添加进空数组.

    function flatArray(arr) {
        // 传入的参数非数组,则不做处理
        if(!Array.isArray(arr)) return arr;
        return arr.reduce((prev, cur) => Array.isArray(cur) ? prev.concat(flatArray(cur)) : (cur && prev.concat(cur)), []);
    }
    flatArray([1,2,3,[1,4,[8,9,10]]]); // [1, 2, 3, 1, 4, 8, 9, 10]

### 8. sleep
实现原理: 编写sleep函数,实现暂停一定的时间间隔后,执行之后的逻辑;

    function mySleep(delay) {
        let startTime = +new Date();
        while(true) {
            if(+new Date() - startTime >= delay) {
                break;
            }
        }
    }
    mySleep(3000)
    console.log('111');    // 延迟三秒后打印

### 9. instanceof
实现原理: instanceof的原理就是判断右边对象的prototype是不是在左边对象的原型链上.

    function myInstanceof(left, right) {
        const prototype = right.prototype;
        left = left.__proto__;
        while(left) {
            if(left === prototype) return true;
            left = left.__proto__;
        }
        return false;
    }
    myInstanceof({}, Object); // true
    myInstanceof([], Object); // true
    myInstanceof(function() {}, Object); // true
    myInstanceof([], Array); // true
    myInstanceof({}, Array); // false
### 10. 函数柯里化
实现原理: 我的理解是函数柯里化,就是定义一个已知函数fn,该函数有n个,实现一个柯里化函数currying,接收参数fn函数,currying函数主要负责收集fn函数的参数,当收集的参数达到fn参数的个数的时候调用fn函数.

    function currying(fn, ...args) {
        return args.length < fn.length ? (...arguments) => currying(fn, ...args, ...arguments) : fn(...args);
    }
    function countTotal(a, b, c, d) {
      return a * b *c * d;
    }
    var sum = currying(countTotal);
    sum(1)(2)(3)(4);   // 24
    sum(1, 2)(3)(4);   // 24
    sum(1, 2, 3)(4);   // 24
    sum(1, 2, 3, 4);   // 24


### 11. 实现 a == 1 && a == 2 && a ==3
实现原理: 要实现这个效果,我们首先想到变量a必然是一个引用类型的数据,我们需要巧妙的利用 `==` 在比较时两边的数据会发生隐式转换这一特性, 具体转换规则如下:

* 如果引用类型a部署了[Symbol.toPrimitive]接口,那么会调用此接口,若返回的不是基本类型的数据,则抛出错误.
* 如果引用类型a没有部署[Symbol.toPrimitive]接口,那么会根据需要转换的类型转换,如果是和数值比较,则默认转换成number类型,根据转换规则,会先调用a的valueOf方法,是基本类型的数据则返回,否则调用a的toString方法,返回基本类型的数据则结束,否则抛出错误.
* 非Date类型的引用类型在转换成原始类型的时候默认是转换成number类型的,但是Date类型的数据转换成原始类型的时候默认是转换成string类型.


        // 写法一
        var a = {
            value: [3,2,1],
            valueOf: function() {
                return this.value.pop();
            }
        }
        // 写法二
        var a = {
            value: [3,2,1],
            [Symbol.toPrimitive]: function() {
                return this.value.pop();
            }
        }
        // 可以通过对Object.defineProperty和Proxy的使用来实现
        // obj.a == 1 && obj.a == 2 && obj.a ==3
        // defineProperty
        var obj = {age: 1};
        var age = 1;
        Object.defineProperty(obj, 'a', {
          get: function() {
            return age++;
          }
        });
        obj.a == 1 && obj.a == 2 && obj.a ==3;   // true
        // Proxy
        var obj1 = new Proxy({}, {
          a: 1,
          get: function() {
            return this.a++;
          }
        });
        obj1.a == 1 && obj1.a == 2 && obj1.a ==3


## 12. jsonP 的原理
实现原理: 一个简单的jsonp的实现,其实就是拼接url,然后动态添加一个script元素到body中.

    function jsonp(req) {
        let script = document.createElement('script');
        let url = req.url + '?callback=' + req.callback.name;
        script.src = url;
        document.body.appendChild(script);
    }
    function callbackFunc(res) {
        console.log('hello ', res.data);   // hello world
    }
    jsonp({
        url: 'https://www.baidu.com/',
        callback: callbackFunc
    })

服务端返回一个调用callback的语句,把data作为参数传入,实例代码返回的str是: `callbackFunc({"data":"world"})`,客户端收到数据后会执行该语句,调用callbackFunc函数.

    // 服务端代码
    var http = require('http');
    var urllib = require('url');
    var port = 8080;
    var data = {'data':'world'};
    http.createServer(function(req,res){
        var params = urllib.parse(req.url,true);
        if(params.query.callback){
            console.log(params.query.callback);
            //jsonp
            var str = params.query.callback + '(' + JSON.stringify(data) + ')';
            res.end(str);
        } else {
            res.end();
        }
    }).listen(port,function(){
        console.log('jsonp server is on');
    });

## 13. 实现Object.create()
实现原理: Object.create(obj)的主要原理就是创建并返回一个新对象,让新对象的__proto__属性指向obj.相当于继承传入的obj对象的属性和方法.

    function myCreate(obj) {
        function F() { return {} };
        obj && typeof obj === 'object' && (F.prototype = obj);
        return new F();
    }
    let obj = {name: 'muzishuiji', add: function(x,y) { console.log(x+y); } };
    let obj1 = myCreate(obj);
    // obj1本身没有name属性,但是通过原型链向上查找到obj,拿到name属性
    console.log(obj1.name);  // muzishuiji
    
## 14. 深拷贝
实现原理: 简单的把一个对象赋值给一个新对象,这样的拷贝属于浅拷贝,只是简单拷贝了对同一块内存的引用,这样修改其中一个对象会对另一个对象造成影响,所以我们需要深拷贝,来复制一个对象的副本,且修改其中一个对象不会对另一个对象造成影响.
简单实现:

    const newObj = JSON.parse(JSON.stringif(oldObj));
局限性:

1. 无法实现对函数,RegExp等特殊对象的克隆
2. 对象中有循环应用,会报错.

较完整版的实现:

    function isObject(o) {
        return (typeof o === 'object' || typeof o === 'function') && o !== null
    }
    function deepClone(obj) {
      if (!isObject(obj)) {
        throw new Error('非对象')
      }
      let isArray = Array.isArray(obj)
      let newObj = isArray ? [...obj] : { ...obj }
      Reflect.ownKeys(newObj).forEach(key => {
        newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
      })
      return newObj;
    }
    let obj = {
      a: [1, 2, 3],
      b: {
        c: 2,
        d: 3
      }
    }
    let newObj = deepClone(obj)
    newObj.b.c = 1
    console.log(obj.b.c) // 2

## 15. 节流与防抖
**概念:**

函数节流: 当某个事件被持续触发时,采用策略保证一定时间内只调用一次处理函数的方式成为节流.

**代码实现:**

    function throttle(cb ,delay) {
        let start = 0
        return function(cb, delay) {
            let current = new Date();
            if(current - start >= delay) {
               cb();
               start = new Date();
            }
        }
    }
    document.getElementById('container').onmousemove = throttle(handle, 1000)
    function handle() {
        console.log("1122");
    }

**概念:**

函数防抖: 当持续触发某个事件时,一定时间内没有再触发,事件处理程序就会执行一次,如果设定的时间到来之前,又再一次触发了事件,则重新开始计时,这样的处理方式成为防抖.

**代码实现:**

    function debounce(cb, delay) {
        let timer;
        return function() {
            // delay的时间间隔内,事件被再次触发则清除定时器重新计时
            timer && clearTimeout(timer);
            timer = setTimeout(cb, delay);
        }
    }
    document.getElementById('container').onmousemove = debounce(handle, 1000)
    function handle() {
        console.log("1122");
    }

### 16. requestAnimationFrame实现setInterval
实现原理: 定义一个mySetInterval接收两个参数,回调函数callback和时间间隔interval.定义一个loop函数,实现每次在浏览器下次重绘之前调用.loop函数里判断endTime与 startTime的差值大于interval的时候,执行callback函数,并重置startTime.从而实现setTinerval的效果.

    function mySetInterval(callback, interval) {
        let timer = null
        let startTime = +new Date();
        const loop = () => {
            let endTime = +new Date();
            timer = window.requestAnimationFrame(loop);
            if(endTime - startTime >= interval) {
                startTime = +new Date();
                callback(timer);
            }
        }
        loop();
        return timer;
    }
    let a = 0;
    mySetInterval((timer) => {
        a++;
        console.log(a);
        if(a >= 10) {
            window.cancelAnimationFrame(timer) 
        }
    }, 1000);

### 17. 实现JSON.parse

    var json = '{"name":"cxk", "age":25}';
    var obj = eval("(" + json + ")");

具体的实现看这个: [半小时实现一个 JSON 解析器](https://zhuanlan.zhihu.com/p/28049617)

### 18. Promise
Promise的实现原理几句话很难说清楚,这里分享一个地址, [史上最易读懂的 Promise/A+ 完全实现](https://zhuanlan.zhihu.com/p/21834559)

    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'
    function MyPromise(fn) {
        const that = this;
        that.state = PENDING;
        that.value = null;
        that.resolvedCallbacks = []
        that.rejectedCallbacks = []
        function resolve(value) {
            if(value instanceof MyPromise) {
                return value.then(resolve, reject)
            }
            setTimeout(() => {
                if(that.state === PENDING) {
                    that.state = RESOLVED;
                    that.value = value;
                    that.resolvedCallbacks.map(cb => cb(that.value));
                }
            }, 0);
        }
        function reject(value) {
            setTimeout(() => {
                if(that.state === PENDING) {
                    that.state = REJECTED;
                    that.value = value;
                    that.rejectedCallbacks.map(cb => cb(that.value));
                } 
            }, 0);
        }
        try {
            fn(resolve, reject);
        } catch(err) {
            console.log(err);
        }
    }
    MyPromise.prototype.then = function(onFullfilled, onRejected) {
        const that = this;
        onFullfilled = typeof onFullfilled === 'function' ?
                        onFullfilled : v => v;
        onRejected = typeof onRejected === 'function' ?
        onRejected : err => { throw new Error(err);};
        if(that.state === PENDING) {
            return (promise2 = new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        const x = onFullfilled(that.value);
                        resolutionProcedure(promise2, x, resolve, reject)
                    } catch(err) {
                        reject(err);
                    }
                })
            }))
        }
        if(that.state === RESOLVED) {
            onFullfilled(that.value);
        }
        if(that.state === REJECTED) {
            onRejected(that.value);
        }
    }
    // 实现兼容多种promise的resolutionProcedure 函数
    function resolutionProcedure (promise, x, resolve, reject) {
        // 发生循环引用则抛出错误
        if(promise === x) {
            return reject(new TypeError('error'))
        }
        // 判断x的类型
        if(x instanceof MyPromise) {
            x.then(function(value) {
                resolutionProcedure(promise, x, resolve, reject);
            }, reject);
        }
        let called = false;
        if(x !== null && (typeof x === 'object' || typeof x ==='function')) {
            try {
                let then = x.then
                if(typeof then === 'function') {
                    then.call(
                        x,
                        y => {
                            if(called) return;
                            called = true;
                            resolutionProcedure(promise, y, resolve, reject);
                        },
                        e => {
                            if(called) return;
                            called = true;
                            resolutionProcedure(promise, y, resolve, reject);
                        }
                    )
                } else {
                    resolve(x);
                }
            } catch(e) {
                if (called) return;
                called = true;
                reject(e);
            }
        } else {
            resolve(x);
        }
    }
    let p = new MyPromise((resolve, reject) => {
        resolve(1);
    });
    p.then(function(value) {
        console.log(value);    // 1
    });


### 19. Promise.all
实现原理: 把传入的可迭代对象转换成数组,然后遍历数组执行传入的Promise对象,创建一个result数组,将resolveed的Promise对象添加到数组中,判断数组长度等于传入的Promise对象的个数,则表明所有Prmise对象完成,遍历过程中如果有Promise对象rejected,则reect并返回.

    Promise.myAll = function(promises) {
        return new Promise((resolve, reject) => {
            let promiseArray = Array.from(promises);
            let len = promiseArray.length;
            let result = [];
            promiseArray.forEach((promise, index) => {
                Promise.resolve(promise).then(function(value) {
                   result.push(value);
                   if(index === len - 1) {
                       resolve(result);
                   }
                },
                (err) => {
                    reject(err);
                })
            })
        }).catch((err)=> {
            console.log(err);
        })
    }
    var p1 = Promise.resolve(3);
    var p2 = 1337;
    var p3 = new Promise((resolve, reject) => {
      setTimeout(resolve, 100, 'foo');
    }); 
    Promise.myAll([p1, p2, p3]).then(values => { 
      console.log(values); // [3, 1337, "foo"] 
    });
    
### 20. 实现一个简单的双向绑定
主要原理: 给input绑定change事件,当数据发生变化的时候,通知依赖该数据的地方更新.

    const input = document.getElementById('input');
    const span = document.getElementById('span')
    let obj = {};
    input.onchange = function inputChange(e) {
        obj.text = e.target.value
    }
    Object.defineProperty(obj, 'text', {
        configurable: true,
        enumerable: true,
        get() {
            return obj.text;
        },
        set(newVal) {
            span.innerText = newVal
        }
    })


