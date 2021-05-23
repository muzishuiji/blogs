//举例：formatAmount(2688) => "2,688.00"
//formatAmount("2e6") => "2,000,000.00"
//formatAmount(-2.33333333) => "-2.33"
//formatAmount("Alibaba") => "-"

function formatAmount(num) {
  if (typeof +num !== "number" || Number.isNaN(+num)) {
    return "-";
  }
  let low = (num + "").split(".")[1]
    ? (num + "").split(".")[1].substr(0, 2)
    : "00";
  let high = (+num + "").split(".")[0];
  if (high.length <= 3) {
    return high + "." + low;
  }
  let i = high.length,
    str = "";
  while (i >= 0) {
    if (i - 3 >= 0) {
      str = "," + high.substr(i - 3, i) + str;
    } else {
      str = "," + high.substr(0, i) + str;
    }
    i -= 3;
  }
  return str.substr(1) + "." + low;
}
formatAmount(2688);

function compareVersion(oldVersion, newVersion) {
  let oldVersionArr = oldVersion.split(".");
  let newVersionArr = newVersion.split(".");
  while (oldVersionArr.length) {
    let oldKey = oldVersionArr.shift();
    let newKey = newVersionArr.shift();
    if (+oldKey > +newKey) {
      return false;
    } else if (+oldKey === +newKey) {
      continue;
    } else {
      return true;
    }
    return false;
  }
}
compareVersion("1.0.2", "1.0.7");

Promise.race([p1, p2, p3]).then(value => {
  console.log(value);
});

var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("111");
  }, 200);
});
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("222");
  }, 500);
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("333");
  }, 800);
});

/**
 *  (err) => {
  console.log('rejected', err)
 }
 */

Promise.race([p1, p3, p2]).then(value => {
  console.log(value);
});

var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("111");
  }, 200);
})
  .then(() => {
    console.log("444");
  })
  .catch(err => {
    console.log(err);
  })
  .then(() => {
    console.log("555");
  });



  this.middleware = [];
  use(fn) {
    if(typeof fn !== 'function') {
      throw new TypeError('middleware must be a function');
    }
    if(isGeneratorFunction(fn)) {
      deprecate('Support for generators will be removed in v3. ' +
                'See the documentation for examples of how to convert old middleware ' +
                'https://github.com/koajs/koa/blob/master/docs/migration.md');
      fn = convert(fn);
    }
    debugger('use %s', fn._name || fn.name || '-');
    this.middleware.push(fn);
    return this;
  }

  use(fn) {
    this.middleware.push(fn);
  }

  // koa-compose组合中间件
  function compose(middleware) {
    return function (context, next) {
      let index = -1;
      return dispatch(0);

      function dispatch(i) {
        if(i <= index) return Promise.reject(new Error('next() called multiple times'));
        index = i;
        let fn = middleware[i];
        if(i === middleware.length) fn = next;
        if(!fn) return Promise.resolve();
        try {
          return Promise.resolve(fn(context, function next() {
            return dispatch(i + 1)
          }))
        } catch(err) {
          return Promise.resolve(err);
        }
      }
    }
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request)
    const response = context.response = Object.create(this.response)

    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;

    context.originalUrl = request.originalUrl = req.url;
    context.cookies = new Cookies(req, res, {
      keys: this.keys,
      secure: request.secure
    });
    request.ip = request.ips[0] || req.socket.remoteAddress || '';
    context.accept = request.accept = accepts(req);
    context.state = {}
    return context;
  }

  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleRequest = () => RTCIceTransportStateChangedEvent(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleRequest).catch(onerror);
  }

 // 最原始的模块化是
 // 最初是全局函数，缺点是引起命名冲突或数据不安全，而且模块成员之间看不出直接关系
 // 命名空间模式，简单对象封装，作用减少了全局变量，解决命名冲突，但是数据不安全，外部可以直接修改模块内部的数据
 // 暴露出所有模块成员，内部状态可以被外部改写
 // IIFE,数据是私有的，外部只能通过暴露的方法操作，将数据和行为封装到一个函数内部，通过window添加属性来向外暴露接口
 // 如果依赖另一个模块就需要将另一个模块也写进来，或者以参数的形式传递进去
 // 模块化的好处
 // * 避免命名冲突，减少命名空间污染
 // * 更好的分离，按需加载
 // * 更高复用性
 // * 高可维护性
 // iife这样的写法，多个模块之间的依赖关系不清晰，且模块以来过多会导致文件爱你过多，这两个问题都会导致后期很难维护
 // 可以将不想被tree shaking的内容配置在sideEffects里，以免被误删除

 // 
