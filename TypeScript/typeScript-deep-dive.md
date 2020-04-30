# TypeScript Deep Dive

深入理解 TypeScript

## 第 1 章 为什么要使用 TypeScript

介绍学习 TypeScript 之前需要具备的一些知识,以及为什么要使用 TypeScript,从中你可以学到 TypeScript 与 Javascript 的不同之处.

### 1.1 开始使用 TypeScript

### 1.2 选择 TypeScript 的理由

1. 推出 TypeScript 的主要目的

- 为 JavaScript 提供可选的类型系统;
- 兼容当前及未来的 JavaScript 的特性;

2. 为什么要给 JavaScript 加上类型?

类型系统能够提高代码的质量和可维护性.

- 类型有利于代码的重构,它有利于编译器在编译时而不是运行时捕获错误.
- 类型是出色的文档形式之一,函数签名是一个定理,而函数体是具体的实现.

3. 范围大的数据定义是可以匹配范围小的接口.(这意味着鸭子类型是一流的语言结构).

4. TypeScript 的优势有哪些?

- JavaScript 的类型系统

  - (1) JavaScipt 即 TypeScript

  .js 文件可以无修改的重命名为.ts 文件

  - (2) 类型可以是隐式的

  TypeScript 将尽可能多的去推断类型信息(在没有明确声明某个变量的数据类型的 i 情况下),以便在代码开发过程中以极小的成本呢为你提供类型安全.

  - (3) 类型可以是显示的

  可以通过类型注解的方式来显示的声明某个变量的数据类型,这可以为下一个阅读代码的开发人员记录内容, 同时可以强制编译器编译你认为它应该去编译的内容,这可以让编译器对代码所做的算法分析与你对代码的理解相匹配.

  - (4) 类型是结构化的

  范围大的数据定义是可以匹配范围小的接口.(这意味着鸭子类型是一流的语言结构).这个数据类型可以像鸭子一样走路,一样叫,那它就是鸭子.

  - (5) 类型错误不会阻止 JavaScript 的正常运行

  在 js 迁移到 ts 的过程中,即使存在编译器错误,在默认情况下,ts 代码还是会尽可能的编译为 js 代码.

  - (6) 类型可以由环境来定义

  你可以通过生命的方式使得我们能够安全,轻松地在 TypeScript 中使用现有的 JavaScript 库.

- 支持未来的 JavaScript 所具有的功能

### 1.3 总结

## 第 2 章 JavaScript 的常见语法

主要介绍与 JavaScript 有关的一些基础知识,熟练使用 TypeScript 的一个重要前提是要了解 JavaScript.

1. TypeScript 即 JavaScript, TypeScript 是带有文档的 JavaScript;
2. TypeScript 让 JavaScript 更美好,
3. 学习 JavaScript 仍然是必要的;

### 2.1 相等

1. 推荐使用严格相等,引用类型的数据推荐使用 deep-equal.

### 2.2 引用

1. 引用类型的对象一旦发生变化,这种变化会贯穿整个引用.

### 2.3 null 和 undefined

1. 变量没有初始化: undefined; 变量不可用: null;
2. 判断一个数据是否已经被定义,通常使用 typeof.
3. 必要的时候应该给函数的参数设置默认值.
4. 不推荐使用 undefined 作为函数的返回值;
5. JSON 序列化的时候会将值为 undefined 的属性删除,所以如果你希望保留相关属性,需要在转换之前将对应的属性值设置为 null.
6. 对于目前未知的变量设置默认值,建议设置为 undefined.

### 2.4 this

1. 在函数内对 this 关键字的访问实际上是由函数的实际调用方式控制的,它通常被称为调用上下文.(要解释某个概念,用示例说明更具说服力)

### 2.5 闭包

1. 闭包是指一个内部函数有权访问它外部作用域中的任何变量.
2. 闭包让人惊叹之处在于,它允许你轻松的组合对象,例如,使用模板模式.

   function createCounter() {
   let val = 0;
   return {
   increment() {
   val++
   },
   getVal() {
   return val;
   }
   }
   }
   let counter = createCounter();
   counter.increment();
   console.log(counter.getVal());
   counter.increment();
   console.log(counter.getVal());

3. 在较高的层次上,闭包也是使像 Node.js 扎样的运行环境成为可能的一个因素;

   server.on(function handler(req, res) {
   loadData(req.id).then(function(data) {
   // 形成闭包,所以 handler 函数调用结束依然可以访问到 res 变量
   res.send(data);
   })
   })

### 2.6 数字

1. 0.1 + 0.2 !== 0.3

是因为计算过程中在做进制转换的时候发生精度丢失的原因,二进制浮点数不能正确映射到十进制数.

2. js 所能表示的整数限制是 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER.可以使用 es6 的 isSafeInteger 来判断一个是数据是否在安全范围内.

3. 如果你想要使用任意精度的整数,可以使用 big.js.(注意: 不要将此库用于 UI,或以性能为目的的运算,如图表,canvas 等)

4. 检测是否是无效数值使用 Number.isNaN()

5. 数字的边界值可以用静态的 Number.MAX_VALUE 和-Number.MAX_VALUE 的值来表示.
   超出边界但是精度没有改变的值都被限制在此范围内,即这样的修改是无效的.

超出边界且精读已经改变的值,用 Infinity 或 -Infinity 表示;

Infinity 可以正常的使用比较运算符.

6.  在 Number 中,可表示的最小非零值可以用 Number 类的静态成员 Number.MIN_VALUE 来表示.

        console.log(Number.MIN_VALUE);
        // 小于Number.MIN_VALUE的值都会被转换为0
        console.log(Number.MIN_VALUE / 10);   // 0

    大于 Number.MAX_VALUE 的值会被限制为 Infinity, 小于 Number.MIN_VALUE 的值会被限制为 0.

### 2.7 truthy

1. 在判断语句中使用表达式或者变量,他们会被转换为对应的布尔值.

## 第 3 章 JavaScript 新语法特性

TypeScript 的一个主要特点是: 它允许在能运行 ES3 和 ES5 代码的 JavaScript 引擎(如浏览器和 NOde.js)中使用 ES6 及更高版本的一系列功能.

### 3.1 类

1. 你可以使用`class`关键字来定义类;
2. 你可以使用`extends`来继承父类的属性和方法;
3. 可以用`static`来定义类的静态成员和静态函数;
4. TypeScript 支持使用访问修饰符`public`, `private`, `protected`来定义类成员的可访问性.
5. 抽象`abstract`

`abstract`可以被认为一个访问修饰符,它可以作用在类及类的任何成员上,拥有一个`abstract`修饰符意味着该函数不能直接被调用,并且子类必须实现这个功能.

需要注意的是:

- abstract 类不能直接被实例化,用户必须创建一个类来继承 abstract 类;
- abstract 成员不能直接被访问,子类必须实现这个功能;

抽象类在我的理解上就是定义一类事物所具有的的一些属性和方法,但是通常不做具体的实现,相当于定义了一个约束,或者一种规范,然后由继承它的子类去做具体的实现.从编程思维的角度讲就是向上抽象,向下约束.

6. 你可以使用构造器来定义类的成员,`TypeScript`为此提供了一个缩写,在构造器中声明成员的时候加上修饰符,它就会在类上自动声明,并从构造器中复制过去;

   class Foo {
   constructor(public x: number) { // ts 会自动为我们声明类成员并赋值.

   }
   }

7. TypeScript 可以直接使用 ES7 的特性,可直接在构造器中初始化类成员.

   class Foo {
   numbers = [];
   add() {
   // ...
   }
   }

8. IIFE

IIFE 允许 TypeScript 通过变量\_super 来捕获基类,这种方式在来体中经常使用;

    class Point3d extends Point {
        z: number;
        constructor(x: number, y: number, z: number) {
          super(x, y);
          this.z = z;
        }
        add(point: Point3d) {
          var point2d = super.add(point);
          return new Point3d(this.x + point2d.x, this.y + point2d.y, this.z + point2d.z);
        }
      }
      // 以上代码编译成es5的样子
      var Point3d = (function(_super) {
          _extends(Point3d, _super)
          function Point3D(x,y,z) {
            _super.call(this, x, y)
            this.z = z;
          }
          Point3d.prototype.add(point: Point3d) {
            var point2d = _super.prototype.add.call(this, point);
            return new Point3d(this.x + point2d.x, this.y + point2d.y, this.z + point2d.z);
          }
      })(Point);

当在`TypeScript`中使用类的继承时,它们会生成如下代码.

    function _extends = this._extends || function(d,b) {
      for(var p in b) {
        if(b.hasOwnProperty(p)) { d[p] = b[p] }
      }
      function _() { this.constructor = d; }
      _.prototype = b.prototype;
      // 继承b原型上的属性和方法,从基类继承其他函数.
      b.prototype = new _();
    }

### 3.2 箭头函数

1. 箭头函数设计的主要目的如下:

- 你不再需要书写 function;
- 从语义上说,它包含了 this 的意义;
- 从语义上说,它包含了 argument 的意义;

2. 什么情况下使用箭头函数?
   如果你想保证函数在任何时候调用都有确定的 this 或者你不会再函数体中使用到 this,那么推荐你使用箭头函数;如果你想让 this 成为调用时的陕西该文,你应该使用普通函数,如果你准备使用 arguments 关键字,那么也应该使用普通函数.
3. 你可以利用箭头函数直接返回一个对象字面量.

   var foo = () => ({
   bar: 1232
   });

### 3.3 rest 参数

    function aaa(...rest) {
      console.log(rest);   //  [1, 2, 3, 4, 5], 函数的所有参数组成的数组
    }
    aaa(1,2,3,4,5)

### 3.4 let

1. let 用于创建块级作用域的变量;存在暂时性死区;不允许重复声明;

### 3.5 const

1. const 用于创建块级作用域的常量;存在暂时性死区;必须在声明的时候初始化,且不能通过重新赋值的方式去修改它;不允许重复声明;

### 3.6 解构

1. 对象的解构

   var { w,x, ...remaining } = { w: 1,x: 2,y: 3, z: 4}
   console.log(w,x,remaining); // 1 2 {y: 3, z: 4}

2. 数组的解构

   const [x, ,...remaining] = [1,2,3,4]
   console.log(w,x,remaining); // 1 [3,4]

解构可以减少代码的体积,并能够提高代码的可读性和可维护性

### 3.7 扩展运算符

1. 扩展运算符比较多的用在数组的解构,对象的解构, 对象和数组的浅拷贝, 对象的扩展, rest 参数等.

### 3.8 for...of

1. for...of 存在于 TypeScript 和 ES6 中,它能按照你的预期去迭代数组.

   var someArray = [9,2,5];
   for(var item of someArray) {
   console.log(item); // 8,2,5
   }

2. 生成 Javascript

对于目标 ES6 之前的编译版本来说,TypeScript 中的 for...of 会被编译成标准的 for 循环.

      var someArray = [9,2,5]
      for(var item of someArray) {
         console.log(item)
      }
      // 编译为如下所示
      for(var _i = 0; _i < someArray.length; _i++) {
         var item = someArray[_i];
         console.log(item)
      }

需要注意的是 for...of 操作符只能用在类数组,数组或者 string 类型的数据上,如果在 TypeScript 中将 for...of 操作符用在不是 array 或 string 类型的数据上,会抛出错误.注意,将来的 TypeScript 版本可能会删除此限制.

### 3.9 迭代

1. 通常,迭代是一个实现以下接口的对象;

   interface Iterator<T> {
   next(value?: any): IteratorResult<T>;
   return>(value?:any): IteratorResult<T>;
   throw?(e?: any): IteratorResult<T>;
   }
   // 这个接口允许你从属于对象的一些序列或集合中取出一个值
   // 下面代码中的 iteratorResult 是 value 和 done 的键值对
   interface IteratorResult<T> {
   done: boolean;
   value: T;
   }

### 3.10 模板字符串

1. 模板字符串, `` , 设计模板字符串的目的有 3 个

- 字符串插值
- 多行字符串
- 标记模板(标记模板允许你创建功能强大的字符串实用程序.)
  标记模板的使用示例如下:


      var say = 'a bird in hand > two in the bush';
      var html = htmlEscape`<div> i could just like to say: ${say} </div>`;
      // 一个简单的标记函数
      function htmlEscape(literals: TemplateStringsArray, ...placeholders: string[]) {
         let result = "";
         // 将字面量与占位符替换
         for(let i = 0; i < placeholders.length; i++) {
            result += literals[i];
            result += placeholders[i]
                        .replace(/&/g, "&amp;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#39;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
         }
         // 添加最后一个文本
         result += literals[literals.length - 1];
         return result
      }

### 3.11 Promise

1. 在使用基于回调的异步时,要记住以下两点:

- 永远不要调用两次回调函数;
- 永远不要抛出错误;

2. Promise 的出现可以让我们在 JavaScript 代码中以同步的方式来处理异步;

3. TypeScript 和 Promise

TypeScript 的优点在于它通过 Promise 链能够理解从 Promise 传过来的值,并作相应的类型推断

      Promise.resolve(123)
         .then(res => {
            // res被推断为number类型
            return true
         })
         .then(res => {
            // res被推断为boolean类型
         })
      // 它也能正确推断返回值为Promise的任何非包装函数
      function iReturnPromiseAfterlSecond(): Promise<string> {
         return new Promise(resolve => {
            setTimeout(() => resolve('hello world!", 1000))
         })
      }
      Promise.resolve(123)
         .then(res => {
            // res被推断为number类型
            return iReturnPromiseAfterlSecond();
         })
         .then(res => {
            // res被推断为string类型
            console.log(res);
         })

4. 将一个回调风格的函数 Promise 化

   const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
   // 使用 util 模块可以实现将一个回调风格的函数 Promise 化
   import fs from 'fs';
   import util from 'util';
   const readFile = util.promiseify(fs.readFile)

5. 我们可以使用`Promise.all`和`Promise.race`来实现并行流程的控制

### 3.12 generators

1. `function*` 是一个用来创建 `generators` 函数的语法.调用一个`generators`函数会返回一个`generators`对象.而这个`generators`对象只是遵循了迭代器的接口(即 next, return 和 throw 函数).

2. 设计`generators`的关键目的有两个.

- 惰性迭代器

generators 函数可以用来创建惰性迭代器,例如,下面的函数根据需要会返回无限的整数列表;

      function* infiniteSequence() {
         var i = 0;
         while(true) {
            yield i++;
         }
      }
      var iterator = infiniteSequence()
      while(true) {
         console.log(iterator.next());  // { value: xxx, done: false } 可以无限执行
      }
      // 如果迭代结束,你将会获得 `{ done: true }`

- 外部控制执行

generators 可以让一个函数暂停执行,并将继续执行的权力交给调用者.这种控制权让我们能够更好的控制一部逻辑的执行.

总结如下:

- yeild 允许一个`generators`函数暂停执行,并且将恢复执行的权力交给外部系统;
- 外部系统可以将值推入`generators`函数体
- 外部系统可以将一个异常抛入`generators`函数体

### 3.13 async/await

1. `async/await` 是`generator`的语法糖,从写法上我们就能有一个直观的感受;

   function foo = WrapToReturnPromise(function\* () {
   try {
   var val = yield getMeAPromise()
   console.log(val)
   } catch(err) {
   console.log('Error', err.message)
   }
   })
   async function foo() {
   try {
   var val = await getMeAPromise()
   console.log(val)
   } catch(err) {
   console.log('Error', err.message)
   }
   }

2. 在 TypeScript 中使用`async/await`:


      function delay(milliseconds: number, count: number): Promise<number> {
         return new Promise<number>(resolve => {
            setTimeout(() => {
               resolve(count);
            }, milliseconds);
         });
      }
      // 异步函数总是返回一个Promise
      async function dramaticWelcome(): Promise<void> {
         console.log("hello");
         for (let i = 0; i < 5; i++) {
            // 等待Promise<number>转换为数字
            const count: number = await delay(500, i);
            console.log(count);
         }
         console.log("world~");
      }
      dramaticWelcome();

## 第 4 章 TypeScript 项目构成

TypeScript 项目中的编译上下文,声明空间,模块,命名空间和动态导入表达式.

### 4.1 编译上下文

1. 编译上下文可以用来给文件分组,告诉`TypeScript`哪些文件时有效的,哪些时无效的.除此之外,编译上下文还包含正在被使用的编译选项的信息.

### 4.2 声明空间

1. 在`TypeScript`中,存在两种声明空间: 类型声明空间和变量声明空间.

2. 类型声明空间

类型声明空间包含用来当作类型注解的内容:

      class Foo {}
      iterface Bar {}
      type Bas = {};
      // 你可以将Foo, Bar, Bas 作为类型注解使用
      let foo: Foo;
      let bar: Bar;
      let bas: Bas;

3.  变量声明空间

变量声明包含可用作变量的内容,在上文中`class Foo`提供了一个类型 Foo 到类型声明空间,此外它还提供了一个变量 Foo 到变量声明空间,如下所示:

      class Foo {}
      const someVar = Foo;
      const someOtherVar = 12;

我们不能把`type`和`interface`定义的内容当作变量使用, 同样,使用 var,let,const 生命的变量,只能在变量声明空间使用,不能用作类型注解.

### 4.3 模块

1. 全局模块

包含全局命名空间下的所有变量声明和函数声明.

2. 文件模块

ES6 提供了`export` 和 `import`来帮助我们创建文件模块,在文件中使用`import`时,它不仅允许你使用从其他文件导入的内容,还会将此文件标记为一个模块,在文件内定义的声明也不会"污染"全局命名空间.

推荐将`TypeScript`编译为符合`commonjs`规范的 JavaScript 代码

3. `import/require` 只是导入类型

它实际上只做了两件事:

- 导入 foo 模块的所有类型信息;
- 确定 foo 模块运行时的依赖关系;

你可以仅仅加载类型信息,而没有运行时的依赖关系; (我的理解就是仅仅`import`了对应的模块,但是没有使用对应模块的属性和方法,未产生依赖关系)

4. 懒加载的原理就是只在使用到对应模块的时候取导入对应的模块;


      import foo = require('foo'); // 原始的加载只被用作了类型注解.
      export function loadFoo() {
         // 这是懒加载foo,原始的加载只被用作类型注解
         // 现在你可以用_foo来作为一个变量使用了
      }

懒加载通常在以下情景中使用:

- 在 Web App 里,当你在特定路由上加载 JavaScript;
- 在 Node 应用里,当你只想加载特定模块,用来加快启动速度时;

学习编写声明文件开始你的 TypeScript 之旅;

### 4.4 命名空间

`TypeScript`提供了`namespace`关键字来描述这种分组:

      namespace Utility {
         export function log(msg) {
            console.log(msg)
         }
         export function error(msg) {
            console.log(msg)
         }
      }
      // 用例
      Utility.log('call me');
      Utility.error('maybe');
      // namespace关键字编译后的JavaScript代码
      (function (Utility) {
         // 添加属性至Utility
      })(Utility || Utility = {})

### 4.5 动态导入表达式

ES 的新语法支持在程序的任意位置异步加载一个模块,webpack bundler 有一个拆分代码的功能,它允许你将代码拆分为很多块,这些块在将来可以异步下载,因此,你可以在程序中首先提供一个最小的程序启动包,并在将来异步加载其他模块.

webpack 实现代码分割的方式有两种:

- 使用 import();
- require.ensure(); (这是 webpack 的具体实现)

如果我们期望 TypeScript 的输出保留 import()语句,而不是将其转化为其他任何代码,我们可以在`tsconfig.json`中配置`"module": "esnext"`,`TypeScript`生成模拟的`import`,该语句将会输入以便 webpack 进行代码拆分.

      // 动态import代码示例
      import(/* webpackChunkName: "momentjs" */ 'moment')
         .then(moment => {
            // 懒加载的模块拥有所有的类型,并且能够自动完成工作
            // 类型检查会工作,代码引用也会工作
            const time = moment().format();
            console.log('TypeScript >= 2.4.0 Dynamic Import Expression');
            console.log(time)
         })
         .catch(err => {
            console.log('Failed to load moment', err)
         })

## 第 5 章

快速创建一个 TypeScript 项目

1. 管理依赖项

- 1. devDependencies
     项目仅在开发时需要依赖的包(如 TypeScript,你只需要用它来做构建和编译,生产环境不需要使用带有 TypeScript 的包);
- 2.  peerDependencies
      如果你的项目依赖了 PackageA, PackageA 模块又依赖了 PackageB, 那么在安装的时候你会发现目录结构是以下形式:

            MyProject
            |- node_modules
               |- PackageA
                  |- node_modules
                     |- PackageB

如果你想要需要 PackageB,你会发现当前项目的 node_modules 目录查找不到 PackageB, 它不会进入 PackageA 模块下的 `node_modules` 下查找,所以为了解决这种问题, `如果安装我,那么你最好安装 X.Y,Z`,我们可以将需要安装的模块写在 `peerDependencies` 中,示例如下:

      {
         "peerDependencies": {
            "PackageB": "1.0.0"
         }
      }

这样,安装 `PackageA`的 时候 `node_modules`的目录结构如下:

      MyProject
      |- node_modules
         |- PackageA
         |- PackageB

- 3. dependencies

项目在生产环境需要依赖的包,比如'axios', 'antd'这类依赖包;

## 第 6 章

1. 需要注意的是:

- TypeScript 的类型系统是可选的,因此,你的 JavaScript 就是 TypeScript.
- TypeScript 不会阻止 JavaScript 的运行,即使类型错误也不例外,这让你的 JavaScript 逐步迁移至 TypeScript;

### 6.1 基本概念

1. 基本类型注解

   let num: number;
   let str: string;
   let bool: boolean;
   num = 123;
   num = '0123'; // 错误
   str = 123; // 错误
   bool = true;
   bool = 'false'; // 错误

2. 数组注解

   let boolArray: boolean[]
   let numArray: number[]

3. 接口注解

   接口是 TypeScript 的一个核心知识,它能将多个类型注解合并为一个类型注解.通常是多个地方使用的类型注解定义为一个接口注解;

   iterface Name {
   first: string;
   second: string;
   }
   let name: Name;
   name = {
   // 错误,没有 second 属性
   first: 'jone'
   }

4. 内联类型注解

内联注解和接口注解的区别就是,内联类型为特定的某个变量定义类型约束,而接口是为一类的变量定义类型约束.如果你发现多次使用了享用的内联注解,就可以考虑将其抽象为接口注解;

      let name: {
         first: string;
         second: string;
      }
      name = {
         first: 'Jone',
         second: 'deo'
      }

5. any

TypeScript 提供的类型系统的"后门",它可以赋值给任何类型的变量,也能被任何类型的数据赋值.

      let power: any;
      power = '123';
      power = 112;

6. null 和 undefined

在类型系统中，JavaScript 中的 null 和 undefined 字面量和其他被标注为 any 的变量一样，都能被赋值给任意类型的变量.但是默认不支持给 null 和 undefined 类型的变量赋值其他类型的数据.

      let num: number;
      let str: string;
      num = null
      str = undefine;
      let aaa: null;
      aaa = '111'; // 错误

7. void

void 用来表示一个函数没有返回值:

      function log(message: string): void {
         console.log(message)
      }

8. 泛型,由传入数据的类型来定义约束

   function reverse<T>(items: T[]): T[] {
   const toreturn = [];
   for (let i = items.length - 1; i >= 0; i--) {
   toreturn.push(items[i]);
   }
   return toreturn;
   }
   const sample = [1, 2, 3];
   const reversed = reverse(sample);
   console.log(reversed); // 这样 ts 会推断 reversed 是一个 number 类型的数组
   // 以下操作会判错
   // reversed[0] = '1'
   // reversed = ['1'. '2']

9. 联合类型

简单理解就是 a | b

      let StrOrNum: string | number

10. 交叉类型

简单理解就是 a & b

      function extend<T, U>(first: T, second: U): T & U {
         const result = <T & U>{};
         for (let id in first) {
            (<T>result)[id] = first[id];
         }
         for (let id in second) {
            if (!result.hasOwnProperty(id)) {
               (<U>result)[id] = second[id];
            }
         }
         return result;
      }
      const x = extend({ a: "hello" }, { b: 42 });
      // 现在x拥有了 a 属性和 b 属性
      const a = x.a;
      const b = x.b;

11. 元组类型

JavaScript 并不支持元组,开发者通常只能使用数组来表示元组,但是 TypeScript 类型支持它,使用 [typeofmember1, ypeofmember2]能够为元组添加类型注解,元组可以包含任意数量的成员;

      let nameNumber: [string, number];
      // 正确
      nameNumber = ['jerry', 221345];
      // 错误
      nameNumber = ['jerry', '221345'];

12. 类型别名

当你想要使用联合类型和交叉类型的时候,推荐使用类型别名,这样可以可以提供一个更具语义化的名称.

        type strOrNum = string | number;
        // 用法和其他符号一样
        let sample: strOrNum;
        sample = 123;
        sample = true; // 错误

### 6.2 迁移 JavaScript 至 TypeScript

1. 改造过程中的几个关键点.

(1) 减少错误

初期可以尝试使用类型断言和 any 来减少已有的 JavaScript 代码的类型错误,但这不是推荐的做法,尽可能的修复这些语法错误.

(2) 第三方 JavaScript 代码

你可以为一个第三方库创建一个声明文件,也可以创建一个针对特定库的声明文件,如 jquery.d.ts.

      var regex = /^[+-]?(\d+\.\d+|\d+|\.\d+)$/

如果你想在某些内容上添加显示的注解,并且你会在类型声明空间中使用它,可以用 type 关键字来实现.

      declare type JQuery = any;
      declare var $: JQuery;

(3) 第三方 npm 模块

      // 定义一个全局模块
      declare module 'jquery';
      // 在必要时导入它
      import * as $ from 'jquery'

(4) 额外的非 JavaScript 资源

      // 你只需要在global.d.ts中添加如下代码
      declare module '*.css';
      // 引用的地方
      import * as styles from './some/file.css';

### 6.3 @types

1. 使用@types

你可以通过 npm 来安装和使用@types,例如为 jquery 添加声明文件.

      npm install @types/jquery --save-dev

2. 全局@types

在默认情况下,TypeScript 会自动包含支持全局使用的任何定义.例如: jquery,你能够在项目中全局使用\$;

3. 模块@types

对于 jquery 来说,通常建议使用模块,安装模块@types 之后,不需要进行特别的配置,你就可以像使用模块一样使用它了.

      import * as $ from 'jquery';

4. 控制全局

你可以在 tsConfig 的 compilerOptions.types 选项,引入有意义的类型,控制需要包含的全局变量,我暂时理解为不做配置的模块的全局变量是不可以在代码中访问到的.

      {
         "compilerOptions": {
            "types": [
               // 只允许使用jquery的@types包,及时安装了另一个声明文件,它的全局变量也不会泄露到你的代码中
               'jquery'
            ]
         }
      }

### 6.4 环境声明

1. 学习为第三方 JavaScript 库编写环境声明模式,是一种为 TypeScript 写注解的比较好的实践.


      // 先从为一个简单的变量编写声明开始
      declare var foo: any;

2. 变量


      // 声明全局变量process
      declare let process: any;
      // 如今已经有node库的声明文件node.d.ts,所以我们能够直接使用process变量
      // 这里建议将process定义为接口,方便其他人扩充这些全局变量,并且告诉TypeScript有关这些变量的修改
      interface Process {
         exitWithLogging(code?: number): void;
      }
      process.exitWithLogging = function() {
         console.log('excting');
      }

### 6.5 接口

1. 内联注解与接口注解, TypeScript 的接口是开放的和可扩展的.


      declare const myPoint: { x: number; y: number };
      interface Point {
         x: number;
         y: number;
      }
      declare const myPoint: Point;

2. 类可以实现接口.

如果 i 希望在类中使用必须要遵循的接口(类)或别人定义的对象结构,可以使用 implements 关键字来确保兼容性.

      interface Point {
         x: number;
         y: number;
      }
      class MyPoint implements Point {
         x: number;
         y: number;  // 必须与Point保持一致
      }
      // implements 限制了类示例的结构
      let foo: Point = new MyPoint()

3. 并非每个接口都容易实现

你可以使用接口声明 JavaScript 中可能存在的任意(甚至是疯狂的)结构.

### 6.6 枚举

1. 数字枚举与数字类型

TypeScript 的枚举类型是基于数字的,这意味着可以将它赋值给枚举类型的示例,任何其他与数字类型相兼容的对象也可以.

      enum Color {
         Red,
         Green,
         Blue
      }
      let col = Color.Red;  // 数字类型的变量
      col = 0;

2. 数字枚举与字符串枚举


      enum Tristate {
         False,
         True,
         Unkown
      }
      // 编译后的JavaScript
      var Tristate;
      (function(Tristate) {
         Tristate[ (Tristate['False'] = 0) ] = 'False'
         Tristate[ (Tristate['True'] = 0) ] = 'True'
         Tristate[ (Tristate['Unkown'] = 0) ] = 'Unkown'
      })(Tristate || (Tristate = {}))
      // 编译后的JavaScript对象是:
      // 创建一个枚举类型的值相当于创建了一个数字到字符串的双向映射
      {
         0: "False"
         1: "True"
         2: "Unkown"
         False: 0
         True: 1
         Unkown: 2
      }

3. 指定与数字枚举相关联的数字


      // 默认与枚举相关联的数字是0,1,2
      enum Color {
         DarkRed = 3,  // 3
         DarkGreen,    // 4
         DarkBlue      // 5
      }

4. 你可以指定数字枚举来更好的标记你的枚举值(我的理解就是枚举值的一种描述)


      enum AnimalFlags {
         None = 0,
         HasClaws = 1 << 0,
         CanFly  = 1 << 1,
         EatsFish = 1 << 2,
         Endangered = 1 << 3
      }

5. 字符串枚举

我们可以将默认的数字枚举指定为字符串枚举

      export enum EviTypeEnum {
         UNKNOWN = '',
         PASSPORT_VISA = 'passport_visa',
         PASSPORT = 'passport',
         SIGHTED_STUDENT_CARD = 'sighted_terudent_card'
      }

6. 常量枚举


      const enum Tristate {
         False,
         True,
         Unkown
      }
      const liel = Tristate.False;
      // 默认情况下,上述代码会被编译为
      let lie = 0;
      // 不会为枚举类型生成任何JavaScript代码,因为在这个例子中,
      // 运行时没有Tristate变量,因为它使用内联语法,我们可以使用编译标记--preserveConstEnums,
      // 它会编译出var Tristate的定义,一边你在运行时可以手动使用 Tristate[' false '] 或 Tristate[0]

7. 有静态方法的枚举

我的理解就是使用枚举值来做 switch 的分支的值,这样使得等于对应枚举值的变量可以调用某个方法执行一些处理逻辑.

8. 开放式枚举

**只有在不适用模块时,开放式美剧才有意义,而你应该使用模块**

开放式枚举意味着你可以跨多个文件拆分和扩展枚举的定义.你可以把一个枚举对象的定义拆分至多个块中,但需要注意的是,只有在声明它的第一个枚举时,可以省略初始化的代码.

      enum Color {
         Red,  // 可以省略
         Green,
         Blue
      }
      enum Color {
         DarkRed = 3,  // 省略会报错
         DarkGreen,
         DarkBlue
      }

### 6.7 lib.d.ts

1. 当你安装 TypeScript 时,会顺带安装一个 lib.d.ts 声明文件,这个文件包含 JavaScript 运行时及 DOM 中存在的各种常见的 JavaScript 环境声明(如 window,Date,Math 等).

- 它自动包含在 TypeScript 项目的编译上下文中;
- 它能让你快速开始书写经过类型检查的 JavaScript 代码;

2. 你可以通过指定 --noLib 的编译器命令行标记或者在 tsConfig.json 中指定选项 noLib: true,从上下文中排除 lib.d.ts 声明文件, 但这样你就失去了类型检查的功能

3. 创建 globals.d.ts,对已有接口声明做扩展,或者自定义一些全局的变量声明


      interface Window {
         helloWorld(): void;
      }
      window.helloWorld = () => console.log("hello world");
      window.helloWorld();
      interface Math {
         seedrandom(seed?: string): void;
      }
      Math.seedrandom()

4. 如果有必要的话,你可以定义自己的 lib.d.ts,常见的原因有:

- 运行 JavaScript 的环境与基于标准浏览器运行时的环境有很大不同.
- 你希望在代码里严格控制全局变量,例如, lib.d.ts 将 item 定义为全局变量.

你可以定义自己的声明文件,typescript 将提取该文件进行类型检查.

5. --lib 选项可以和 --target 选项解耦

你可以选择只将 Promise 编译为 ES6 的版本,其他的嗲吗编译为 ES5 的版本

      "compilerOptions": {
         "lib": ["dom", "es6"]
      }

6. 可以通过引入 core-js 模块下的子模块,在旧的 JavaScript 引擎中为你 polyfill Map, Set, Promise 这类运行时功能.示例代码如下:


      import 'core-js/es/symbol';
      import 'core-js/es/map';
      import 'core-js/es/promise';

### 6.8 函数

1. 函数注解


      function foo(sampleParameter: { bar: number }) {}

2. 返回类型注解

   function foo(sampleParameter: { bar: number }): number {}

3. 可选参数


      function foo(bar: number, bas?: string): void {

      }
      foo(123);
      foo(123, 'hello');

4. 函数的重载

可以通过多次声明函数头,根据传入参数的不同来实现函数的重载.

      function padding(all: number);
      function padding(topandbottom: number, leftandright: number);
      function padding(top: number, right: number, bottom: number,left: number);
      // 实际的函数应该包含重载函数的所有情况
      function padding(a: number, b?: number, c?: number, d?: number) {
         if(b === undefined && c === undefined && d === undefined) {
            b =c =d =a
         } else if(c === undefined && d === undefined){
            c = a;
            d = b;
         }
         return {
            top: a,
            right: b,
            bottom: c,
            left: d
         }
      }

5. 声明函数


      type LongHand = {
         (a:number): number
      }
      type ShortHand = (a: number) => number;
      // 如果你想实现函数的重载,只能使用第一种方式
      type LongHandOverload = {
         (a:number): number;
         (a: string): string;
      }

### 6.9 可调用

1. 你可以使用类型别名或接口来表示一个可被调用的类型注解,它可以表示一个返回值为 string 的函数.


      interface ReturnString {
         (): string;
      }
      declare const foo: ReturnString;
      const bar = foo();

2. 一个接口可提供多个调用注解,来指定特殊的函数重载.


      interface Overloaded {
         (foo: string): string;
         (foo: number): number;
      }
      // 接口的一个实现
      function stringOrNumber(foo: number): number;
      function stringOrNumber(foo: string): string;
      function stringOrNumber(foo: any): any {
         if(typeof foo === 'number') {
            return foo * foo;
         } else if(typeof foo === 'string') {
            return `hello ${foo}`
         }
      }
      // 调用接口的主体当作变量的类型注解
      const overloaded: Overloaded = stringOrNumber;
      // 内联注解
      const overloaded: {
         (foo: string): string;
         (foo: number): number;
      } = (foo: any) => foo;

3. 如果你不需要做函数的重载,typeScript 允许你使用简单的箭头函数类型的注解.


      const simple: (foo: number) => string = foo => foo.toString();

4. 可实例化

可实例化是可调用类型注解的一种特殊情况,它用 new 作为前缀.

      interface CallMeWithNewToGetString {
         new(): string;
      }
      declare const Foo: CallMeWithNewToGetString;
      const bar = new Foo();  // bar被推断为string类型

### 6.10 类型断言

1. as Foo 与 <foo>


      let foo: any;
      let bar = <string>foo;  // 现在bar的类型是string

2. 类型断言与类型转换

类型断言之所以不被称为类型转换,是因为转换通常意味着是某种运行时的支持.但是,类型断言是一个纯粹的编译时语法,同时,它为编译器提供了分析代码的方法.

3. 错误的断言会因为避开了 ts 的语法校验而出错.


      interface Foo {
         bar: number;
         bas: string;
      }
      const foo = {} as Foo;  // 这时编译器不会发生错误警告
      interface Foo {
         bar: number;
         bas: string;
      }
      const foo = <Foo>{
         // 编译器会提供关于Foo属性的代码提示,
         // 但是如果开发人员依然忘记添加相关属性,编译器也不会发出错误警告
      }
      interface Foo {
         bar: number;
         bas: string;
      }
      const foo: Foo{
         // 编译器会提供Foo属性的代码提示
      }

4. 两个不互为子集的类型做类型断言会报错,这是我们可以使用双重断言,首先将其断雁城兼容所有类型的 any.


      function handler() {
         // 错误: Event 和 HTMLElement 中的任何一个都不能被赋值给另外一个
         const element = event as HTMLElement;
      }
      // 双重断言
      function handler() {
         const element = (event as any) as HTMLElement; // ok
      }

基本上,当 S 类型是 T 类型的子集,或者 T 类型是 S 类型的子集时,S 能被成功断言成 T(S as T).毫无根据的断言是危险的,如果你想这么做,可以使用 any.

### 6.11 Freshness

1. 为了让检查对象的字面量类型变得更容易,TypeScript 提供了一个 Freshness 的概念(它也会被称为更严格的字面量检查),严格的类型检查会发生在对象字面量上,因为在这种情况下,那些实际没用到的属性可能会拼写错误或被误用.


      function logIfHasName(something: { name?: string }) {
         if(something.name) {
            console.log(something.name)
         }
      }
      const person = { name: 'matt', job: 'being awesome' };
      const animal = { name: 'cow', diet: 'wfasssfd' }
      logIfHasName(person);
      logIfHasName();
      // 在包含name属性的基础上,可以包含字面量约束之外的属性
      logIfHasName({ neme: 'adsadasdasdfdsf' }); // 报错,对象字面量必须指定已知属性,name属性不存在.

2. 我的理解 Freshness 就是对象属性的可选状态,标记为可选的属性可以不必包含,但是包含定义之外的属性就会报错.


      interface State {
         foo: string;
         bar?: string;
      }
      const s: State = {
         foos: 'ddd'  // 报错,不能定义约束之外的属性
      }
      const s1: State = {
         foo: 'ddd',
      }
      const s2: State = {
         foo: 'ddd',
         sdd: 'sadasd'  // 报错,不能定义约束之外的属性
      }

### 6.12 类型保护

在条件块中,TypeScript 的类型推断会根据条件块里确定的变量类型,作出针对性的推断.

      // typeof
      function doSome(x: number | string) {
         if (typeof x === 'string') {
            // 在这个块中,typescript知道x必须是string类型的
            console.log(x.subtr(1)) // 错误, subtr方法没有存在于string上
            console.log(x.substr(1))
         }
         x.substr(1)  // 错误,无法判断x是string
      }
      // instanceof
      class Foo {
         foo = 123;
         common = '13'
      }
      class Bar {
         bar = 123;
         common = '123'
      }
      // ts会根据一直类型做语法校验.
      function foStuff(arg: Foo | Bar) {
         if(arg instanceof Foo) {
            console.log(arg.foo);  // 正确
            console.log(arg.bar);  // 错误
         }
         if(arg instanceof Bar) {
            console.log(arg.foo);  // 错误
            console.log(arg.bar);  // 正确
         }
      }
      // in
      interface A {
         x: number;
      }
      interface B {
         y: string;
      }
      function doStuff(q: A | B) {
         if('x' in q) {
            // q: A
         } else {
            // q: B
         }
      }
      // 字面量,则是一堆枚举值,在if语句块里确定所属类型
      type TriState = 'yes' | 'no' | 'unknown';
      function logOutState(state: TriState) {
         if(state === 'yes') {
            console.log('user selected yes');
         } else if(state === 'no') {
            console.log('user selected no');
         } else {
            console.log('unknown');
         }
      }
      // 使用自定义的类型保护
      class Foo {
         foo = 123;
         common = '13'
      }
      class Bar {
         bar = 123;
         common = '123'
      }
      // 用户自定义的类型保护(罗嗦无用的类型保护)
      function isFoo(arg: Foo | Bar): arg is Foo {
         return (arg as Foo).foo !== undefined;
      }
      // ts会根据一直类型做语法校验.
      function foStuff(arg: Foo | Bar) {
         if(isFoo(arg)) {
            console.log(arg.foo);  // 正确
            console.log(arg.bar);  // 错误
         } else {
            console.log(arg.foo);  // 错误
            console.log(arg.bar);  // 正确
         }
      }

2. 类型保护和回调函数

typescript 并不能假设类型保护在回调中一直有效,所以我们可以考虑将在回调函数中使用的属性事先用另一个变量存储起来.

### 6.13 字面量类型

1. `extends string` 和 `= string`的区别


      export const createCookieManager = <T extends string>(key: string) => {
         const cookieManager = {
            set: (value: T, expires?: string): void => setCookie(key, value, expires),
            get: () : T|null => getCookie(key)
         }
         return cookieManager;
      }
      export const createCookieManager = < T = string >(key: string) => {
         const cookieManager = {
            set: (value: T, expires?: string): void => setCookie(key, value, expires),
            get: () : T|null => getCookie(key)
         }
         return cookieManager;
      }

= string 是默认泛型, 所以 T 还是可以传入别的类型的值,而 extends 是约束泛型,传入的值只能是 string 类型或者 string 类型的子集.

2. 字符串字面量


      let foo: 'Hello';
      foo = 'bar'; // 错误,bar 不能复制给类型 Hello

3. boolean 和 number 字面量


      type OneToFive = 1 | 2 | 3 | 4 | 5;
      type Bools = true | false;

4. 推断


      function iTakeFoo(foo: 'foo') {}
      const test = {
         someProp: 'foo'
      }
      iTakeFoo(test.someProp); // 错误,string 类型的参数不能赋值给 foo 类型的参数
      // 我们可以使用类型断言来解决
      const test = {
         someProp: 'foo' as 'foo'
      }
      iTakeFoo(test.someProp);
      // 或者类型注解
      type Test = {
         someProp: 'foo'
      }
      const test: Test = {
         someProp: 'foo' // 推断 someProp 永远是 foo
      }
      iTakeFoo(test.someProp);

5. 基于字符串的枚举


      function strEnum<T extends string>(o: Array<T>): { [K in T]: K} {
         return o.reduce((res, key) => {
            res[key] = key;
            return res;
         }, Object.create(null))
      }
      // 创建 k:v
      const Direction = strEnum(['North', 'South', 'East', 'West'])
      const D4 = strEnum(['1' , '2', '4' , '5'])
      // 创建一个类型, 这个类型是一串字符串的枚举
      type Direction = keyof typeof Direction
      let simple: Direction;
      simple = 'North';
      simple = 'anything'; // 报错,只能是 North

### 6.14 readonly

1. typescript 允许你在接口里使用 readonly 来标记属性,你可以在接口里标记一个或多个属性为 readOnny,也可以指定类的属性为 readonly,你也可以使用泛型 T 来标记一个类型的属性为 readonly.


      // 在函数参数中使用readonly
      function foo(config: { readonly bar: number, readonly bas: number }) {
         // ...
      }
      const config = { bar: 123, bas: 123 }
      foo(config);  // config则不会被改变
      // 在接口和类中使用readonly
      type Foo = {
         readonly bar: number;
         readonly bas: number;
      }
      const foo: Foo = { bar: 123, bas: 456 }
      foo.bar = 456;  // 错误: foo.bar是只读属性
      class Foo {
         readonly bar = 1;
         readonly bas: string;
         constructor() {
            this.baz = 'hello'
         }
      }

2. 决定不可变

你可以把索引签名标记为只读

      interface Foo {
         readonly [x:number]: number
      }
      const foo: Foo = { 0: 123, 2: 345 }
      console.log(foo[0]); // 正确
      // 如果你想以不变的方式使用原生的JavaScript数组,可以使用TypeScript提供的ReadonlyArray<T>接口
      let foo3: ReadonlyArray<number> = [1, 2, 3];
      foo3.push(4); // 错误,在ReadonlyArray上不存在push,因为它会改变数组

3.  自动推断
    一些情况下,编译器会把一些特定的属性推断为 readonly,例如在一些 class 中,只有一个 getter,没有 setter,它就能被推断为是只读的.

          class Person {
             firstName: string = 'John';
             lastName: string = 'Doe';
             get fullName() {
                return this.firstName + this.lastName;
             }
          }
          const person1 = new Person();
          person1.fullName = 'dadads'; // 错误,fullName属性是只读的

4.  readonly 只能保证属性不能直接被使用者修改,但是当你把这个属性交给其他没有做出这种保证的使用者时,他们可以修改它;


      const foo1: {
         readonly bar: number
      } = {
         bar: 123
      }
      foo1.bar = 444; // 报错
      // readonly只能保证属性不能被创建的对象直接修改,但是不能保证不能够被引用修改.
      function iMutateFoo(foo: { bar: number }) {
         foo.bar = 456;
      }
      iMutateFoo(foo1)
      // console.log(foo1.bar); // 456, 没有做出不可修改的保证,可以修改
      interface Foo {
         readonly bar: number
      }
      let foo2: Foo = {
         bar: 123
      }
      function iMutateFoo1(foo: Foo) {
         foo.bar = 456; // 错误,bar属性是只读的, 做出了不可修改的保证
      }
      iMutateFoo1(foo2)
      console.log(foo2.bar); // 456

### 6.15 泛型

1. 设计泛型的关键动机是在成员之间提供有意义的类型约束,这些成员可以是类的实例成员,类的方法,函数的参数,函数返回值.


      // 约束一个队列的数据类型的泛型
      class Queue1<T> {
         private data: T[] = [];
         push = (item: T) => this.data.push(item);
         pop = ():T => this.data.shift()
      }
      const queue1 = new Queue1<number>()
      queue1.push(0)
      queue1.push('0');
      // 你可以为创建的成员函数添加泛型
      class Utility {
         reverse< T >(items: T[]): T[] {
            const toreturn= []
            for(let i = items.length; i >= 0; i--) {
               toreturn.push(items[ i ]);
            }
            return toreturn
         }
      }

2. 泛型用于函数参数约束


      // 只使用一次的泛型
      declare function parse< T >(name: string): T;
      // 这相当于一个如下的类型断言
      declare function parse(name: string): any;
      const something = parse('something') as TypeOfSomething
      // 用于加载json文件的返回值函数,它会返回任何你传入的类型的Promise
      const getJSON= < T >(config: { url: string; headers? { [key: string]: string } }): Promise< T > => {
         const fetchConfig = {
            method: 'GET',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(config.headers || {})
         };
         return fetch(config.url, fetchConfig).then< T >(response => response.json())
      }
      type LoadUserResponse = {
         user: {  // 内联注解
            name: string;
            email: string
         }[];
      }
      getJSON< LoadUserResponse >({ url: 'xxx' })
      // 用泛型T标注你希望参数匹配的类型
      declare function send< T >(arg: T): void;
      send< SomeType >({
         x: 123
      });  // 如果  {x: 123} 与 SomeType类型不匹配,则会报错

### 6.16 类型推断

1. 从右向左通过赋值推断;
2. 根据 return 语句从底部推断函数的返回值;
3. 根据约束的数据类型推断;
4. 根据赋值的数据类型推断; `var a = 123; // number类型`
5. 存在无法推断一个变量的类型的清醒

1) 未指明函数的参数类型

2) 调用的相关函数是一些 JavaScript 的库函数

有一个编译器标记 noImplicitAny 可以捕获这些 Bug,标记 noImplicitAny 用来指示编译器,在无法判断一个变量的类型时,发出一个错误(或者只将其作为一个隐式的 any).此时,你可以:

- 通过显示添加 any 的类型注解,让它成为一个 any 类型;
- 通过一些更准确的类型注解来帮助 TypeScript 推断类型.

### 6.17 类型兼容性

1. 只要类型的结构匹配,类型的名称不同是可以的;


      interface Point {
         x: number;
         y: number;
      }
      class Point2D {
         constructor(public x: number, public y: number) {}
      }
      let p: Point;
      p = new Point2D(1,2); // 可以.两种类型结构相同

2. 变体

对简单类型 Base 和 Child 来说,如果 Child 时 Base 的子类,则 Child 的实例能被赋值为 Base 类型的变量.

在由 Base 和 Child 组合的复杂类型的类型兼容性中,它取决于相似场景下的 Base 与 Child 的变体;

- 协变: 只在一个方向兼容;
- 逆变: 只在相反的方向兼容;
- 双向协变: 包括同一个方向和不同方向的兼容;
- 不变: 如果类型不完全相同,则它们是不兼容的;

3. 可选参数和 rest 参数是兼容的,而可选参数和不可选参数,只有在 strictNullChecks 为 false 时兼容.


      let foo = (x: number, y: number) => {};
      let bar = (x?: number, y?: number) => {};
      let bas = (...args: number[]) => {};

4. 双向协变

Child 时 Base 的子类, 数组的协变需要所有的函数 Array< Child >都能赋值给 Array< Base >, push（t：Child）能被赋值给 push（t：Base），这都可以通过函数参数双向协变来实现。

5. 枚举与数字类型相互兼容,但是不同枚举的枚举变量是不兼容的.


      enum Status  {
         Ready,
         Waiting
      }
      enum Color {
         Red,
         Blue,
         Green
      }
      let status1 = Status.Ready;
      let num = 0;
      status1 = num;
      num = status1;
      let color = Color.Red;
      status1 = color; // error

6. 只要两个类的实例成员和方法相同,那么他们就是同一类型,构造函数和静态成员不起作用.鸭子理论.
7. 泛型


      interface Empty< T > { }
      let x: Empty< number >;
      let y: Empty< string >;
      // 类型参数只有在被成员使用时,才会影响兼容性
      x = y;  // ok.兼容
      // 类型参数T被成员data使用,会影响兼容性兼容性,导致x 和 y 不兼容
      interface Empty1< T > {
         data: T
      }
      let x1: Empty1< number >;
      let y1: Empty1< string >;
      x1 = {
         data: 4
      };
      x1 = y1 // error, 不兼容

8. 不变性,不变性是唯一合理的选项,这里有一个关于协变和逆变的例子,它被认为对数组是不安全的.


      class Animal {
         constructor(public name: string) { }
      }
      class Cat extends Animal {
         meow() {
            console.log('cat')
         }
      }
      let animal = new Animal('animal');
      let cat = new Cat('cat');
      // 多态  Animalnimal <= Cat
      animal = cat;  // ok, 因为cat类型具有animal类型所有的属性和方法
      cat = animal;  // error, 因为animal类型没有cat属性的meow方法
      // 演示每个数组形式
      let animalArr: Animal[] = [animal];
      let catArr: Cat[] = [cat];
      // 明显的坏处坏处: 逆变
      // Animalnimal <= Cat
      catArr = animalArr;  // 可以,如果有逆变逆变
      catArr[0].meow();    // 允许,但在运行时会报错

      // 另一个坏处坏处: 协变协变
      // Animalnimal <= Cat
      animalArr = catArr;  // 可以,如果有协变

      animalArr.push(new Animal('sadasd')); // 添加一个animal至catArr
      catArr.forEach(c => c.meow());  // 允许,但是会在运行时报错

### 6.18 never

1. never 类型就是 TypeScript 中的底部类型,它代表一些永远都不会发生的事情.nerver 类型会用在如下的场景:

- 一个从来都不会有返回值的函数,例如函数内含有 while(true) {} 的话;
- 一个总会抛出错误的函数, 如 function foo() { throw new Error('Not Implemented') }, foo 的返回类型是 never;

2. never 类型只能被赋值给另外一个 never 类型,因此你可以用它来进行编译时的全面检查.
3. never 与 void 的差异

- void 表示没有任何类型,never 表示永远不存在的值的类型.
- 当一个函数返回空值时,它会返回一个 void;但是,当一个函数根本没有返回值,或者总是抛出错误时,它会返回一个 never.
- 当 strictNullCheck 为 false 时,void 指可以被赋值的类型,但是 never 不能赋值给 never 以外的类型.

### 6.19 辨析联合类型

1. 枚举类型下发生的类型推断:


      interface Square {
         kind: 'square',
         size: number
      }
      interface Rectangle {
         kind: 'rectangle';
         width: number;
         height: number;
      }
      interface Circle {
         kind: 'circle',
         redius: number;
      }
      type Shape = Square | Rectangle | Circle;

      function area(s: Shape) {
         if (s.kind === 'square') {
            // 现在TypeScript知道s的类型是Square
            // 所以,你能够安全的使用size属性
            return s.size * s.size;
         } else {
            // 不是Square类型的,因此TypeScript将会推算出s一定是Rectangle类型的
            return s.width * s.height;
         }
      }
      // 当有人添加了一个枚举类型时,我们期望TypeScript能在需要的地方抛出错误抛出错误
      function area(s: Shape) {
         if (s.kind === 'square') {
            return s.size * s.size;
         } else if (s.kind === 'rectangle'){
            return s.width * s.height;
         } else {
            // 错误: circle类型的数据不能被赋值给never类型
            const _exhaustiveCheck: never = s
         }
      }

      function area(s: Shape) {
         if (s.kind === 'square') {
            return s.size * s.size;
         } else if (s.kind === 'rectangle'){
            return s.width * s.height;
         } else if (s.kind === 'circle') {
            // 类型检查会强制你添加一个条件
            return Math.PI * s.redius * 2;
         } else {
            // 错误: circle类型的数据不能被赋值给never类型
            const _exhaustiveCheck: never = s
         }
      }

2. strictNullChecks

对于 area 函数, 如果你使用 strictNullChecks 做检查,你需要返回 \_exhaustiveCheck 变量,类型为 nevernever,否则 TypeScript 会抛出并非所有的路径都有返回值的错误

3. 版本控制

版本控制,你可以使用一个枚举类型的值来做版本控制,将版本 0 标记为 undefined,这会在使用了 strictNullChecks 选项的时候正常工作

      type DTO = {
         version: undefined,  // 版本0
         name: string,
      } | {
         version: 1,
         firstName: string,
         lastName: string
      } | {
         version: 2,
         firstName: string,
         middleName: string,
         lastName: string
      }

4. Redux

使用联合类型的一个流行的库时 Redux,下面是一个 redux 的使用示例:

      import { createStore } from 'redux';
      type Action = {
         type: 'INCREMENT';
      } | {
         type: 'DECREMENT';
      };
      /**
      * 这是一个reducer,一个带有(state, action) => state的纯函数签名
      * 它描述了一个行为--如何将一个状态转化为另一个状态状态
      * 状态的形状取决于你,可以是一个原始数据类型,一个数组,一个对象
      * 甚至可以是一个Imutablemutable.js的数据结构
      * 最重要的是,如果状态改变了,你不应该改变状态对象,而应该返回一个新对象
      * 在这个例子中,我们使用了switch语句和字符串,但是如果对你的项目有意义,你可以使用一个
      * 遵循不同约定的辅助函数(如映射函数)
      */
      function counter(state = 0, action: Action) {
         switch (action.type) {
            case 'INCREMENT':
                  return state + 1;
            case 'DECREMENT':
                  return state - 1;
            default:
                  return state;
         }
      }
      // 创建一个新的redux仓库仓库,用来存储你的应用的状态
      // 它的api是是 { subscribesubscribe, dispatchdispatch, getState }
      let store = createStore(counter)
      /**
      * 根据返回更改的状态,你可以使用subscribe()来更新界面
      * 在通常情况下,你需要使用一个视图绑定库
      * 而不是直接使用subscribe
      * 但是将当前状态保存到localStore里面也很方便
      */
      store.subscribe(() => console.log(store.getState()));
      // 改变状态唯一的方式就是dispatch一个动作
      // 这些动作可以序列化,记录和存储,然后重播
      store.dispatch({ type: 'INCREMENT' })
      //1
      store.dispatch({ type: 'INCREMENT' })
      // 2
      store.dispatch({ type: 'DECREMENT' })
      // 1

### 6.20 索引签名

1. TypeScript 的索引签名必须是 string 或 number 类型的.
2. JavaScript 在任何一个对象索引签名上都会隐式调用 toString 方法.而在 TypeScript 中.如果你传入引用类型的签名,TypeScript 则强制你必须对引用类型的索引调用 toString()方法.


      let obj = {
         toString() {
            console.log('toString called');
            return 'Hello'
         }
      }
      let obj1 = {
         aa: 'sadasd'
      }
      let foo: any = {};
      foo[ obj ] = 'world'  // error
      foo[ obj.toString() ] = 'world'  // ok

3. 你可以声明一个索引签名


      const foo2: {
         [index: string]: { message: string; name: string }
      } = {}
      foo['a'] = { message: 'dsds', name: 'dsfd' }

4. 当你声明一个索引签名时,所有明确的成员都必须符合索引签名;


      interface Foo: {
         [key: string]: number;
         x: number;
         y: number;
      }
      interface Bar: {
         [key: string]: number;
         x: number;
         y: string;  // 错误,属性y的值必须是number类型
      }

5. 我们可以使用一组有限的字符串字面量来作为索引签名的联合类型.


      type Index = 'a' | 'b' | 'c';
      type FromIndex = { [k in Index]?: number }
      const good: FromIndex = { b: 1, c: 2 }
      // 错误,d属性不存在于FromIndex类型上
      const bad: FromIndex = {b: 1, c: 2, d: 3}

6. 同时拥有 string 和 number 类型的索引签名

同时拥有 string 和 number 类型的索引签名,不是常见的,但是 TypeScript 支持它,string 类型的索引签名比 number 类型的索引签名更严格

      interface ArrStr {
         [key: string]: string | number; // 必须包括所有成员的类型
         [index: number]: string;  // 字符串索引类型的子集
      }

7. 索引签名的嵌套


      interface NestedCss {
         // 有效变量
         color?: string;
         // 字符串索引
         [selector: string]: string | NestedCss
      }
      const example: NestedCss = {
         color: 'red',
         '.subclass': {
            color: 'blue'
         }
      }
      // colour不会捕获到错误,不要用这种方式把字符串索引与有效变量混合使用
      const failsSilently: NestedCss = {
         colour: 'red'
      }
      // 相反,我们要把索引签名分离到自己的属性里,如命名为nestnest,或者children, subnodes等
      interface NestedCss1 {
         color?: string;
         nest?: {
            [selector: string]: NestedCss1
         }
      }
      const example1: NestedCss = {
         color: 'red',
         nest: {
            '.subclass': {
                  color: 'blue'
            }
         }
      }
      const failsSilently1: NestedCss1 = {
         colour: 'red' // 错误,未知属性 colour
      }

8. 你可以使用交叉类型来创建一个兼容旧类型的新类型,但这样创建的类型只能为已存在的 TypeScript 类型建模,不能用作新创建的对象的类型约束


      type FieldState = {
         value: string;
      }

      type FromState = {
         isValid: boolean; // 错误,不符合索引签名
         [filedName: string]: FieldState
      }
      // 报错是因为添加的索引签名并不兼容它原有的类型,使用交叉类型可以解决上述问题
      type FromState1 = {
         isValid: boolean
      } & {
         [filedName: string]: FieldState
      }

      // 需要注意的是,你可以声明它为已存在的TypeScript类型建模,但是你不能使用TypeScript创建如下的对象
      type FromState2 = {
         isValid: boolean
      } & {
         [filedName: string]: FieldState
      }
      // 可以将它用于从某些地方获取的JavaScript对象
      declare const foo3: FromState2
      const isValidBool = foo3.isValid;
      const somethingFieldState = foo['something']
      // 使用它来创建一个对象将不起作用,报错
      const bar2: FromState2 = {
         isValid: false
      }

### 6.21 类型移动

1. 复制类型和值


      class Foo { }
      const Bar = Foo;
      let bar: Bar;  // 错误,不能找到Bar


      namespace importing {
         export class Foo { }
      }
      // 如果你使用命名空间或模块,那么就只能使用import关键字
      // 这个import技巧,仅适用于类型和变量
      import Bar1 = importing.Foo;
      let bar1: Bar1  // ok

2. 捕获变量的类型

你可以通过 typeof 告诉编译器,一个变量的类型与其他类型相同.

      let foo = 123;
      let bar: typeof foo;  // bar类型与foo类型相同
      bar = 456;
      bar = '789'; // error

3. 捕获成员的类型


      class Foo {
         foo: number;
      }
      declare let _foo: Foo;
      let bar: typeof _foo.Foo;

4. 捕获字符串类型
   许多 JavaScript 库和框架都是用原始的 JavaScript 字符串,你可以使用 const 定义一个字符串字面量.


      // 捕获字符串的类型与值
      const foo = 'Hello World';
      // 使用捕获到的类型
      let bar: typeof foo;
      // bar 只能被赋值为 Hello World
      bar = 'Hello World'; // 可以
      bar = 'other';  // 错误

5. 捕获键的名称


      const colors = {
         red: 'red',
         blue: 'blue'
      };
      type Colors = keyof typeof colors;
      let color: Colors;
      color = 'red';  // ok
      color = 'blue'; // ok
      color = 'other color'; // error

### 6.22 异常处理

1. 错误子类型

- 1. RangeError

当数字类型的变量或参数超出其有效范围时,会出现 RangeError 的错误提示;

`console.log(new Array(10000000000)); // RangeError: 数组长度无效`

- 2. ReferenceError

当引用无效时,会出现 ReferenceError 的错误提示;

`console.log(notValidVar); // ReferenceError: notValidVar is not defined`

- 3. SyntaxError

当解析无效的 JavaScript 代码时,会出现 SyntaxError 的错误提示.

`1 *** 3 // SyntaxError: 无效的标记`

- 4. TypeError

变量或参数不是有效类型时,会出现 TypeError 的错误提示.

`'1.2'.toPrecision(1); // TypeError: '1.2'.toPrecision is not a function.`

- 5. URIError

当向 encodeURI（）和 decodeURI（）传入无效参数时，会出现 URIError 的错误提示。

`decodeURI('%'); // URIError: URL异常`

2. 让你需要抛出一个错误时,尽量使用 Error,而不是一个字符串,这样会带来痛苦的调试体验,并使日志中的错误分析复杂化.

3. 并不是一定要 throw 一个错误,你可以将错误作为回调函数的第一个参数传递.


      function myFunction(callback: (e: Error)) {
         doSomething(function() {
            if(someError) {
               callback(new Error('something wrong'))
            } else {
               callback()
            }
         })
      }

4. 错误捕获存在的一些问题

- 1. 不清楚从哪里抛出的错误,当对一块代码使用 try...catch 来捕获错误的时候,会导致代码审查人员不知道错误具体是由哪个函数抛出的.

- 2. 你可以单独给每个函数的执行添加 try...catch 来捕获错误,但是如果两个函数值之间有一些牵连的情况,代码会显得混乱.

- 3. 抛出错误并不总是最合适的选择,我们可以借助类型系统来更好地处理错误的返回.


      function validate(
         value: number;
      ): {
         error?: string;
      }{
         if(value < 0 || value > 100) {
            return { error: 'valid value' }
         }
      }

除非你想用通用的方式(try/catch)来处理错误,或者不要抛出错误(开发环境可以抛出错误);

### 6.23 混合

1. 混合是一个函数.

- 传入一个构造函数;
- 创建一个带有新功能,并且扩展构造函数的新类;
- 返回这个新类;

2. 混合的示例如下


      // 1. 创建一个构造函数
      type Constructor< T = {} > = new (...args: any[]) => T;
      // 2. 扩展一个类并返回它, 一个扩展自Base类的函数
      function TimesTamped< TBase extends Constructor>(Base: TBase) {
         return class extends Base {
            timestamp = Date.now();
         }
      }

### 6.24 ThisType

1. ThisType< T >的接口,在 lib.d.ts 中只是被声明为空的接口,除了可以在对象字面量上下文中被识别外,该接口的作用等同于任何一个空接.


      // 使用 --noImplicitThis 进行编译
      type Point = {
         x: number;
         y: number;
         moveBy(dx: number, dy: number): void;
      };
      let p: Point = {
         x: 10,
         y: 20,
         moveBy(dx, dy) {
            this.x += dx;  // this具有Point的类型
            this.y += dy;
         }
      }
      let foo = {
         x: 'hello',
         f(n: number) {
            this; // {x: string, f(n: number): void }
         }
      }
      let bar = {
         x: 'hello',
         f(this: { message: string }) {
            this;  // { message:string }
         }
      }
      // 使用 --noImplicitThis进行编译
      obj.f = function(n) {
         return this.x - n;  // this具有与obj相同的类型
      }
      obj[' f '] = function(n) {
         return this.x - n;  // this具有与obj相同的类型
      }
      // 使用 --noImplicitThis进行编译
      type ObjectDescriptor< D & M > = {
         data?: D,
         methods?: M & ThisType< D & M >; // 在 D & M方法中,this的类型
      }
      function mekeObject< D & M >(desc: ObjectDescriptor< D,M >): D & M {
         let data: object = desc.data || {};
         let methods: object = desc.methods || {};
         return { ...data, ...methods } as D & M;
      }
      let obj = makeObject({
         data: { x: 0, y: 0 },
         methods: {
            moveBy(dx: number, dy: number) {
               this.x += dx; // 强化this的类型
               this.y += dy;
            }
         }
      });
      obj.x = 10;
      obj.y = 20;
      obj.moveBy(5,5);

## 第 7 章

1. TypeScript 支持 jsx 转换和代码分析,JSX 是 ECMAScripy 的类似于 XML 的语法扩展,没有特定的语义,它不由引擎或浏览器实现,JSX 被各种转义器使用,并把它们接收的内容转换为标准的 ECMAScript;
2. React 渲染 HTML 和组件的依据是首字母的大小写,foo 被认为是 HTMK 标签,而 Foo 则被认为是一个组件,他们分别触发 React.createElement('div')和 React.createElement(MyComponent).
3. react-jsx.d,ts 已经定义了所有主要标签的类型.


      declare namespace JSX {
         interface IntrinsicElements {
            a: React.HTMLAttributes;
            abbr: React.HTMLAttributes;
            div: React.HTMLAttributes;
            span: React.HTMLAttributes;
         }
      }

4. 函数组件


      type Props = {
         foo: string;
      }
      const MyComponent: React.FunctionComponent< Props > = props => {
         return <span>{props.foo}</span>
      }
      <MyComponent foo="bar" />;

5. 类组件


      type Props = {
         foo: string;
      }
      class MyComponent extends React.Component< Props, {} > = props => {
         render() {
            return <span>{props.foo}</span>
         }
      }
      <MyComponent foo="bar" />;

6. 接收组件的实例

React 类型声明文件提供了 React.ReactElement<T>,它可以让你通过传入<T/>,来注解类组件实例化的结果.

      class MyComponent extends React.Component {
         render() {
            return <div>hello</div>
         }
      }
      const foo: ReactElement<MyComponent> = <MyComponent />;  // 正确,注解类组件实例化的结果就是组件T
      const bar: ReactElement<MyComponent> = <NotMyComponent />;  // 正确

7. 可以接收 props,并使用 JSX 渲染的组件


      const X: React.Component<Props> = foo; // 来自其他地方
      <X {...props} />

8. 泛型组件


      type SelectProps<T> = { items: T[] };
      class Select<T> extends React.Component<SelectProps<T>, any> {};
      // 用例
      const Form = () => <Select<string> items={['a','b']}>

9. 泛型函数


      function foo<T>(x: T): T {
         return x;
      }
      const foo = <T>(x: T) => T; // 错误: T标签没有关闭
      // 使用extends来提示编译器这是个泛型
      const foo = <T extends {}>(x: T) => x;

10. 强类型的 ref
    使用强类型 ref 的基本做法是,将变量初始化为 ref 和 null 的联合类型,然后将其初始化为回调;

          class Example extends React.Component {
             example() {
                // ...
             }
             render() {
                return <div>Foo</div>
             }
          }
          class Use {
             exampleRef: Example | null  = null;
             return <Example ref={exampleRef => (this.exampleRef = exampleRef) } />
          }
          // 使用原生元素也是一样的
          class FocusingInput extends React.Component< { value: string; onChange: { value: string } => any }, {}> {
             input: HTMLInputElement | null = null;
             render() {
                return (
                   <input ref={input => (this.input = input)}
                      value={this.props.value}
                      onChange={e => {
                         this.props.onChange(e.target.value)
                      }}
                   />
                )
             }
          }

11. defaultProps 的另一种写法


      class Hello: React.SFC<{
         compiler?: string;
         framework
      }> = ({
         compiler = 'TypeScript',
         framework
      }) => {
         return (
            <div>
               <div>{compiler}</div>
               <div>{framework}</div>
            </div>
         )
      }

12. 你可以通过自定义 jsxFactory 转义器来转化 jsx 部分,使用与默认的 React 方式不同的 jsx factory.

## 第 8 章

1.  boolean 选项
    选项为 boolean 的 compilerOptions,可以指定为 tsconfig.json 下的 compilerOptions

          {
             "compilerOptions": {
                "someBooleanOption": true
             }
          }
          // 或者使用命令行, 所有这些选项的默认值都是false
          tsc --someBooleanOption

2.  noImplicitAny

noImplicitAny 选项,当开启这个选项时,标记无法被推断的类型的情况;

      function log(someArg) {  // 错误: someArg 是 any 类型的
         sendDataToServer(someArg);
      }

你可以选择为 someArg 添加类型注解,或者直接将其标记为 any.

3. strictNullChecks

默认情况下, null 和 undefined 都可以被赋值给 TypeScript 中的所有类型.

      let foo: number = 123;
      foo = null;  // ok
      foo = undefined; // ok

非严格模式下,undefined 可能导致运行时错误.

      interface Member {
         name: string;
         age?: number;
      }
      getMember().then((member: Member) => {
         // toString属性可能是undefined
         // 在严格模式下,这个错误将会在编译时被捕获.
         const stringifyAge = member.age.toString()
      })

- 1. 非空断言操作符

我们可以使用非空断言操作符来断言运算对象是非 null 和非 undefined 的.

      // 用 --strictNullChceks开启严格模式进行编译
      function validateEntity(e?: Entity) {
         // 如果e是null,undefined或其他无效的实体,则抛出错误
      }
      function processEntity() {
         validateEntity(e);
         let a = e.name;  // 错误: e 可能是undefined
         let b = e!.name;  // 可以,我们已经断言e是非undefined
      }

- 2. 明确赋值断言操作符

告诉编译器我已为相关变量或属性做了初始化或者赋值操作.

      class C {
         foo: number;
         bar: string = 'hello';
         baz: boolean; // 错误,属性baz没有初始化,也没有在构造器中被赋值
         constructor() {
            this.foo = 42;
         }
      }
      // 你可以使用感叹号,明确赋值断言操作符,告诉TypeScript你已经在其他任何地方对他进行了初始化
      class C {
         foo: number;
         bar: string = 'hello';
         baz: boolean; // 错误,属性baz没有初始化,也没有在构造器中被赋值
         constructor() {
            this.foo = 42;
         }
      }
      // 你可以在变量声明的时候使用明确赋值断言操作符
      let a: number[];
      let b!: number[]
      initilize()
      a.push(4);  // 错误: 在变量赋值之前被使用
      b.push(4);  // 可以,因为做了断言
      function initilize() {
         a = [0, 1, 2, 3];
         b = [0,1,2,3]
      }

## 第 9 章

1. 解读错误

TypeScript 是一门专注于帮助开发人员的编程语言,当错误出现时,它会尽可能提供非常有用的错误信息.

2. 错误信息分裂

- 1. 简洁的错误信息

简洁的错误信息提供了一个编译器对错误号及错误信息的常规描述.

      TS2345: Argument of type '{ foo: number; bar: () => string; }' is not assignable to parameter of type 'somethingComplex';

- 2. 详细的错误信息

详细的错误信息会一步步引导你找到错误的根本原因,IDE 通常会在详细的错误提示之后显示一个简洁的版本.如果你想寻找类似的错误,可以使用简洁的错误信息版本的错误编号 TSXXX;

3. 常见的错误

- 1. TS2304

使用了一些第三方库,但是并未声明时抛出错误;

- 2. TS2307

将第三方库作为模块来使用了,但是缺少与之对应的环境声明文件则会抛出错误;

- 3. TS1148

你需要指定 --module 选项或者在 jsconfig.json 里面配置 module 选项,否则无法编译模块.

- 4. 捕获不能有类型注解的简短变量


      try {
         somsthing()
      } catch(e) {
         // 捕获不能有类型注解的尖端变量
         // 使用类型保护
         if(e instanceof Error) {

         }
      }

- 5. 接口 ElementClass 不能同时扩展两个 Component 类型

当编译上下文中同时含有两个 react.d.ts 时,会发生这种错误,修复方法如下:

(1) 删除 node_modules 和任何 package-lock(或 yarn-lock),然后再执行一次 npm install;

(2) 如果这不起作用,就去查找无效的模块,并将其报告给相关项目,你所使用的模块都应该将 react.d.ts 作为 peerDependencies,而不是 dependencies 来使用.

## 第 10 章

1. 你只需运行 npm audit 即可对你的 Node 项目进行审查,它将高亮显示包以及包依赖项中存在的任何漏洞.
2. Jest 是一个出色的单元测试选项,它提供了良好的 TyeScript 支持,它提供了全局的 test 函数并内酯类全局的 except 断言语法.
3. Jest 内置了对 async/await 的支持
4. 选择 jest 的理由

- 内置的断言库
- 强大的 TypeScript
- 非常可靠的测试观察模式
- 快照测试
- 内置的测试覆盖率报告
- 内置的 async/await 支持

4. 我们可以使用 Husky 帮助我们在提交前自动格式化代码;

## 第 11 章

### 11.1 名义化类型

1. 使用字面量类型.


      // 泛型Id类型
      type Id<T extends string> = {
         type: T;
         value: string;
      }
      // 特殊的Id类型
      type FooId = Id<'foo'>;
      type BarId = Id<'bar'>;
      // 可选: 构造函数
      const createFoo = (value: string): FooId => ({ type: 'foo', value });
      const createBar = (value: string): BarId => ({ type: 'bar', value });
      let foo = createFoo('sample');
      let bar = createBar('sample');
      foo = bar;  // 错误
      foo = foo;

优点: 不需要进行类型断言.

缺点: 如上面的结构 `{type, value}`可能不那么尽如人意,而且需要服务器序列化支持.

2. 使用枚举

在 TypeScript 中,枚举提供一定程度的名义化类型.如果两个枚举的命名不同,则它们不相等.利用这一事实,来为结构上兼容的类型提供名义化类型.

- 创建一个只有名字的枚举
- 利用这个枚举与实体结构创建一个交叉类型(&)


      //为结构上兼容的类型提供名义化类型
      enum FooIdBrand { };
      type FooId = FooIdBrand & string;
      enum BarIdBrand { };
      type BarId = BarIdBrand & string;
      let fooId: FooId;
      let barId: BarId;
      // 类型安全
      fooId = barId;  // 错误
      barId = fooId;  // 错误
      // 新建
      fooId = 'foo' as FooId;
      // 两种类型都与基础的类型兼容
      let str: string;
      str = fooId;
      str = barId;

3. 使用接口来打破类型的兼容性

- 在类型上添加一个不用的属性,用来打破类型兼容性.
- 在需要时使用类型断言

      // 使用接口打破类型的兼容性兼容性
      interface FooId extends String {
         _fooIdBrand: string;  // 防止类型错误
      }
      interface BarId extends String {
         _barIdBrand: string;  // 防止类型错误
      }
      // 用例
      let fooId: FooId;
      let barId: BarId;
      // 类型安全
      fooId = barId;   // error
      barId = fooId;   // error
      fooId = <FooId>barId;   // error
      barId = <BarId>fooId;   // error
      // 新建
      fooId = 'foo' as any;
      barId = 'bar' as any;
      // 如果你需要以字符串作为基础基础
      var str: string;

### 11.2 状态函数

1. 在其他编程语言中,有一个常见的特性是,它们使用 static 关键字来增加函数变量的生命周期,使其超出函数的调用范围.


      void called() {
         static count = 0;
         count++;
         printf("called: %d", count);
      }
      int main() {
         called();
         called();
         return 0;
      }

由于 JavaScript/TypeScript 并没有静态函数的功能,你可以使用一个包裹着本地变量的抽象变量,比如 class.

      const { called } = new class {
         count=0;
         called = () => {
            this.count++;
            console.log("called: ${this.count}")
         }
      }();
      called();
      called();

### 11.3 柯里化

1. 柯里化是一个接收一系列参数之后在开始运算的函数.


      const curry = (fn, ...args) => {
         return args.length < fn.length ? (...arguments) => curry(fn, ...args, ...arguments) : fn(...args)
      };
      function countTotal(a, b, c, d) {
         return a + b + c + d;
      }
      var sum = curry(countTotal);
      sum(1)(2)(3)(4);

### 11.4 泛型的实例化类型

1. 你想为一个特定的类型创建专用的版本,方式是将它复制到一个新变量里,并用具体类型代替泛型的类型注解.


      class Foo<T> {
         foo: T;
      }
      const FooNumber = Foo as { new (): Foo<number> }; // 用Foo的实例去约束FooNumber的类型.

2. 如果你在基类上使用修饰器,继承类可能没有与基类相同的行为,因为它不再被修饰器包裹.
3. 如果灭有一个单独的类,你仍然需要写出一个有效的强制/断言模式.


      function id<T>(x: T) {
         return x;
      }
      const idNum = id as { (x: number): number }

### 11.5 对象字面量的惰性初始化

1. 惰性初始化简单理解就是给变量定义一个类型约束,可以在之后再对改变量的相关属性做初始化.


      interface foo {
         bar: number;
         bas: string;
      }
      let foo = {} as Foo;
      foo.bar = 123;
      foo.bas = 'hello world';

### 11.6 类是有用的

### 11.7 默认导出是有害的

1. 默认导出是不推荐的做法,建议直接使用 export 导出,然后使用结构的形式导入.
2. 不使用默认导出的理由.

- 1. 可发现性差,如果导入出错,没办法获得智能提示

- 2. 使用 export 导出的内容,ts 可以根据模块的到处信息给与开发者有用的提示,包括一些拼写错误的提示.

- 3. 默认导出与 Dommonjs 互用的时候体验很不好

引入导出的模块必须使用 `const {default} = require('module/foo')` 而不是 `const { Foo } = require('module/foo')`

- 4. 非默认到处的模块能够被更好的识别,从而可以帮你实现以来的模块的自动导入的功能

### 11.8 减少 setter 属性的使用

1. 要尽量使用更精确的 set/get 函数(如 setBar,getBar),减少使用 setter/getter,这样可以使得开发者更明确的知道自己调用的函数将会发生什么样的改变.

### 11.9 谨慎使用--outFile

### 11.10 TypeScript 的静态构造函数

1. ts 和 js 一样没有静态构造函数,但是你可以通过 static 类实现相同的效果.


      class MyClass {
         static initalize() {

         }
      }
      MyClass.initalize();

### 11.11 单例模式

1. 全局变量,对于类来说可以使用单例来控制,也可以使用命名空间实现, 对于大部分使用者来说,通过创建一个模块实现.

### 11.12 函数参数

1. 如果函数参数比较多,可以考虑传入一个对象,然后以结构的方式接收处理,这样足够简洁清晰,且有利于发现错误和进行代码审查.

### 11.13 构建切换

1. 通过设置和使用 process.env.NODE_ENV 变量可以实现构建环境的切换.

### 11.14 barrel

1. barrel 就像一个容器,它的作用是将分散在多个模块的导出合并到一个模块里.

### 11.15 创建数组

### 11.16 类型安全的 Event Emitter

### 11.17 Reflect Metadata

### 11.18 协变与逆变

1. 粗浅的理解,协变时从父类到子类, 逆变是从子类到父类.
2. 在 TypeScript 中,参数类型是双向协变的,也就是说既是协变又是逆变的,而这并不安全.
3. 我们允许不可变(Immutable)的列表在它的参数类型上是协变的,但是对于可变(Mutable)的列表,其参数类型则是不变的,既不是协变也不是逆变的.

## 第 12 章

1. 使用首字母小写的驼峰格式命名变量和函数.
2. 使用首字母大写的形式定义类.
3. 使用 PascalCase 形式为接口命名。
4. 类型别名以小写字母开头的驼峰格式命名,和类的成员使用相同的格式进行命名.
5. 命名空间使用 PascalCase 形式进行命名。
6. 枚举类型使用 PascalCase 形式进行命名。
7. 如果一个值是 api 的一部分,则建议使用 null,如果是属性值,则建议使用 undefined.
8. 当需要联合类型和交叉类型时,建议使用 type.

## 第 13 章

### 13.1 编译器

1. TypeScript 编译器源文件位于 src/compiler 目录下（详见参考资料[38]），它分为下面几个关键部分.

- Scanner 扫描器(scanner.ts)
- Parser 解析器(parser.ts)
- Binder 绑定器(binder.ts)
- Checker 检查器(checker.ts)
- Emitter 发射器(emitter.ts)

2. 处理概览

SourceCode(源代码) ~~ 扫描器 -> token 流

token 流 ~~ 解析器 -> AST(Abstract Syntax Tree, 抽象语法树)

AST ~~ 绑定器 -> Symbol 符号

符号(Symbol)是 TypeScript 语义系统的主要构造块,如上所示,符号是绑定的结构,符号将 AST 中的声明节点与相同尸体的其他声明连接起来.

符号和 AST 是检查器用来验证源代码语义的.

AST + 符号 ~~ 检查器 -> 类型验证

最后,当需要输出 JavaScript 时,如下所示:

AST + 检查器~~发射器 -> JavaScript 代码.

3. 文件: 核心工具

core.ts 是 TypeScript 编译器使用的核心工具集,其中`let objectAllocator: ObjctAllocator`是一个定义为全局单例的变量,它提供以下定义.

- getNodeConstructor
- getSymbolConstructor
- getTypeConstructor
- getSignatureConstructor(签名用于索引,调用和构造)

4. 文件: 关键数据结构

type.ts 包含整个编译器所使用的关键数据结构和接口,以下是一部分.

- SyntaxKind AST: 节点类型通过 SyntaxKind 枚举进行识别;

* TypeChecker: 类型检查器提供的接口;
* CompilerHost: 用于程序和系统之间的交互;
* Node AST 节点

5. 文件: 系统

系统文件即 system.ts, TypeScript 编译器与操作系统的所有交互均通过 System 接口进行,而接口及其实现均定义在 syatem.ts 中,你可以将其视为操作环境(Operating Environment).

### 13.2 程序

程序定义在 program.ts 中,编译上下文在 TypeScript 编译器中被视为一个 Program,它包含 SourceFile 和编译选项.

1. CompilerHost 的使用

CompilerHost 是与操作环境进行交互的机制.

      Program使用 -> CompilerHost使用 -> System

用 CompilerHost 做中间层的原因是,这样可以让接口对 Program 的需求进行细粒度的调整,而无需考虑操作环境的需求,Program 无需关心 System 的 fileExists 函数.

2. SourceFile

程序提供了一个 API,用于获取 SourceFile: getSourceFiles(): SourceFile[]. 其得到的每个元素均是一个抽象语法树的根节点.

### 13.3 抽象语法树

1. Node 节点

节点是抽象语法树的基本构造块.

AST 节点文档由两个关键部分构成,一个是节点的 SyntaxKind 枚举,用于标识 AST 中的类型,另一个是其接口,即在实例化 AST 时,节点所提供的 API;

下面是节点接口的一些关键成员:

- TextRange: 标识该节点在源文件中的起止位置;
- parent?: Node,指当前节点(在 AST 中)的父节点;

2. SourceFile

SourceFile 包含两部分, 即 SyntaxKind.SourceFile 和 interface.SourceFile.(枚举类的 SourceFile 和接口的 SourceFile).每个 SourceFile 都是一个 AST 的根节点,它们包含在 Program 中.

3. AST 技巧: 访问子节点


      export function forEachChild<T>(node: Node, cbNode: (node: Node) => T,
      cbNodeArray?: (nodes: Node[]) => T): T {
         if(!node) {
            return;
         }
         switch(node.kind) {
            case SyntaxKind.BinaryExpression:
               return visitNode(cbNode, (<BinaryExpression>node).left) ||
                  visitNode(cbNode, (<BinaryExpression>node).operatorToken) ||
                  visitNode(cbNode, (<BinaryExpression>node).right);
            case SyntaxKind.IfStatement:
               return visitNode(cbNode, (<IfStatement>node).left) ||
                  visitNode(cbNode, (<IfStatement>node).operatorToken) ||
                  visitNode(cbNode, (<IfStatement>node).right);
         }
      }

4. AST 技巧: SyntaxKind 枚举

SyntaxKind 被定义为一个常量枚举.

      export const enum SyntaxKind {
         Unknown,
         EndOfFileToken,
         SingleLineCommentTrivia,
      }

### 13.4 扫描器

TypeScript 扫描器的源代码位于 scanner.ts 中,在内部,由解析器控制扫描器将源代码转化为抽象语法树(AST),其期望结果如下:

      SourceCode ~~ 扫描器 -> token流 ~~解析器 -> AST

1. 即使 TypeScript 解析器有单例扫描器,你仍然可以使用`createScanner`创建独立的扫描器,然后用 setText/setTextPos 随意扫描文件的不同位置.

### 13.5 解析器

TypeScript 解析器代码均位于 parser.ts 中,在内部,由解析器控制扫描器将源代码转化为 AST,其期望结果如下:

      SourceCode ~~ 扫描器 -> token流 ~~解析器 -> AST

### 13.6 绑定器

大多数 JavaScript 转一起都比 TypeScript 转一起简单,因为它们技术没提供代码分析的方法,典型的 JavaScript 转换器只有以下流程.

      源代码 ~~ 扫描器 -> token ~~ 解析器 -> AST ~~发射器 -> JavaScript

上述流程缺失了 TypeScript 的语义系统,为了协助类型检查(由检查其执行),绑定器将源代码的各部分连接成一个相关的类型系统,供检查器使用,绑定器的主要职责时创建符号(Symbol).

1. 绑定器实际上通过 objectAllocator.getSymbolConstructor 来获取构造器;


      // 构造器的代码
      function Symbol(flags: SymbolFlags, name: string) {
         this.flags = flags;
         this.name = name;
         this.declarations = undefined;
      }

SymbolFlags 符号标记是个标记美剧,用于识别额外的符号类别,如变量作用域标记: FunctionSopedVariable, BlockScopedVariable.

2. 检查器对绑定器的作用;


      // 调用栈
      program.getTypeChecker =>
         ts.createTypeChecker(检查器中) ->
            initializeTypeChecker(检查器中) ->
               for each SourceFile 'ts.bindSourceFile' (绑定器中)
               // 接下来
               for each SourceFile 'ts.mrgeSymbolTable' (检查器中)

SourceFile 是绑定器的工作单元,binder.ts 由 check.ts 驱动.

### 13.7 检查器

检查器位于 checker.ts 中,是编译器中最大的部分.

1. 初始化全局符号表


      forEach(host.getSourceFiles(), file => {
         if(!isExternalModule(file)) {
            mergeSymbolTable(globals, file.locals)
         }
      })

2. 检查器使用本地的 error 函数报告错误.

### 13.8 发射器

TypeScript 编译器提供了两个发射器:

- emitter.ts: TypeScript 编译为 Javascript 的发射器;
- declarationEmitter.ts: 这个发射器用于为 TypeScript 源文件(.ts)创建声明文件(.d.ts)

1. 大部分的发射器不关心 SourceMap,它们以相同的方式使用这些含有或不含有 SourceMap 的本地函数.
