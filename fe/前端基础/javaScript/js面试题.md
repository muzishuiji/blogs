1. 自执行函数实现块级作用域

```js
(function() {
    for(var i = 0; i < 5; i++) {
        console.log(i); // 0 1 2 3 4
    }
})();

console.log(i) // Uncaught ReferenceError: i is not defined
```
2. var 和 let/const的区别

    - var声明的变量会挂在window上，而let和const不会；
    - var声明的变量存在变量提升(提升的只是变量的声明)，而let和const不会；
    - let和const声明形成块级作用域，只能在块级作用域里访问，不能跨块访问，也不能跨函数访问；
    - 同一作用于域下，let和const不能声明同名变量，而var可以；
    - 暂时性死区，let和const声明的变量不能在声明前使用；

3. ES5实现const
```js
function _const(key, value) {
    Object.defineProperty(window, key, {
        value,
        writable: false
    })
}
_const('obj', { a: 1})
obj.b = 1; // 可以正常赋值
obj = {}; // 不报错，但是赋值失败

```

4. 手写call

call使用一个指定的this值和单独给出的一个或多个参数来调用一个函数。
```js
Function.prototype.myCall = function(thisArg, ...args) {
    // this指向调用call的对象，即我们要改变的this指向的函数
    thisArg.fn = this;
    // 执行函数并return其执行结果
    return thisArg.fn(...args)
}
```
进一步优化：
```js
Function.prototype.myCall = function(thisArg, ...args) {
    // 声明一个独有的Symbol属性，防止fn覆盖已有属性
    const fn = Symbol('fn');
    // 若没有传入this，默认绑定window对象
    thisArg = thisArg || window;
    // this指向调用call的对象，即我们要改变的this指向的函数
    // 将函数赋值给thisArg的属性
    thisArg[fn] = this;
    // 执行函数并return其执行结果
    const res = thisArg[fn](...args)
    delete thisArg[fn]
    return res;
}
// 
function foo() {
    console.log(this.name)
}
const obj = {
    name: 'muzishuiji'
}
foo.myCall(obj)
```


5. 手写apply
apply方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。
```js
Function.prototype.myApply = function(thisArg, args) {
    // this指向调用call的对象，即我们要改变的this指向的函数
    thisArg.fn = this;
    // 执行函数并return其执行结果
    return thisArg.fn(...args)
}
```
进一步优化：
```js
Function.prototype.myApply = function(thisArg, args) {
    // 声明一个独有的Symbol属性，防止fn覆盖已有属性
    const fn = Symbol('fn');
    // 若没有传入this，默认绑定window对象
    thisArg = thisArg || window;
    // this指向调用call的对象，即我们要改变的this指向的函数
    // 将函数赋值给thisArg的属性
    thisArg[fn] = this;
    // 执行函数并return其执行结果
    const res = thisArg[fn](...args)
    delete thisArg[fn]
    return res;
}
function foo() {
    console.log(this.name)
}
const obj = {
    name: 'muzishuiji'
}
foo.myApply(obj, [])
```

6. 手写bind
bind方法创建一个新的函数，在bind()方法被调用时，这个新函数的this被指定为bind()的第一个参数，而其余参数作为新函数的刹那火速，提供调用时使用。
```js
Function.prototype.myBind = function (thisArg, ...args) {
    let self = this;
    var _fun = function () {
        // new调用该函数
        return self.apply(this instanceof self ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)) )
    }
    // 继承原型上的属性和方法
    _fun.prototype = this.prototype;
    return _fun;
}
let obj = {
    name: "muzishuiji"
}
function foo() {
    console.log(this.name)
    console.log(arguments)
}
const aa = foo.myBind(obj, 'a', 'b', 'c')  // 输出 muzishuiji
aa(); // 输出 muzishuiji a b c
```

7. 手写防抖
```js
function myDebounce(fn, wait) {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        if(timer) clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, wait)
    }
}
```
8. 手写节流
```js
function myThrottle(fn, wait) {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        if(!timer) {
            timer = setTimeout(function () {
                clearTimeout(timer)
                fn.apply(context, args);
            }, wait)
        }

    }
}
```

9. 数组扁平化

    1. flat()
    ```js
    const arr = [1, [1,2], [1,2,3]]
    arr.flat(Infinity)  // [1, 1, 2, 1, 2, 3]
    ```
    2. 序列化后正则
    ```js
    const arr = [1, [1,2], [1,2,3]]
    const arr = `[${JSON.stringify(arr).replace(/\[|\]/g, '')}]`
    JSON.parse(arr) // // [1, 1, 2, 1, 2, 3]
    ```
    3. 使用递归实现
    ```js
    const arr = [1, [1,2], [1,2,3]];
    function flat(_arr) {
        return _arr.reduce((pre, cur) => pre.concat(cur instanceof Array ? flat(cur) : cur), [])
    }
    flat(arr) // // [1, 1, 2, 1, 2, 3]
    ```

10. js面向对象

    原型链的核心有三点：
    1. 每个对象都有__proto__属性，该属性指向其原型对象，在调用实例的方法和属性时，如果在实例上找不到，就会往原型对象上找。
    2. 构造函数的prototype属性也指向实例的原型对象；
    3. 原型对象的constructor属性指向构造函数；

![alt text](imgs/JS面向对象.png)

11. 模拟实现new

实现逻辑梳理：
- 定义一个对象，让该对象的原型指向传入函数的原型；
- 绑定传入的函数执行时的this为创建的对象；
- 返回一个对象，函数原本有返回则返回函数原来的，没有则返回创建的这个对象；

```js
function New(fn) {
    let obj = {};
    let args = Array.prototype.slice.call(arguments, 1);
    obj.__proto__ = fn.prototype;
    let result = fn.apply(obj, args);
    return result instanceof Object ? result : obj;
}

const pp1 = New(Person1, "pp1", 18, "famle")
const pp2 = New(Person1, "pp2", 28, "male")
console.log(pp1.__proto__ === pp2.__proto__) // true
console.log(pp1.__proto__ === Person.prototype) // true
```

12. js继承


13. V8如何执行一段js代码
    1. 预解析：检查语法错误但不生成AST；
    2. 生成AST：经过词法/语法分析，生成抽象语法树；
    3. 生成字节码：基线（Ignition）编译器将AST转换为字节码；
    4. 生成机器码：优化编译器（Turbofan）将字节码转换成优化过的机器码，此外在逐行执行字节码的过程中，如果一段代码经常被执行，那么V8会将这段代码直接转换成机器码保存起来，下一次就可以直接使用，优化了加载速度。

