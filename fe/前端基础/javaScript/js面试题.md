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
```js
Function.property.myCall = functi
```

5. 手写apply

6. 手写bind

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

![](https://user-gold-cdn.xitu.io/2019/12/8/16ee485fbbbc8c4c?w=367&h=201&f=gif&s=19746)