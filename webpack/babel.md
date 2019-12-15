# Babel

## Babel 简介

1. babel 的处理过程总共分为三个阶段， 解析，转换，生成。
2. babel 本身不具有任何转换功能，它把转换的功能都分解到一个个 plugin 里面，当我们不配置任何插件时，经过 babel 的代码输入和输出是相同的。
3. babel 的插件分为两种

- 语法插件

当我们添加语法插件之后,在解析这一步就使得 babel 能够解析更多的语法.(babel 内部的解析类叫做 babylon).`babel-plugin-syntax-trailing-function-commas`这个插件就是为了解决函数最后一个参数可以加逗号的语法插件.

- 转译插件

转译插件一般用于将我们的语法作进一步的转换并输出,这是 babel 最本质的需求. 比如完成箭头函数的转换的插件`babel-plugin-transform-es2015-arrow-functions`.

同一类语法可能同时存在语法插件版本和转译插件版本,如果我们使用了转译插件,就不用再使用语法插件了.

4. Preset 一套语法规范套餐合集.
5. Babel 的执行顺序

- Plugin 会运行在 Preset 之前
- Plugin 会从前到后顺序执行
- Preset 的顺序则刚好相反

5. 一个 Preset 的配置实例


    "presets": [
      // 带有自定义配置项的,需要转换成数组
      [
        // 第一个是名字
        "env",
        // 第二个元素是对象.列出配置项
        {
          // 该参数项可以配置以特定的模块化格式来输出代码,如果配置成false则不进行模块化处理
          "module": false
        }
      ],
      "stage-2"
    ]

6. 如果不写任何配置项,env 等价于 latest,也等价于 es2015+es2016+es2017 三个相加.
7. babel-cli 让我们可以使用 babel 命令来编译文件.
8. babel-node 是 babel-cli 的一部分,不需要单独安装.bable-node = babel-polyfill+ babel-register.
9. babel-require 会对 require 命令引入的文件进行转码.
10. babel-polyfill

babel 默认只转换 js 语法,而不转换新的 API,比如 iterator, generator,set,map,proxy,reflect,symbol,promise 等全局对象,babel-polyfill 内部集成了 core-js 和 regenerator.

缺点:

- 使用<pre>babel-polyfill</pre>会导致打出来的包非常大,因为 babel-polyfill 是一个整体,把所有的方法都加到原型链上比如我们只是用了 Array.from,但它把 Object.defineProperty 也给加上了,这个问题可以通过单独使用 core-js 的某个类库来解决.

- babel-polyfill 会污染全局变量,给很多类的原型上都做了修改,如果我们开发的是一个类库供给其它开发者使用,这种情况会变得非常不可控.

11. babel-runtime 这里主要是存放一些兼容方法的合集.

12. babel-plugin-transform-runtime 这里是为了不再重复的转译相同的代码,把重复的定义变成了重复的引用.


    // babel添加一个方法,把async转换为generator
    function _asyncToGenerator(fn) { return function(){.....}}  // 很长一段
    // 具体使用处
    var _ref = _asyncToGenerator(function* (arg1,arg2) {
      yield (0, something)(arg1, arg2)
    })
    // 以上的写法会导致很多地方重复的生成_asyncToGenerator的定义,如果是用来 babel-plugin-transform-runtime 插件,转译后的代码是这样的
    // 从直接定义改为引用,这样就不会重复定义了
    var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator')
    var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2)
    // 使用处
    var _ref = _asyncToGenerator3(function* (arg1,arg2) {
      yield (0, something)(arg1, arg2)
    })

13. babel-loader 一个用于和构建工具相结合,对 js 进行转译处理的 loader.
14. babel-upgrade 用于 babel 配置升级的转换(主要是使用的是旧版本的 label,又暂时不想改配置项,就可以使用这个插件,仍旧沿用旧的配置项,这个插件可以帮助我们把旧的配置项对应的映射成新的配置项.)
