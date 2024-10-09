1. tsc的编译流程

![alt text](images/image.png)

源码要先用Scanner进行词法分析，拆分成一个个不能细分的单词，叫做token。

然后用Parser进行语法分析，组装成抽象语法树（Abstract Syntax Tree）AST.

之后做语义分析，包括Binder进行作用域分析，和有Checker做类型检查。如果有类型的错误，就是在checker这个阶段报的。

如果有Transformer插件（tsc支持custom transform），会在checker之后调用，可以对AST做各种增删改。

类型检查过后会用Emitter把AST打印成目标代码，生成类型声明文件d.ts，还有sourcemap。

2. Babel的编译流程

![alt text](images/image1.png)

堆不下tsc的编译流程，区别并不大，babel除了不会做类型检查和生成类型声明文件外，tsc能做的事，babel都能做。

3. babel还是tsc？

babel和tsc的编译流程大同小异，都有把源码转换成AST的Parser，都会做语义分析（作用域分析）和AST的transform，最后都会用Generator（或者Emitter）将AST打印成目标代码并声称sourcemap。但babel不做类型检查，也不生成d.ts文件。

tsc支持最新的es标准特性和部分草案的特性（比如decorator），而babel通过@babel/preset-env支持所有标准特性，可以通过@babel/proposal-xx来支持各种非标准特性，支持的语言特性上babel更强一些。

tsc没有做polyfill的处理，需要全量引入core-js，而babel的@babel/preset-env会根据targets的配置按需引入core-js，引入方式受useBuiltlns影响（entry是在入口引入targets需要的，useage时每个模块引入用到的）。

但是babel因为是每个文件单独编译的（tsc是整个项目一起编译），而且也不解析类型，所以不支持const enum（会作为enum处理，新版本支持了），不支持namespace的跨文件合并，不支持过时的export = import = xxx 的模块语法。

但上述问题影响不大，完全可以用babel编译ts代码来生成体积更小的代码，不做类型检查编译速度也很快。如果想做类型检查可以单独执行tsc --noEmit，想要生成.d.ts的声明文件，也单独跑下tsc。

3. 什么是references？

tsconfig文件中的references字段来管理项目的依赖关系和构建顺序。references字段允许在一个monorepo或多包项目中指定包之间的依赖挂你，以确保正确的构建顺序和类型检查。

因为有了依赖关系的信息，可以做到以下功能：
  1. 增量编译：当使用项目引用时，typescript编译器可以只编译那些上次编译以来发生变化的项目；
  2. 编译器性能：使用项目引用可以改善编译器性能，因为编辑器可以仅加载需要的项目，从而减少内存占用并提高响应速度；
  3. 支持引用目标的类型检查：通过fork ts checker等方式执行ts类型检查时，能同时检查到引用项目的类型问题；

```json
{
    "compilations": {

    },
    "references": [
        {
            "path": "./packages/package-a",
        },
        {
            "path": "./packages/package-b",
        },
    ]
}
```
需要注意的是：
  1. 被引用的项目需设置 "composite": true，这样才能被其他的项目引用。
  2. 引用的项目会生成.d.ts声明文件，这些文件会被依赖它的项目使用，以了解类型信息。

