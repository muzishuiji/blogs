// const compose = (...fns) => (initialValue) => fns.reduceRight((val, fn) => fn(val), initialValue);

function compose(middlewares) {
    return () => {
        return dispatch(0);
        // 借助函数声明的变量提升访问dispatch
        function dispatch(i) {
            let func = middlewares[i];
            if(!func) {
                return Promise.resolve();
            }
            return Promise.resolve(func(() => dispatch(i+1)))
        }
    }
}

async function fn1(next) {
    console.log('fn1 begin');
    await next();
    console.log('fn1 end');
}
async function fn2(next) {
    console.log('fn2 begin');
    await delay();
    await next();
    console.log('fn2 end');
}
async function fn3(next) {
    console.log('fn3 called');
}

function delay(wait = 2000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('done');
        }, wait);
    })
}
let middlewares = [fn1, fn2, fn3];
let finalFun = compose(middlewares)
finalFun().then(res => {
    console.log('middlewares called done')
})