# Babel

babel是一个转译器，暴露了很多api，用这些api可以完成代码到AST的解析、转换、以及目标代码的生成。

开发者可以用它来完成一些特定用途的转换，比如函数插桩（函数中自动插入一些代码，例如埋点代码）、自动国际化等。

流行的小程序转移工具taro，就是基于babel的api来实现的。

## 编译器和转译器
编译的定义是从一种编程语言转成另一种编程语言。主要指的是从高级语言到低级语言。

- 高级语言： 有很多描述逻辑的语言特性，比如分支、循环、函数、面向对象等，接近人的思维，可以让开发者快速的通过它来表达各种逻辑。比如c++，javascript。
- 低级语言：与硬件的执行细节有关，会操作寄存器、内存，具体做内存与寄存器之间的复制，需要开发者理解熟悉计算机的工作原理，熟悉具体的执行细节。比如汇编语言、机器语言。

一般编译器（compiler）是指从高级语言到低级语言的转换工作，而从高级语言到高级语言的转换工具，被叫做转换编译器，简称转译器（Transpiler）。

babel就是一个Javascript Transpiler。

## Babel的编译流程

1. babel 的处理过程总共分为三个阶段， 解析，，生成。
  - 解析（parse）：通过parser将源码转成抽象语法树（AST），这个过程会对源代码进行词法解析和语法解析；
  ![parse ast](<whiteboard_exported_image (4).png>)
  - 转换（transform）：遍历AST，通过各种transform插件对AST进行增删改；
  遍历的过程会调用注册的相应的visitor函数，visitor函数可以对AST节点进行增删改，返回新的AST（可以指定是否继续遍历新生成的AST）。这样遍历完一遍AST之后就完成了对代码的修改。

  - 生成（generate）：把转换后的AST打印成目标代码，并生成sourcemap；
  sourcemap记录了源码到目标代码的转换关系，通过它我们可以找到目标代码中每一个节点对应的源码位置，用于调试的时候把编译后的代码映射回源码，或者线上报错的时候把报错位置映射到源码。




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

## 常见的AST节点

AST是对源码的抽象，字面量、标识符、表达式、语句、模块语法、class语法都有各自的AST。

### Literal

Literal就是字面量的意思，不同类型的数据对应不同的字面量。

|字符|字面量描述符|
|---|---|
|'muzishuiji'|StringLiteral|
|123|NumericLiteral|
|`guang`|TemplateLiteral|
|/^[a-z]+/|RegExpLiteral|
|True|BooleanLiteral|
|1.232434n|BigintLiteral|
|null|NullLiteral|

### Identifier

Identifier是标识符的意思，变量名、属性名、参数名等各种声明和引用的名字，都是Identifier。

```js
const name = 'muzishuiji';
function say(name) {
  console.log(name);
}
const obj = {
  name: 'muzishuiji'
}
```
上述代码的Identifier：name、say、name、console、log、name、obj、name

### Statement

statement是语句，它是可以独立执行的单位，比如break、continue、debugger、return或者if语句、while语句、for语句，还有声明语句，表达式语句等。我们写的每一条可以独立执行的代码都是语句。语句末尾一般会加一个分号分隔护着用换行分隔。

```js
break;
continue;
debugger;
throw Error();
{}
try {} catch(e) {} finally {}
for(let i = 0; i < 10; i++) {}
while(true) {}
do{}while(true)
switch(v) { case:1: break;default: ;}
label: console.log();
with(a) {}
```
它们对应的ast节点如下图：
![alt text](image.png)

语句是代码执行的最小单位，可以说，代码是由语句（Statement）构成的。

### Declaration

声明语句是一种特殊的语句，它执行的逻辑是作用域内声明一个变量、函数、class、import、export等。

```js
const a = 1;
function b() {}
class C{}

import d from 'e';
export default e = 1;
export {e}
export * from 'e'

```

上述声明对应的AST节点如下：
![alt text](image-1.png)

### Expression

expression是表达式，特点是执行完以后有返回值，这是和语句（statement）的区别。

```js
[1,2,3]
a = 1
1 + 2;
-1;
function () {};
() => {};
class {}
a;
this;
super;
a::b;
```
它们对应的AST如图：
![alt text](image-2.png)

identifier和super怎么也是表达式呢？因为identifier，super有返回值，符合表达式的特点，所以也是expression。

能够单独执行的表达式也是语句，有的表达式不能单独执行，需要和其他类型的节点组合在一起构成语句。

赋值语句a=1的AST：
![alt text](image-3.png)

### class
class代码：
```js
class Guang extends Person {
  name = 'muzishuiji'
  constructor() {}
  eat() {}
}
```
对应的AST：
![alt text](image-4.png)

class是es next的语法，babel中有专门的AST来表示它的内容。

### Modules

es module是语法级别的模块规范，也有专门的AST节点

### import

```js
// name import
import {c, d} from 'c'; // ImportSpecifier
// default import
import a from 'a'; // ImportDefaultSpecifier
// namespaced import
import * as b from 'b'; // ImportNamespaceSpecifier
```
这3语法都有对应的ImportDeclaration，但specifiers属性不同，分别对应ImportSpecifier、ImportDefaultSpecifier，ImportNamespaceSpecifier。
![alt text](image-5.png)

### export

```js
// name export
export {a, b}
// default export
export default c
// namespaced export
export * from 'd'
```
这3种语法都有对应的ExportDeclaration，分别对应ExportNamedDeclaration、ExportDefaultDeclaration、ExportAllDeclaration的AST。

![alt text](image-6.png)

### Program & Directive

program是代表整个程序的节点，它有body属性代表程序体，存放statement数组，就是具体执行的语句的集合。还有directives属性，存放Directive节点，比如'use strict'这种指令通常会用Directive节点表示。
![alt text](image-7.png)

program是包裹具体执行语句的节点，而Directive则代码中的指令部分。

### File & Comment

babel的AST最外层节点是File，它是program、comments、tokens等属性，分别存在Program程序体、注释、token等，是最外层节点。

注释分为注释和行内注释，对应CommentBlock和CommentLine节点。
![alt text](image-10.png)

### AST可视化查看工具
可以在https://astexplorer.net/去查看源码parse成ast之后的结果。

如果想查看全部的 AST 可以在[babel parser 仓库里的 AST 文档](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel%2Fblob%2Fmain%2Fpackages%2Fbabel-parser%2Fast%2Fspec.md)里查，或者直接去看 @babel/types 的 
[typescript 类型定义](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbabel%2Fbabel%2Fblob%2Fmain%2Fpackages%2Fbabel-types%2Fsrc%2Fast-types%2Fgenerated%2Findex.ts)。

### AST的公共属性

每种AST都有自己的属性，但它们也有一些公共的属性：
- type： AST节点的类型；
- start、end、loc：start和end代表该节点在源码中的开始和结束下标。而loc属性是一个对象，有line和column属性分别记录开始和结束的行列号。
- leadingComments、innerComments、trailingComments：表示开始的注释、中间的注释、结尾的注释，每个AST节点中都可能存在注释，想拿到某个AST的注释可通过这三个属性。
- extra：rawValue, raw等属性记录一些额外的信息，用于处理一些特殊情况。比如StringLiteral的value只是值的修改，而修改extra.raw则可以单双引号一起修改。

![alt text](image-11.png)


### babel的api有哪些
根据babel的编译流程：parse、transform、generate，会有以下api。

- parse阶段有@babel/parser，功能是把源码转成AST；
- transform阶段有@babel/traverse，可以遍历AST，并调用visitor函数修改AST，修改AST自然涉及到AST的判断、创建、修改等，这就需要@babel/types了，当需要批量创建AST的时候可以使用@babel/template来简化AST创建逻辑。
- generate阶段会把AST打印为目标代码字符串，同时生成sourcemap，需要@babel/generator包
- 中途遇到错误想打印代码未知的时候，使用@babel/code-frame包
- babel整体功能通过@babel/core提供，基于上面的包完成babel整体的编译流程，并应用plugin和preset。

