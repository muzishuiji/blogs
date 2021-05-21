# async/await 原理及简单实现

## Generator

Generator 是es6标准引入的新的数据类型。Generator可以理解为一个状态机，内部封装了很多状态，同时返回一个迭代器iterator对象。可以通过这个迭代器遍历相关的值及状态。

Generator的显著特点是可以多次返回，每次返回值作为迭代器的一部分保存下来，可以被我们显式调用。

普通的函数只能通过return 返回一次，而generator除了return，还可以使用yield返回多次

```javascript
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
const result = foo(0);
result.next();
result.next();
result.next();
```

Generator函数的实例，它具有状态指suspended，suspended代表暂停，closed则为结束，这个状态是无法捕获的，我们只能通过generator函数提供的方法来获取当前的状态。

在执行了next方法后，顺序执行了yield的返回值。返回值有value和done两个状态。value为返回值，可以是任意类型，done的状态为false或者true，true为执行完毕，在执行完毕后再次调用返回 `{value: undefined, done: true}`，注意在遇到return的时候，所有剩下的yield不再执行，直接返回`{value: undefined, done: true}`

**Generator 有三个方法， next/return/throw**

throw返回的是函数中try catch中catch的返回值，如果没有try catch，则直接抛出异常。throw之后generator的状态就会变成执行完毕，再次调用next就会返回 `{value: undefined, done: true}`

Generator函数的返回值是一个带状态的Generator函数实例，可以被for of调用，进行便利，且只可被for of调用，此时将返回他的所有状态，遍历时，后台会调用next方法，当done返回的done属性值为true时，循环推出，因此Generator函数的实例将被执行一遍，再次调用时，状态为已完成

**yield中返回的值是可以被变量存储和改变的，如果传值则作为下一个状态执行的结果，否则为上一步的计算结果**

**yield委托**

在Generator函数中，我们优势需要将多个迭代器的值合在一起，然后痛yield* 的形式来控制Generator函数的执行

```javascript
function* foo1() {
    yield 1;
    yield 2;
    return 'foo end';
}
function* foo2() {
    yield 3;
    yield 4;
}
function* foo() {
    yield* foo1();
    yield* foo2();
    yield 5;
}
const result = foo();
console.log(iterator.next());// "{ value: 1, done: false }"
console.log(iterator.next());// "{ value: 2, done: false }"
console.log(iterator.next());// "{ value: 3, done: false }"
console.log(iterator.next());// "{ value: 4, done: false }"
console.log(iterator.next());// "{ value: 5, done: false }"
console.log(iterator.next());// "{ value: undefined, done: true }"
```

foo在执行的时候，首先委托给foo1，foo1执行完毕，再委托给foo2，但是颞部的return在委托结束之前内部都是暂停的，等到表达式的结果的时候，将结果返回给foo，foo此时内部没有接收的变量，所以为打印，如果我们想要捕获这个值，可以使用yield *foo()的方式进行获取

## async/await

async/await 语法糖就是使用Generator + 自执行器来运作的。

```javascript
// 定义一个promise，用来模拟异步请求，作用是传入参数
function getNum(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num + 1)
        }, 1000)
    })
}
// 自动执行器，如果一个generator函数没有执行完，则递归调用
function asyncFunc(func) {
    var gen = func();

    function next(data) {
        var result = gen.next(data);
        if(result.done) return Promise.resolve(result.value);
        return Promise.resolve(result.value).then(function(data) {
            next(data)
        });
    }
    next(data);
}
var func = function* () {
    var f1 = yield getNum(1);
    var f2 = yield getNum(f1);
    console.log(f2);
}
asyncFunc(func).then((data) => {
    console.log(data, 'data========')
})


function runGenerator(generatorFn) {
    return function() {
        return new Promise((resolve, reject) => {
            let g = generatorFn.call(this, ..arguments);
            function walk(data) {
                let result = g.next(data);
                if(result.done) {
                    return Promise.resolve(result.value); 
                } else {
                    return Promise.resolve(result.value).then(function(data) {
                        next(data)
                    }); 
                }
            }
            walk()
        })
    }
}
```

babel在编译generator函数的时候主要的处理：

* 切割generator函数的yield代码

* 生成一个变量保存generator的执行状态

* 生成一个invoke方法，并绑定next方法，这个过程相当于创建了一个迭代器。