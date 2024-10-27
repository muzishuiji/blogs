// 设计实现一个简单的中间件
// 同步中间件
const m1 = (req, res, next) => {
    console.log('m1 run');
    next();
}

const m2 = (req, res, next) => {
    console.log('m2 run');
    next();
}

const m3 = (req, res, next) => {
    console.log('m3 run');
    next();
}
// 中间件集合
const middlewares = [m1, m2, m3];

function useApp(req, res) {
    // 每次调用next都取出一个中间件执行
    let next = () => {
        const middleware = middlewares.shift();
        if(middleware) {
            middleware(req, res, next);
        }
    }
    next()
}

useApp();


// 异步中间件
const m1 = async (req, res, next) => {
    // something...
    console.log('m1 run')
    let result = await next();
    console.log('m1 run end')
}
const m2 = async (req, res, next) => {
    // something...
    console.log('m2 run')
    let result = await next();
    console.log('m2 run end')
}
const m3 = async (req, res, next) => {
    // something...
    console.log('m3 run')
    let result = await next();
    console.log('m3 run end')
}

let middlewares = [m1, m2, m3];
function useApp(req, res) {
    let next = () => {
        let middleware = middlewares.shift();
        if(middleware) {
            return Promise.resolve(middleware(req, res, next));
        } else {
            return Promise.resolve('end')
        }
    }
    next();
}

useApp()


const m1 = async (req, res, next) => {
    // something...
    console.log('m1 run')
    let result = await next();
    console.log('m1 run end')
}
const m2 = async (req, res, next) => {
    // something...
    console.log('m2 run')
    let result = await next();
    console.log('m2 run end')
}
const m3 = async (req, res, next) => {
    // something...
    console.log('m3 run')
    let result = await next();
    console.log('m3 run end')
}

let middlewares = [m1, m2, m3];
function useApp(req, res) {
    let next = () => {
        // shift是从前往后执行，pop是从后往前执行
        if(middlewares.length) {
            const middleware = middlewares.shift();
            middleware(req, res, next);
        }
    }
    next();
}
useApp()