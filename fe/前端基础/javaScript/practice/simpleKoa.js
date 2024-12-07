class MyKoa {
    constructor() {
        // 存放中间件
        this.middlewares = [];
    }

    listen(...args) {
        // 创建原生服务
        const server = http.createServer(async (req, res) => {
            // 创建上下文
            let ctx = createContext(req, res);
            // 合成函数，形成洋葱圈
            const fn = this.compose(this.middlewares)
            await fn(ctx);
            // 处理response
            res.end(ctx.body);
        })
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    // 构建上下文，把res和req都挂载到ctx之上，并且在ctx.req和ctx.request.req同时保存
    createContext(req, res) {
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.request = Object.create(response);
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }

    compose(middlewares) {
        return function (ctx) {
            return dispatch(0);
            function dispatch(i) {
                let func = middlewares[i];
                if(!func) {
                    return Promise.resolve();
                }
                return Promise.resolve(func(ctx, function next() {
                    return dispatch(i+1)
                }));
            }
        }
    }
}

// bodyParser 中间件
// const middleware = async () {
//     await new Promise((resolve, reject) => {
//         req.on('data', () => {

//         });
//         req.on('end', () => {

//         });
//     })
//     await next();
// }