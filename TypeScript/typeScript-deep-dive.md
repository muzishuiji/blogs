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

## 第 7 章

本章将介绍 React JSX 中如何使用 TypeScript

## 第 8 章

这一章将介绍编译选项,会着重介绍 noImpliciAny 和 strictNullChecks。.

## 第 9 章

本章介绍在 TypeScript 中常见的错误的原因及错误的处理办法.

## 第 10 章

这一章将介绍 TypeScript 开发与测试中常用的一些工具,如 npm,jest,Prettier,Husky, Eslint, Changelog 等.

## 第 11 章

本章将介绍在真实项目中使用 TypeScript 时的一些小技巧和一些好的建议.

## 第 12 章

本章将推荐一些 TypeScript 的代码风格。

## 第 13 章

本章将介绍 TypeScript 的编译原理，让读者知其然，并知其所以然。
