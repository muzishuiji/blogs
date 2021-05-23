1. async/await

        function* helloWorldGenerator() {
            yield 'hello';
            yield 'world';
            yield 'ending'
        }
        var hw = helloWorldGenerator();
        hw.next()// { value: 'hello', done: false }
        hw.next()// { value: 'world', done: false }
        hw.next()// { value: 'ending', done: true }
        hw.next()// { value: undefined, done: true }

## Generator 函数暂停恢复执行原理

> 一个线程(或函数)执行到一般,可以暂停执行,将执行权交给另一个线程(或函数),等到稍后收回执行权的时候,再恢复执行,这种可以并行执行,交换执行权的线程(或函数),就称为协程.

> 协程是一种比线程更加轻量级的存在,普通线程是抢先式的,会争夺 cpu 资源,而协程是合作的,可以把协程看做是跑在线程上的任务,一个线程上可以存在多个协程,但是在线程上同时只能执行一个协程.

> 它的运行流程大致如下:

- 协程 A 开始执行
- 协程 A 执行到某个阶段,进入暂停,执行权转移到线程 B
- 线程 B 执行完成或暂停,将执行权交换给 A 或者又将执行权转交给另一个协程 C
- 协程 A 恢复执行.

协程遇到 yeild 命令就暂停,等到执行权返回,再从暂停的地方继续往后执行

通常我们将执行生成器的代码封装成一个函数,并把这个函数称为执行器,co 模块就是一个著名的执行器.

Generator 是一个异步操作的容器,它的自动执行需要一种机制,当异步操作有了结果,就能自动交回执行权.有两种方法可以做到这一点:

1. 回调函数,将异步操作包装成 Thunk 函数,在回调函数里交回执行权.
2. Promise 对象,将异步操作包装成 Promise 对象,用 then 方法交回执行权.

generator 只是一个函数生成器,我们需要一个执行器来控制整个流程的执行,下面是一个简单的执行器

    function run(gen) {
      var g = gen()
      // next函数控制下一阶段的执行
      function next(data) {
        var result = g.next(data)
        if(result.done) return result.value
        // 未执行结束,则通过then方法注册下一阶段的执行.
        result.value.then(function(data) {
          next(data)
        })
      }
      next()
    }
    // 使用的时候,我们可以这样
    function* foo() {
      let response1 = yield fetch('https://xxx')
      console.log(response1)
      let response2 = yield fetch('https://xxx')
      console.log(response2)
    }
    // 函数生成器需要一个策略控制next的执行,才会一步步执行下一步,
    // 知道返回数据的done是true,否则,
    run(foo)

从表面上看,async/await 就是将 generator 的\*号换成了 async, yield 替换成了 await

async 函数对 Generator 函数的改进,体现在以下四点:

- 内置执行器,generator 函数的执行必须依靠执行器,而 async 函数自带执行器,无需手动执行 next()方法

- 更好的语义: async 和 await,语义更清楚
- 更广的适用性: co 模块约定,yield 命令后面只能是 thunk 函数或 promise 对象或者原始类型.但还是 async 函数的 await 命令后面,非 Promise 对象的 async 会自动转成 Promise 对象.
- 返回值是 Promise, async 返回的是 Promise 对象,我们可以使用 then 方法进行链式调用.

Generator 返回的是迭代器对象(iterator)

    // 执行器,co 模块都被封装在了内部.
    async function fn(args) {
    // ...
    }
    // 等同于
    function fn(args) {
    return spawn(function\* {

      })
    }
    function spawn(genF) {
      return new Promise(function(resolve, reject) {
        const gen = genF()
        function step(nextF) {
          let next;
          try {
            next = nextF()
          } catch(e) {
            return reject(e)
          }
           if(next.done) {
          return reolve(next.value)
        }
        Promise.resolve(next,value).then(function(v) {
            step(function() { return gen.next(v) })
          }, function(e) {
            step(function() {
              return gen.throw(e)
            })
          })
        }
        step(function() { return gen.next(undefined)})
    }
