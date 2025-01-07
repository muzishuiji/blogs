async/await 是javascript中用于简化异步代码的语法糖，其底层基于Promise 和 Generator。

async/await 的底层原理

async/await的底层实现依赖于Promise和生成器（Generator）。

async函数的本质：
- async函数会隐式返回一个promise；
- 如果函数返回值不是一个promise，则会被自动包装成一个promise；

```js
async function foo() {
    return 42;
}
// 等价于
function foo() {
    return Promise.resolve(42);
}
```
- await会暂停async函数的执行，等到promise的完成；
- 如果await的值不是promise，它会被转换为一个promise
```js
async function bar() {
    const result = await somePromise;
    console.log(result);
}
// 等价于
async function bar() {
    return somePromise().then((result) => {
        console.log(result);
    })
}
```

async/await的实现原理：

async/await的实现可以看作是对生成器（Generator）和Promise的封装。

- 生成器（Generator）

生成器可以暂停和恢复执行的函数，使用function&定义，通过yield暂停执行。

async/await的模拟实现

async/await可以看作是对生成器的自动执行，结合promise实现异步操作。

```js
function asyncGenerator(generatorFunc) {
    return function(...args) {
        const generator = generatorFunc(...args);
        function handle(result) {
            if(result.done) return Promise.resolve(result.value);
            return Promise.resolve(result.value).then((res) => handle(generator.next(res)))
            .catch(err => handle(generator.throw(err)));
        }
        return handle(generator.next());
    }
}
// 使用模拟的 async/await
const fetchData = asyncGenerator(function* () {
    const response = yield fetch('https://api.example.com/data');
    const data = yield response.json();
    return data;
});

fetchData().then((data) => console.log(data));
```


async/await 的执行流程

1. async函数调用：

  - 调用async函数时，会立即返回一个Promise；
  - 函数体开始执行，直到遇到await；
2. await暂停执行：
  - 当遇到await时，async 函数会暂停执行，并将控制权交给调用者；
  - await后面的表达式会被转成promise（如果不是promise）；
3. Promise完成

  - 当await的promise完成时，async函数会恢复执行；
  - 如果Promise被拒绝，async函数会抛出异常；
4. 返回结果
  - async函数最终会返回一个promise；

