## 什么是继承

1. 继承的概念

继承简单来说就是使子类拥有父类的属性和方法,而不需要重复编写相同的代码.

举个例子,飞机有客运机和战斗机,这两种机型的共有属性是颜色,公有方法是起飞,但是客运机的承载的是乘客,而战斗机承载的是子弹,它还有一个功能是射击.我们就可以创建一个父类,具有属性颜色和方法起飞,这样客运及和战斗机这两个子类就可以继承该父类,然后在父类的基础上扩展自己的属性和方法.

2. 原型

继承要靠原型来实现,我们先来了解一下原型的概念.

- 所有对象都有一个属性 **proto** 指向一个对象，也就是原型
- 每个对象的原型都可以通过 constructor 找到构造函数，构造函数也可以通过 prototype 找到原型
- 所有函数都可以通过 **proto** 找到 Function 对象
- 所有对象都可以通过 **proto** 找到 Object 对象
- 对象之间通过 **proto** 连接起来，这样称之为原型链。当前对象上不存在的属性可以通过原型链一层层往上查找，直到顶层 Object 对象

## 实现继承的方式

查找一个对象的属性或者方法,首先会在该对象上查找,找不到会沿着原型链向上查找,因此实现继承也就是使得一些方法和属性在该对象的原型链上,这样该对象也就具有了这些属性和方法.

### 原型链继承

#### 原型链继承的实现

原型链的继承即创建构造函数的多个实例,从而这多个实例就拥有了构造函数的属性和方法.示例代码:

    // 片段A
    function Plane(color) {
        this.color = color
    }
    Plane.prototype.fly = function() {
        console.log('flying')
    }
    // Fighter 构造函数
    function Fighter() {
        this.bullets = []
    }
    // 继承Plane构造函数的属性和方法
    Fighter.prototype = new Plane('blue')
    // 特有方法
    Fighter.prototype.shoot = function() {
        console.log('biu biu biu')
    }
    var fighter1 = new Fighter()
    console.log(fighter1.color)   // blue
    fighter1.fly()    // flying

这样 fighter1 就具有了父类 Plane 的 color 属性和 fly 方法,并在此基础上扩展了自己的 shoot 方法.

#### 原型链继承的不足

- constructor 指向问题
  代码片段 A 的写法会导致一个 constructor 指向的问题.


        // 正常情况下
        function A(color) {
            this.color = color
        }
        var a = new A()
        a.__proto__ = A.prototype
        a.constructor = A.prototype.constructor = A
        // 片段A的写法
        filter.__proto__  = Filter.prototype
        filter.constructor = Filter.prototype.constructor
        // 由于Filter.prototype = new Plane(),我们手动更改了Filter的prototype属性
        // 所以有
        Filter.prototype.constructor = Plane
        filter.constructor = Plane
        // 为了解决上述问题,我们需要对片段A的代码做以下调整
        Fighter.prototype. = new Plane()
        Fighter.prototype.constructo = Fighter
        console.log(filter.constructor)     // Filter

- 属性共享问题

多个实例共享父类构造函数的属性,如果共享的属性是引用类型,会导致其中一个示例最这些属性做了更改影响到其他实例中对该属性的使用.属性共享会导致数据污染,代码的可维护性降低.

- 参数

如代码片段 A 这样,Fighter 构造函数创建的实例的继承得来的 color 属性都是 blue,实例的颜色最好统一是 blue,不然后面一个个修改 color,代码的复用性的降低了.

### 构造函数继承

#### 构造函数继承的实现

        // 片段B
        function Plane(color) {
            this.color = color
        }
        Plane.prototype.fly = function() {
            console.log('flying')
        }
        function Fighter(color, content) {
            Plane.call(this, color)
            this.content = content
        }
        Fighter.prototype.shoot = function() {
            console.log('biu biu biu')
        }
        var flighter1 = new Fighter('blue', 'zidan');
        console.log(flighter1.color);  // blue
        console.log(flighter1.content); // zidan
        flighter1.shoot(); // 'biu biu biu';
        flighter1.fly();   //  Uncaught TypeError: flighter1.fly is not a function
        at <anonymous>:19:15

#### 构造函数继承的不足

构造函数继承的不足就片段 B 中既可以看出,它只能实现继承构造函数本身的属性和方法,而不能继承构造函数原型上的属性和方法.

### 组合继承

#### 组合继承的代码实现

组合继承, 顾名思义是原型链继承和构造函数函数继承的组合.父类的属性通过构造函数继承为私有属性,父类的方法通过原型链继承,弥补了原型链继承和构造函数继承的不足

    function Plane(color) {
        this.color = color
    }
    Plane.prototype.fly = function() {
        console.log('flying')
    }
    function Fighter(color) {
        Plane.call(this, color)
        this.bulltes = []
    }
    Fighter.prototype = new Plane()
    Fighter.prototype.constructor = Fighter
    Fighter.prototype.shoot = function() {
        console.log('biu biu biu')
    }

#### 组合继承的优点

- 属性和方法都是从父类继承的(代码复用)
- 继承的属性是私有的(互不影响)
- 继承的方法都在原型里(代码复用)

#### 组合继承的不足

![](https://user-gold-cdn.xitu.io/2019/8/15/16c94fc1e1836fc4?w=1009&h=283&f=png&s=142746)

组合继承的方法导致了我们重复调用了构造函数 Plane.且 Plane 构造函数内部的 color 不会被用到,导致了属性冗余.

### 最佳实践(优化版的组合继承)

#### 主要原理

- 基于组合继承
- 避免重复调用父类构造函数,只需继承原型

#### 组合继承的代码实现(优化版, 也有说法叫寄生组合继承)

        // 片段C
        function Plane(color) {
            this.color = color
            this.pilots = []
        }
        Plane.prototype.fly = function() {
            console.log('flying')
        }
        // Fighter 构造函数
        function Fighter(color) {
            Plane.call(this, color)
            this.bullets = []
        }
        // 继承Plane构造函数的属性和方法
        inheritPrototype(Fighter, Plane)
        // 特有方法
        Fighter.prototype.shoot = function() {
            console.log('biu biu biu')
        }
        var fighter1 = new Fighter()
        console.log(fighter1)
        // inheritPrototype的第一种实现方式
        function inheritPrototype(child, parent) {
            var proto = Object.create(parent.prototype)
            proto.constructor = child
            child.prototype = proto
        }
        // inheritPrototype的第二种实现方式
        function inheritPrototype(child, parent) {
            var proto = Object.create(parent.prototype)
            child.prototype = proto
            child.prototype.constructor = child
        }
        // inheritPrototype的第三种实现方式
        function inheritPrototype(child, parent) {
            var proto = function() {}
            proto.prototype = parent.prototype
            child.prototype = new proto()
            child.prototype.constructor = child
        }

### ES6 的继承

#### ES6 的继承代码实现:

我们都知道,目前的 js 的继承的实现比较繁琐, 要调用构造函数,又要自己封装继承原型的函数,所以 ES6 标准将 class 声明类和继承类的方式纳入标准,示例代码如下:

    // 片段D
    class Plane1 {
        constructor(color) {
            this.color = color
        }
        fly() {
            console.log('flying')
        }
    }
    // 使用extends关键字实现继承
    class Fighter1 extends Plane1 {
        constructor(color, content) {
            super(color)
            this.content = content
        }
        shoot() {
            console.log('biu biu biu')
        }
    }
    const fight1 = new Fighter1('blue', 'zidan')
    fight1.color      // blue
    fight1.content    // zidan
    fight1.fly()      // flying
    fight1.shoot()    // biu biu biu

注意: 目前部分现代浏览器新版本已经实现对 ES6 中的 class 和继承的，但是注意在旧版本或者 IE 浏览器中是不支持的，所以使用的时候要注意，或者配合使用 Babel 等编译工具。

### 小贴士

原型对象是类的唯一标识;

当且仅当两个对象继承自同一个原型对象时,它们才是属于同一个类的实例.而初始化对象的状态的构造函数则不能作为类的标识,两个构造函数的 prototype 属性可能指向同一个原型对象,那么这两个构造函数创建的实例就属于同一个类的.

构造函数并不是检测一个实例对象的构造函数是谁,而是检测一个实例对象的 **proto** 指向的是哪个对象;

每个构造函数都有一个 prototype 属性,这个属性的值是一个对象,这个对象包含唯一一个不可枚举属性 constructor,constructor 的值是一个函数对象,一般情况下就是构造函数自身,构造函数是类的公共标识.有时候我们直接定义 prototype 的方式会使得原型对象失去 constructor 属性,我们可以显示地给原型添加构造函数.还有一种方法就是不要整体赋值,而是一个个地给原型对象添加属性.

### 总结

啦啦啦~~~,写完了,后续我会坚持一系列的前端知识的分享的,希望你们读完我的文章后能够有所收获~~~.听明白和讲明白之间还是差了很多,如果我有表达不当的地方或者可以优化的地方还请指出,希望努力的我们都能成为优秀的自己~~~
