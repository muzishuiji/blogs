1. 合并资源比并行下载资源更快吗?

对于体积较大的资源,是否合并对于加载时间没有明显影响,但拆分资源可以更好地利用浏览器缓存,不会因为某个资源的更新导致所有资源缓存失效,而资源合并后,任一资源的更新都会导致整体资源的缓存失效.另外还可以利用域名分片技术,将资源拆分部署到不同域名下,即可以分散服务器的压力,又可以避免网络抖动带来的影响.

对于小资源,合并资源往往具有更快的加载速度,但在网络带宽状态良好的情况下,因为提升的时间单位以 ms 计量,收益可以忽略,如果网络延迟很大,服务器响应速度慢,则可以带来一定的收益,但是在高延迟的网络场景下,又要注意合并资源后可能带来的网络往返次数的增加,进而影响到请求时间.

2. promise 中 return 一个 error 对象并不会被 catch 捕获,而依然会正常的 resolve


        Promise.resolve()
            .then(() => {
                return new Error('error!!!')
            })
            .then((res) => {
                console.log('then: ', res)
            })
            .catch((err) => {
                console.log('catch: ', err)
            })
        return new Error('error!!!')
        // 等价于
        return Promise.resolve(new Error('error!!!'));

3. promise 返回的值不能是 promise 本身,否则会造成死循环.
4. 断开的 Promise 链


        // bad
        function anAsyncCall() {
            var promise = doSomethingAsync();
            promise.then(function() {
                somethingComplicated()
            })
            return promise;
        }
        // good
        function anAsyncCall() {
            var promise = doSomethingAsync();
            return promise.then(function() {
                somethingComplicated();
            })
        }

我们应该尽可能的保证函数返回后 promise 链不断开.

5. 红绿灯问题.

题目: 红灯三秒亮一次,绿灯一秒亮一次,黄灯两秒亮一次,如何让三个灯不断交替重复亮灯?

        function red() {
            console.log('red')
        }
        function green() {
            console.log('green')
        }
        function yellow() {
            console.log('yellow')
        }
        const light = (timmer, cb) => {
            return new Promise((resolve, reject) => {
                settimeout(() => {
                    cb()
                }, timmer)
            })
        }
        const step = () => {
            Promise.resolve().then(() => {
                return light(3000, red)
            }).then(() => {
                return light(2000, yellow)
            }).then(() => {
                return light(1000, green)
            }).then(() => {
                step();
            })
        }
        step();
