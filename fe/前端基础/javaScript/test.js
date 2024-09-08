// 对于context, react包仅仅会做如下定义:
function createContext(defaultValue) {
  let context = {
    _currentValue: defaultValue,
    Provider: null,
    Consumer: null
  }
  context.Provider = {
    $$typeof: Symbol.for('react.provider'),
    _context: context
  }
  context.Consumer = {
    $$typeof: Symbol.for('create.context'),
    _context: context
  }
  return context;
}
/**
* 每个平台对UI更新逻辑的实现,封装在updater函数里,所以不同平台代码会为
组件添加各自的updater函数实现,但是他们用的是同一套虚拟dom节点
*/
// inside React DOM
const inst = new YourComponent()
inst.props = props;
inst.updater = ReactDOMUpdater;

// inside React DOM Server
const inst = new YourComponent()
inst.props = props;
inst.updater = ReactDOMServerUpdater

// inside React Native
const inst = new YourComponent()
inst.props = props
inst.updater = ReactNativeUpdater

// 这些updater函数是由react之外的第三方包定义,但是由react的setState来负责调用
setState(partialState, callback) {
  // 更新dom
  this.updater.enqueueSetState(this, partialState, callback)
}
// 以上的关系可以这样描述
// react -> setState -> updater -> react-dom
// hooks的原理与setState类似,当调用useState与useEffect时,其内部调用如下:
const React = {
  __currentDispatcher: null,
  useState(initialState) {
    return React.__currentDispatcher.useState(initialState)
  },
  useEffect(initialState) {
    return React.__currentDispatcher.useEffect(initialState)
  }
}
// ReactDOM提供了__currentDispatcher
const preDispatcher = React.__currentDispatcher;
React.__currentDispatcher = ReactDOMdispatcher;
let result;
try {
   result = YourComponent(props)
} finally {
  React.__currentDispatcher = preDispatcher
}
// react与react-dom之间传递了dispatch,虽然你看不到,但这个dispatch必须对应到唯一的react实例
// 这就是为什么hooks不允许同时加载多个react实例的原因
// 和updater一样,dispatch也可以被各平台实现重写,比如react-debug-hooks就重写了dispatcher
// reconciler调节器
function foo() {
  console.log(this.a)
}
var c = {a: '1144'}
var b = foo.bind(c)
b()

function foo() {
  console.log(this.a)
}
var a = 2
foo()         // 隐式绑定，this指向window
var obj = {
  a: 2,
  foo: foo
}
obj.foo()  // 隐式绑定，this指向obj

function Fn() {
  this.user = '追梦子'
}
var a = new Fn()
var b = new Fn()
console.log(a === b)

function foo() {
  console.log(this.a)
}
var b = {
  a: 'muzi'
}
foo.call(b);    // 'muzi'
var c = {
  a: 'shuiji'
}
foo.call(c);    // 'shuiji'
var d = {
  a: '1234'
}
foo.bind(d)();   // '1234'
function Fn() {
  this.a = 'self'
  console.log(this.a)
}
var f1 = new Fn(b);  // 'self'

function a() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
a()()()   // window
var c = {
  a: 'shuiji'
}
a.call(c)()();   //   shuiji


function fun3() {
  console.log('fun3')
}
function fun2() {
  fun3();
}
function fun1() {
  fun2();
}
fun1();


var value = 1;
function foo() {
    console.log(value);
}
function bar() {
    var value = 2;
    foo();
}
bar();
// 结果是 ???


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope(); // ???


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();  // ???


var foo = function () {
  console.log('foo1');
}

foo();  // foo1

var foo = function () {
  console.log('foo2');
}

foo(); // foo2


function foo() {
  console.log('foo1');
}

foo();  // foo2

function foo() {
  console.log('foo2');
}

foo(); // foo2


function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};
  b = 3;
}

foo(1);

function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(1);




function foo() {
  console.log(a);
  a = 1;
}
foo(); // ???

function bar() {
  a = 1;
  console.log(a);
}
bar(); // ???


function foo() {
  function bar() {
    // ...
  }
}


foo.[[scope]] = [
  GlobalContext.VO
]
bar.[[scope]] = [
  FooContext.AO,
  GlobalContext.VO
]

foo.ScopeChain = [FooContext.AO].concat(foo.[[scope]])
bar.ScopeChain = [BarContext.AO].concat(bar.[[scope]])

var scope = "global scope";
function checkscope(){
    var scope2 = 'v';
    return scope2;
}
checkscope();


Promise.myAll = function(args) {
  if(!Array.isArray(args)) {
    return new ReferenceError('输入参数必须是数组')
  }
  return new Promise((resolve, reject) => {
    let res = [], len = args.length
    for(let i = 0; i < len; i++) {
      Promise.resolve(args[i]).then((value) => {
        res.push(value);
        if(res.length === len) {
          resolve(res)
        }
      })
    }
  })
}

let a = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('aaa')
  }, 0);
})
let b = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('bbb')
  }, 0);
})

let c = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ccc')
  }, 0);
})

let d = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('ddd');
  }, 0);
})

// Promise.myAll([a,b,c]).then((res) => {
//   console.log(res)
// })

Promise.myAll([a,b,d]).then((res) => {
  console.log(res)
})


Promise.myRace = function(args) {
  if(!Array.isArray(args)) {
    return new ReferenceError('输入参数必须是数组')
  }
  return new Promise((resolve, reject) => {
    let len = args.length
    for(let i = 0; i < len; i++) {
      Promise.resolve(args[i]).then((value) => {
        resolve(value);
      }, (err)=>reject(err))
    }
  })
}

let a = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('aaa')
  }, 3000);
})
let b = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('bbb')
  }, 2000);
})

let c = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ccc')
  }, 1000);
})

let d = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('ddd');
  }, 0);
})

Promise.myRace([a,b,c]).then((res) => {
  console.log(res, 'success')
})

Promise.myRace([a,b,d]).then((res) => {
  console.log(res, 'error')
})


// generator的应用场景，主要用于异步流程控制。

// 实现一个简单的 async/await
function getNum(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num + 1)
    }, 1000)
  })
}

function asyncFunc(func) {
  let gen = func();
  function next(data) {
    let res = gen.next(data);
    if(res.done) return res.value;
    res.value.then((data) => {
      // 主动递归遍历迭代器
      next(data);
    })
  }
  next();
}

const func = function* () {
  let f1 = yield getNum(1);
  let f2 = yield getNum(f1);
  console.log(f2)
}
asyncFunc(func)



function getNum(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num + 1);
    }, 1000);
  })
}
function asyncFun(func) {
  let gen = func();
  function next(data) {
    let res = gen.next(data);
    if(res.done) return res.value;
    res.value.then((_data) => {
      next(_data);
    })
  }
  next()
}

let func = function* () {
  let f1 = yield getNum(1);
  let f2 = yield getNum(f1);
  console.log(f2);
}
asyncFun(func)

// 用Symbol定义Symbol类型的数据，然后用Symbol.keyFor从全局的注册表中取得设置的Symbol。
// 使用场景：
// * 保持唯一性
// * 定义私有变量，因为别人拿不到key值对应的Symbol变量

Math.random() + n

// 设置文本可编辑 contenteditable = true
// componentDidMount（组件挂载）， componentWillUnmount（组件卸载之前）


// jsbridge的实现
window.JSBridge = {
  // 调用native
  invoke: function (msg) {
    // 判断环境，获取不同的nativeBridge
    nativeBridge.postMessage(msg)
  },
  receiveMessage: function(msg) {
    // 处理msg
  }
}

function flatArray(arr) {
  if(!Array.isArray(arr)) return [];
  return arr.reduce((pre, cur) => Array.isArray(cur) ? pre.concat(flatArray(cur)) : pre.concat(cur || []), [])
}

// cache-control 为 no-cache的时候验证协商缓存，
// no-cache是必须重新验证，max-age=0是应该重新验证，实际情况以浏览器的实现为准，大部分情况他们的行为是一致的，

// last-modified，负载均衡的服务器，每个服务器生成的 last-modified可能不同。
// etag类似于文件指纹，是文件的一个唯一标识序列，当资源有变化时，etag就会重新生成。

// very: Accept-Encoding;告知浏览器，这个资源，需要缓存两个版本： 压缩与未压缩的资源

const MODULE_TYPES = {
  JS: 1 << 0,
  CSS: 1 << 1,
  JSON: 1 << 2
};
function getModuleType(modulePath) {
  const moduleExt = extname(modulePath);
  if(JS_EXTS.some(ext => moduleExt)) {
    return MODULE_TYPES.JS;
  } else if(CSS_EXTS.some(ext => moduleExt)) {
    return MODULE_TYPES.CSS;
  } else if(JSON_EXTS.some(ext => moduleExt)){
    return MODULE_TYPES.JSON;
  }
}

function traverseModule(curModulePath, callback) {
  curModulePath = completeModulePath(curModulePath);
  const moduleType = getModuleType(curModulePath);
  if(moduleType && MODULE_TYPES.JS) {
    traverseModule(curModulePath, callback);
  } else if(moduleType && MODULE_TYPES.CSS) {
    traverseModule(curModulePath, callback);
  }
}

//读取文件内容
// 使用后缀名，.jsx, .tsx等来决定是否启用typescript，jsx的parse插件
// 使用babel parser把代码转成AST
// 使用babel traverse对AST进行遍历, 做类型检查，lint
// 处理importDeclaration和callExpression的AST，从中提取依赖路径
// 对依赖路径进行处理，变成真实路径之后，继续遍历该路径的模块
// 模块依赖是一个图，递归遍历时需要注意循环引用的问题。

function traverseJsModule(curModulePath, callback) {
  const moduleFileContent = fs.readFileSync(curModulePath, {
    encoding: 'utf-8'
  });

  const ast = parser.parse(moduleFileContent, {
    sourceType: 'unambiguous',
    plugins: resolveBabelSyntaxtPlugins(curModulePath)
  });

  traverse(ast, {
    ImportDeclaration(path) {
      const subModulePath = moduleResolver(curModulePath, path.get('source.value').node);
      if(!subModulePath) {
        return;
      }
      callback && callback(subModulePath);
      traverseModule(subModulePath, callback);
    },
    CallExpression(path) {
      if(path.get('callee').toString() === 'require') {
        const subModulePath = moduleResolver(curModulePath, path.get('arguments.0').toString());
        if(!subModulePath) {
          return;
        }
        callback && callback(subModulePath);
        traverseModule(subModulePath, callback);
      }
    }
  })
}


function traverseCssModule(curModulePath, callback) {
  const moduleFileContent = fs.readFileSync(curModulePath, {
    encoding: 'utf-8'
  });
  const ast = postcss.parse(moduleFileConent, {
    syntaxt: resolvePostcssSyntaxPlugin(curModulePath)
  });
  ast.walkAtRules('import', rule => {
    const subModulePath = moduleResolver(curModulePath, rule.params.replace(/['"]/g, ''));
    if(!subModulePath) {
      return;
    }
    callback && callback(subModulePath);
    traverseModule(subModulePath, callback);
  });

  ast.walkDecls(decl => {
    if(decl.value.includes('url(')) {

    }
  })

}

// code spliting，代码分割，意味着构建打包时，能够将静态资源拆分，因此在页面加载时，实现最合理的按需加载策略。
// 主要可以帮你把动态加载的模块拆分成独立的chunk，然后用到的时候动态加载对应的chunk
// hashing，即对打包资源进行版本信息映射，这个的关键技术点是最合理的利用缓存机制，我们知道有效的缓存将直接影响
// 页面加载表现，决定用户体验。那么对于前端工程化来说，实现更合理的hash机制，工具就需要分析各种打包资源
// 导出模块间依赖关系，依据依赖关系上下文决定出包的哈希值。因为一个资源的变动，将会引起其依赖下游的关联资源变动
// 因此工程工具进行打包的前提是对各个模块依赖关系进行分析，并根据依赖关系，支持开发者自定义哈希策略
// output module formats，工程输出的模块化方式也需要更加灵活，比如开发者可配置esm，commonjs等规范的构建导出内容
// 可以设置导出的内容遵循的模块规范
// transformations，前端工程化离不开编译，转义过程，比如对JavaScript代码的压缩，对无用嗲吗的删除等。这里需要在工程化视觉上注意的是
// 我们在设计构建工具时，对于类似jsx的编译，vue文件的编译，不会内置到工具当中，而是利用babel等社区能力，无缝融合到工程化流程里
// 如果使用了第三方npm包，但是第三方npm包又没有使用babel转译ES6的相关语法，就会导致一些兼容性问题
transpileDependencies: [
  'module-name/library-name', // 出问题的库
]
// plugin-transform-runtime会根据sourceType选择注入import或者require，sourceType的默认值是module
// 就会默认注入import。webpack不会处理包含import/export的文件中的module.exports导出，所以需要让babel自行判断sourceType
// 根据文件内是否存在 import/export 来决定注入什么样的代码
// babel设置了sourceType属性，sourceType：unambiguous 表示babel会根据上下文文件， 比如是否包含export和import，来决定是否按照ESm语法处理文件
// 并不是所有的esm模块都含有import/export，所以即便某个编译文件属于esm模块，可能会被babel错误的判断为commonjs模块而引发误判。
// 全局使用这个属性可能会导致不可控的问题，我们可以单独对某个第三方库使用 sourceType：unambiguous
module.exports = {

  overrides: [
    {
      include: './node_modules/module-name/library-name/name.common.js',
      sourceType: 'unambiguous'
    }
  ]
}


// 关于工程化的思考： 
// 1. 作为公共库，我应该如何构建编译代码，让业务方有保障的使用
// 2. 作为使用者，我该如何处理第三方公共库，是否还需要对齐进行额外编译和处理，先看这个第三方库有没有使用babel编译
// 如果组件的高度不一致，则可以采用如下方案：
// 1. 对组件属性itemSize进行扩展，支持传递类型为数字，数组，函数（这需要预先知道列表项的高度）
// 2. 将列表渲染到屏幕外，对其高度进行测量并缓存，然后再将其渲染至可视区域内。如果预渲染到屏幕外，
// 再渲染至屏幕内，这导致渲染成本增加已被，这对于数百万用户在低端移动设备上使用的产品来说不切实际
// 3. 以预估高度先行渲染，然后获取真是高度并缓存。
this.positions = [
  {
    top: 0,
    bottom: 10,
    height: 100
  }
]
initPositions() {
  this.positions = this.listData.map((item, index) => {
    return {
      index,
      height: this.estimatedItemSize,
      top: index * this.estimatedItemSize,
      bottom: (index + 1) * this.estimatedItemSize
    }
  })
}

updated() {
  let nodes = this.$refs.items;
  nodes.forEach((node) => {
    let rect = node.getBoundingClientRect();
    let height = rect.height;
    let index = +node.id.slice(1);
    let oldHeight = this.positions[index].height;
    let dValue = oldHeight - height;
    // 存在差值
    if(dValue) {
      this.positions[index].bottom = this.positions[index].bottom - dValue;
      this.positions[index].height = height;
      for(let k = index + 1; k < this.positions.length; k++) {
        this.positions[k].top = this.positions[k-1].bottom;
        this.positions[k].bottom = this.positions[k].bottom - dValue;
      }
    }
  })
}

// websocket的出现也是为了解决双向，快速，即时通讯的问题。
// websocket握手阶段采用http协议，因此握手时不容易屏蔽，
// 数据比较轻量，性能开销小，通信高效
// 可以发送文本，也可以发送二进制数据，没有同源限制
// 状态： 0，正在连接，1，已连接，可通信，2，正在关闭，3，已关闭。
// 钩子函数， onopen， onclose， onmessage（接收消息的回调），send（发送数据），onerror（连接或发送消息出错的回调）
// websocket是一个持久化的协议
// 创建websocket连接的过程：
//  首先进行http握手，发送一些自定义请求头： `Connect: Upgrade;Upgrade: websocket;Sec-Websocket-key:;Sec-Websocket-Version`
// 标记我要发送的是websocket请求，请升级协议，对应的版本号是，我的标记key是，服务端会返回101的状态码，并且会在响应头里做一些匹配设置
// Connection:Upgrade;Upgrade: webscoket;Sec-WebSocket-Accept: '',升级协议并返回自己的接收key
// Sec-WebSocket-Accept是经过服务器确认，并且加密后的 Sec-WebScoket-Key。
// 这种写一下，相当于订阅了服务端的信息，服务端有消息就会推送给你，你有消息就可以发送给服务端
// http约定了计算机之间通信需要遵循的规范，以及各种控制和错误处理方式。（规范和行为约定）
// 传输内容，传输方式和传输的规范（字段定义，取值等），以前的文本只是简单的字符，现在的文本已经扩展为图片，视频，压缩包等
// 报文的结构：起始行 + 头部 + 空行（是为了区分头部和实体） + 实体（请求报文对应请求体，响应报文对应响应体）
// http协议本身对get和post并没有字节限制，是浏览器和服务器对字节大小做了限制
// content-length： 数据的长度
// connect常用于客户端要求服务器使用tcp持久连接，以便其他请求复用连接。 connect： keep-alive； 长连接的一种简易实现
// content-encodeing：说明数据的压缩方法，表示服务器返回的数据使用了什么压缩格式，客户端则使用对应的方式解压资源。
// accept-encoding；客户端指定自己可以接收哪些压缩方式，方便服务器进行对应的压缩并返回。
// content-type 本次的数据是什么格式
// accept：数据格式（accept），压缩方式（accept-encoding），支持语言（accept-langiage）和字符集（accept-charset）
// transfer-encoding： chunked； 分段传输
// 使用断点续传需要加一个头部字段 accept-ranges，状态码206，断点续传如果发生越界，则返回416
// http1.1的长连接其实是管道传输
// https要建立一个连接，需要花费6次交互，先是建立三次握手， 然后是tsl/1.3的三次握手
// http和https的区别： 在tcp和http网络层之间增加了ssl/tls安全协议，实现了传输数据的加密，解决了http明文传输的问题
// http的连接建立是三次握手，而https在三次握手的基础上增加了ssl/tls的握手过程，有6次交互，才进入加密报文传输
// https需要向ca请求数字证书，验证服务的身份是可信赖的。
// 一般都是使用非对称加密传输密钥，然后使用对称加密进行数据传输。
// 将公钥放在数字证书中传递，只要证书是可信的，公钥就是可信的。证书有第三方权威机构（数字证书认证机构）颁发。
// 请求的缓存，url和参数的拼接作为key存在一个map对象里，如果调用相关的请求，则先查询map对象有没有对应的数据，如果有则返回，没有则发起请求。


// 实现一个函数来模拟请求
function request(url, suc, fail) {
  if(Math.random() * 10 > 2) {
    setTimeout(() => {
      console.log(url + '|' + 'suc');
      suc('success')
    }, 2000);
  } else {
    setTimeout(() => {
      console.log(url + '|' + 'fail');
      fail('fail')
    }, 3000);
  }
}

let urlObj = {}
function cacheRequest(url, subCb, failCb) {
  if(urlObj[url]) {
    if(urlObj[url].status === 'suc') {
      subCb(urlObj[url].data);
    } else {
      failCb(urlObj[url].data);
    }
  } else {
    urlObj[url] ={
      data: '',
      status: ''
    };
    request(url, data => {
      urlObj[url].data = data;
      urlObj[url].status = 'suc';
      subCb(data)
    },
    err => {
      urlObj[url].data = err;
      urlObj[url].status = 'fail';
      failCb(err)
    }
    )
  }
} 


cacheRequest('1.com', data => {
  console.log(data)
}, err => {
  console.log(err);
});

cacheRequest('1.com', data => {
  console.log(data)
}, err => {
  console.log(err);
});

cacheRequest('1.com', data => {
  console.log(data)
}, err => {
  console.log(err);
});

cacheRequest('2.com', data => {
  console.log(data)
}, err => {
  console.log(err);
});

cacheRequest('2.com', data => {
  console.log(data)
}, err => {
  console.log(err);
})


const quickSort = (nums) => {
  sort(nums, 0, arr.length - 1);
  return nums
}
const sort = (nums, lo, hi) => {
  if(lo > hi) {
    return;
  }
  let p = partition(nums, lo, hi);
  sort(nums, lo, p-1);
  sort(nums, p + 1, hi);
}
const partition = (nums, lo, hi) => {
  let i=lo, j = hi;
  let privot = nums[i]
  while(i < j) {
    while(i<j&&nums[j] > privot) j--;
    if(i < j) nums[i] = nums[j];
    while(i<j&& nums[i] < privot) i++;
    if(i<j) nums[j] = nums[i];
  }
  nums[i] = privot;
  return i;
}
let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
quickSort(arr);