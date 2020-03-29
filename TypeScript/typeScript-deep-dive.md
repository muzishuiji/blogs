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

### 3.3 rest 参数

### 3.4 let

### 3.5 const

### 3.6 解构

### 3.7 扩展运算符

### 3.8 for...of

### 3.9 迭代

### 3.10 模板字符串

### 3.11 Promise

### 3.12 generators

### 3.13 async/await

## 第 4 章 TypeScript 项目构成

本章将会介绍 TypeScript 项目中的编译上下文,声明空间,魔魁啊,命名空间和动态导入表达式.

## 第 5 章

学习如何快速创建一个 TypeScript 项目

## 第 6 章

学习 TypeScript 的类型系统,通过学习,将能够理解并灵活运用类型注解,将为我们进一步了解类型系统做好铺垫.

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
