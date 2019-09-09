## 1 前言

如果面试问你JavaScript的数据类型有哪些?你可以信誓旦旦的说出Null, Undefined, Boolean, String, Number,Symbol以及Object七种数据类型,问到它们的区别是什么,你也能说出一二,但是你知道JavaScript的包装类型吗?拆箱和装箱又是?Symbol数据类型有哪些特性?你在什么时候用到了Symbol数据类型?隐式类型转换规则有哪些?判断JavaScript数据类型的方法有哪些?优缺点是?enmmmm...
黑人问号脸?

这篇文章会对上述问题作出解答,并会扩展一些那些我们需要知道但却没有关注到的知识,让我们开始学习之旅吧~

## 2 JavaScript数据类型

### 2.1 原始类型

* Null: 只包含一个值: null
* Undefined: 只包含一个值: undefined
* Boolean: 包含两个值, true 和 false
* String: 一串字符序列
* Number：整数或浮点数，还有一些特殊值（-Infinity、+Infinity、NaN）
* Symbol(ES6新增)

(在es10中加入了第七种原始类型BigInt，现已被最新Chrome支持)

### 2.2 引用类型

* Object
Array, Function, Date, RegExp都是特殊的对象

### 2.3 原始类型与引用类型的区别

**1. 原始类型的值是不可变的,引用类型的值是可变的**

    // 原始类型
    var name = 'muzishuiji';
    name.subStr(1, 3);    // uzi
    name.slice(2);        // zishuiji
    name.toUpperCase();   // MUZISHUIJI
    console.log(name);                 // muzishuiji

    // 引用类型
    var obj = {
        name: 'sss'
    }
    obj.name = 'muzishuiji'
    obj.age = 22;
    console.log(obj);     // {name: "muzishuiji", age: 22}  

**2. 原始类型的变量是存放在栈区的,引用类型的变量是在堆内存中申请地址存放变量值,然后在栈内存中存放该变量在内存中的地址.***

* 原始类型

        var name = 'muzishuiji';
        var age = 22;
        var job = 'teacher';

存储结构如下图:

* 引用类型

        var obj1 = {name:'muzishuiji'};
        var obj2 = {name:'wangming'};
        var person3 = {name:'xuliu'};

存储结构如下图:   


**3. 原始类型的比较是值的比较,引用类型类型的比较是变量值所在地址的比较:**

原始类型的变量在栈中存放的就是对应的变量值, 而引用类型在栈中存放的是变量值所在的地址.

    // 原始类型的比较
    var a = 'muzishuiji';
    var b = 'muzishuiji';
    console.log(a === b);       // true

    // 引用类型的比较
    var obj1 = { name: 'muzishuiji' };
    var obj2 = { name: 'muzishuiji' };
    console.log(obj1 === obj2);  // false   


### 2.3 Symbol类型

Symbol类型是ES6新引入的一种数据类型,它接收一个可选的字符串作为描述.当参数为对象时,将调用对象的toString()方法, 使用示例如下:

    let s1 = Symbol();  // Symbol() 
    let s2 = Symbol('muzishuiji');  // Symbol(muzishuiji)
    let s3 = Symbol(['sss','aaa']);  // Symbol(sss, aaa)
    let s4 = Symbol({name:'muzishuiji'}); // Symbol([object Object])

#### 2.3.1 Symbol类型的特性

* 独一无二的特性

使用Symbol()创建的变量使独一无二的,因此,比较两个Symbol()创建的变量总是返回false.

    let s5 = Symbol();                      
    let s6 = Symbol();                         
    console.log(s5 === s6);        // false  
    let s7 = Symbol('muzishuiji');
    let s8 = Symbol('muzishuiji');  
    console.log(s7 === s8);        // false

js提供了Symbol.for(key)来创建两个相等的变量,使用给定的key搜索现有的Symbol,如果找到则返回该Symbol,否则将使用给定的key在全局Symbol注册表中创建一个新的Symbol.

    let s1 = Symbol.for('muzishuiji');
    let s2 = Symbol.for('muzishuiji');
    console.log(s1 === s2); // true

* 原始类型,不能使用new操作符创建

使用new 操作符来创建Symbol变量会报错,因为Symbol()返回的不是一个变量,而是一个Symbol类型的值,所以禁止把它当做构造函数使用.

    new Symbol(); // Uncaught TypeError: Symbol is not a constructor

这个时候你不会不会有些奇怪,平时我们使用new 操作符来调用一个普通的函数(不是严格意义上的构造函数),并不会给我们抛出这样的错误:

    function Person() {
        console.log('muzishuiji');
    }
    var person1 = new Person(); // muzishuiji, 并没有报错

那么Symbol函数是怎么知道我是用来new 操作符,并给我抛出错误呢?我做了以下实验:

    function Person() {
        if(this instanceof Person) {
            throw Error("Person is not a constructor");  // Uncaught TypeError: Symbol is not a constructor
        }
    }
    var person1 = new Person();

是的,报错了,可见Symbol函数是通过判断当前对象是不是Symbol的实例来判断我们有没有使用new 操作符([new操作符做了什么]()).

* 不可枚举

使用Symbol创建的属性名是不可枚举的,使用for...in, Object.keys(), Object.getOwnPropertyNames()等方法是无法获取的.可以调用Object.getOwnPropertySymbols()和Reflect.ownKeys()来获取对象的Symbol属性.

    var obj = {
        name:'muzishuiji',
        [Symbol('age')]: 18
    }
    Object.getOwnPropertyNames(obj);   // ["name"]
    Object.keys(obj);                  // ["name"]
    for (var i in obj) {
        console.log(i);                // name
    }
    Object.getOwnPropertySymbols(obj)  // [Symbol(age)]
    Reflect.ownKeys(obj)               // ["name", Symbol(name)]


#### 2.3.2 Symbol类型的使用场景

* 使用Symbol来定义属性名,防止属性污染

有时候我们想给一个对象添加属性名,但又担心和别的同事重名,我们可以这样:

    const symKey1 = Symbol('name');
    var obj = {
        name: '1223'
    }
    obj[symKey1] = '1478'

Symbol创建的变量独一无二的特性有效避免了属性污染.

* 使用Symbol定义类的私有属性或方法

        (function(){
            var AGE_SY = Symbol()
            var GET_NAME = Symbol()
            class Animal {
                constructor(name, age) {
                    this.name = name
                    this[AGE_SY] = age
                }
                [GET_NAME]() {
                    console.log(this.name)
                }
            }
        })()
        var animal1 = new Animal('muzishuiji', 18);
        // 我们不能直接获取到内部定义的变量AGE_SY和GET_NAME ,所以也就不能直接访问Animal类的AGE_SY属性和GET_NAME方法
        // 但这里的私有属性不是严格意义上的的私有属性,因为我们仍然可以通过这样的操作来访问
        animal1[Object.getOwnPropertySymbols(animal1)[0]];   // 18  

* 创建常量

        // 通常我们会这样,我们需要根据不同的传入值做不同的处理
        const TYPE_ONE = 'red'
        const TYPE_TWO = 'green'
        const TYPE_THERE = 'blue'
        function handleSome(resource) {
            switch(resource.type) {
                case TYPE_AUDIO:
                    // do something
                    break;
                case TYPE_VIDEO:
                    // do something
                    break;
                break
                    // do something
                    break;
            }
        }
        handleSome('red')

        // 使用Symbol我们可以这样,不必费劲心思思考枚举值用什么
        const TYPE_ONE = Symbol()
        const TYPE_TWO = Symbol()
        const TYPE_THERE = Symbol()
        function handleSome(resource) {
            switch(resource.type) {
                case TYPE_AUDIO:
                    // do something
                    break;
                case TYPE_VIDEO:
                    // do something
                    break;
                break
                    // do something
                    break;
            }
        }
        handleSome(TYPE_ONE)   // 这样就可以处理对应TYPE_ONE的代码逻辑啦

### 2.4 包装类型 

#### 2.4.1 基本包装类型

> ECMAScript还提供了3个特殊的引用类型: Boolean, Number和String.这些类型具有与各自的基本类型相似的特殊行为.实际上,每当读取一个基本类型值的时候,后台就会创建一个对应的基本包装类型的对象,从而让我们能够调用一些方法来操作这些数据.

    var s1 = 'some text';
    var s2 = s1.substring(2);  // "me text"

事实上,s1是基本类型不是对象,从逻辑上讲它是没有方法的,它是所以调用substring方法,是因为后台帮我们做了装箱的操作,当第二行代码访问s1时,访问过程处于一种读取模式,也就是要从内存中读取这个字符串的值,而在读取模式访问字符串时,后台会自动完成下列操作:

* (1) 创建String类型的一个实例;

* (2) 在实例上调用指定的方法;

* (3) 销毁这个实例;

翻译成代码是这样的:

    // 红宝书上传入的是字符串"some text",我觉得其实就是传入的s1的值创建了一个临时的包装类型的变量.
    var tempS1 = new String(s1);
    var s2 = tempS1.sunString();
    tempS1 = null;

上面三个步骤也分别适用于Boolean和Number类型对应的布尔值和数值.

> 引用类型与基本包装类型的主要区别就是对象的生存期,使用new操作符创建的引用类型的实例,在执行流离开当前作用域之前都一直保存在内存中.而自动创建的基本类型的对象,则只存在于一行代码的执行瞬间,然后立即被销毁,这意味着我们不能在运行时为基本类型值添加属性和方法.来看下面的例子:

    var s1 = 'some text';
    s1.color = 'red'
    alert(s1.color);  // undefined

在尝试访问s1的color属性的时候,第二行创建的String对象已经被销毁了,第三行代码又创建新的String对象,而该对象没有color属性.

> 可以显式地调用Boolean,Number和String来创建基本包装类型的对象,不过,应该在必要的情况下这样做,因为这种做法很容易让人分不清自己是在处理基本类型还是引用类型的值.

#### 2.4.2 装箱和拆箱

* 装箱: 把基本类型转换成对应的包装类型
* 拆箱: 把引用类型转换为基本类型

装箱的操作也就是上面2.4.1介绍的基本操作类型在调用相关方法时后台为我们执行的操作.

从引用类型到基本类型的转换，也就是拆箱的过程中，会遵循ECMAScript规范规定的toPrimitive原则，一般会调用引用类型的valueOf和toString方法，你也可以直接重写toPeimitive方法。一般会根据想要转换的目标数据类型, string or number,来执行相应的转换操作.
    
    // 自定义valueOf和toString, 返回对应值
    const obj = {
        valueOf: () => { return 123; },
        toString: () => { return 'muzishuiji'; }
    }
    console.log(obj - 1);      // 目标类型number, 结果: 122
    console.log(obj + '11');   // 目标类型string, 结果: "12311"

    // 自定义toPrimitive 
    const obj1 = {
        [Symbol.toPrimitive]: () => { return 123; }
    }
    console.log(obj1 - 1);    // 目标类型number, 结果: 122
    console.log(obj1 + '11'); // 目标类型string, 结果: "12311" 

    // 自定义valueOf和toString, 返回不能被正常转换的值
    const obj2 = {
        valueOf: () => { return {}; },
        toString: () => { return {}; }
    }
    console.log(obj2 - 1);    // Uncaught TypeError: Cannot convert object to primitive value
    console.log(obj2 + '11'); // Uncaught TypeError: Cannot convert object to primitive value

和手动创建包装类型一样,我们也可以通过手动调用包装类型或者引用类型的valueOf或toString,实现拆箱操作:


    var num =new Number("123");
    console.log(num.valueOf(), typeof num.valueOf()); // 123 "number"
    console.log(num.toString(), typeof num.toString()); // "123" "string"
    const obj = {
        valueOf: () => { return 123; },
        toString: () => { return 'muzishuiji'; }
    }
    obj.toString();    // 'muzishuiji'
    obj.valueOf();     //  123


## 3 JavaScript的类型转换

我们都知道JavaScript是一种弱类型的语言,js声明变量并没有预先确定的类型,变量的类型就是其值的类型,也就是说我们可以通过赋值来随意的修改变量的类型,重新赋值的过程其实就是在后台为我们执行了强制类型转换的操作.这一特性使js的编码变得更灵活,但同时也带来了代码的不稳定性和不可预测性,所以熟知JavaScript的类型转换规则,可以让一定程度上避免写出意外的bug.

JavaScript的类型转换分为强制类型转换和隐式类型转换.

### 3.1 强制类型转换

#### 3.1.1 ToPrimitive

    ToPrimitive(obj,type);

ToPrimitive方法接收两个参数,需要转换的对象和期望转换成的数据类型,第二个参数可选.

* type为string:

1. 先调用obj的toString方法,如果为原始值,则返回,否则进行第2步;

2. 调用obj的valueOf方法,如果为原始值,则返回,否则进行第3步;

3. 否则,抛出错误.

* type为number

1. 先调用obj的valueOf方法,如果为原始值,则返回,否则进行第2步;

2. 调用obj的toString方法,如果为原始值,则返回,否则进行第3步;

3. 否则,抛出错误.

* type参数为空

1. 该对象为Date,则默认转换成string类型
2. 否则,默认转换成number类型

> Date数据类型特殊说明：对于Date数据类型，我们更多期望获得的是其转为时间后的字符串，而非毫秒值（时间戳），如果为number，则会取到对应的毫秒值，显然字符串使用更多。 其他类型对象按照取值的类型操作即可。

注意, 隐式类型某个引用类型转换为原始值就是在后台调用ToPrimitive方法, 转换逻辑就和type参数为空时的转换逻辑一致.


#### 3.1.2 toString

Object.prototype.toString()方法返回该对象的字符串表示

每个对象都有一个 toString() 方法，当对象被表示为文本值时或者当以期望字符串的方式引用对象时，该方法被自动调用。

#### 3.1.3 valueOf

Object.prototype.valueOf()方法返回指定对象的原始值。

JavaScript 调用 valueOf() 方法用来把对象转换成原始类型的值（数值、字符串和布尔值）。但是和toString方法一样,我们很少需要自己调用这些函数,这些方法一般都会在发生数据类型转换的时候被 JavaScript 自动调用。

不同内置对象的 valueOf 实现:
* String => 返回字符串值
* Number => 返回数字值
* Date => 返回一个数字，即时间值,字符串中内容是依赖于具体实现的
* Boolean => 返回Boolean的this值
* Array => 默认返回自身
* Object => 默认返回自身
我们可以通过重写对象的valueOf方法来让它返回我们想要的结果

代码展示如下:

    var str = "123";
    str.valueOf();  // "123"

    var num = 456;
    num.valueOf();  // 456

    var date = new Date();
    date.valueOf(); // 1567998675017

    var arr = [1,2,3,4];
    arr.valueOf();  // [1,2,3,4]

    var obj = new Object({valueOf:()=>{
        return 'muzishuiji'
    }})
    console.log(obj.valueOf());   // "muzishuiji"

#### 3.1.4 Number

Number运算符转换规则:

* null 转换为0
* undefined 转换为NaN
* true转换为1, false转换为0
* 字符串转换时遵循数字常量转换规则,转换失败返回NaN

> 如果要调用Number方法转换对象,则会调用ToPrimitive转换,type指定为number

代码示例:

    Number(null);       // 0
    Number(undefined);  // NaN
    Number('123');      // 123
    Number('456abc');   // 456
    Number([1,2,3]);    // NaN
    Number({});         // NaN
    Number(new Date()); // 1568000206474


#### 3.1.5 String

String 运算符转换规则

* null 转换为 'null'
* undefined 转换为 undefined
* true 转换为 'true'，false 转换为 'false'
* 数字转换遵循通用规则，极大极小的数字使用指数形式

> 如果要调用String方法转换对象,则会调用ToPrimitive转换,type指定为string

代码示例:

    String(null);                // 'null'
    String(undefined);           // 'undefined'
    String(true)                 // 'true'
    String(1)                    // '1'
    String(0)                    // '0'
    String(Infinity)             // 'Infinity'
    String(-Infinity)            // '-Infinity'
    String({})                   // '[object Object]'
    String([1,[2,3]])            // '1,2,3'
    String(['koala',1])          //koala,1


#### 3.1.5 Boolean

ToBoolean 运算符转换规则

除了下述 6 个值转换结果为 false，其他全部为true：

* undefined
* null
* -0
* 0或+0
* NaN
* ''（空字符串）

需要说明的一点是 new Boolaen(false)的转换结果也是true, 因为通过Boolaen方法创建的是一个值为false的变量.

    Boolean(undefined) // false
    Boolean(null) // false
    Boolean(0) // false
    Boolean(NaN) // false
    Boolean('') // false
    Boolean({}) // true
    Boolean([]) // true
    Boolean(new Boolean(false)) // true
    typeof new Boolean(false)   // "object"



### 3.2 隐式类型转换

#### 3.2.1 加法运算符

除加法运算符以外的运算符,如*, / , - 运算符都会默认将符号两侧的数据转换成数值在进行计算.

    '12' + 2;      // '123'
    '12' + true;   // '12true'
    '12' + false;  // '12false'
    '12' + ['1', '2'];   // '121,2 ' 
    '12' + {};           "12[object Object]"

    12 + null;     // 12
    12 + undefined; // NaN
    12 + '3';      // '123'     
    12 + true;     // 13
    12 + false;    // 12
    12+['3','4'];       // '123,4'
    12 + {};       // '12[object Object]'

总结规律如下:

* 当一侧为String类型时,另一侧也会被转换成字符串类型,做拼接操作;
* 当一侧为Number类型,另一侧为非String类型的原始类型时,另一侧会被转换成number类型,做加法运算;
* 当一侧为Number类型,另一侧为引用类型时,会将引用类型和Number类型都转换成字符串做拼接操作.

运用排除法可得,使用加法运算符时的隐式类型转换就是: 除了Number类型 + (Null, Undefined, Boolean,Number)会做加法运算,其他情况下都是做字符串拼接操作.


#### 3.2.2 if语句和逻辑语句

在if语句和逻辑语句中,如果只有单个变量,会先将变量转换为Boolean值,只有以下情况会被转成false,其余会被转换成true.

    null
    undefined
    ''
    NaN
    0
    false


#### 3.2.3 == 运算符

使用 == 时会发生隐式类型转换,导致意外的bug出现,我们如果需要做比较运算最好使用 === 严格等于运算符.

    null == undefined;      // true
    NaN == NaN;             // false

    true == 1;              // true
    true == 'sss';          // false
    true == ['44'];         // false
    true == {};             // false
    false == 0;             // true
    false == 'sss';         // false
    false == ['44'];        // false
    false == {};            // false
    '123' == 123;           // true
    '' == 0;                // true 
    '[object Object]' == {} // true
    '1,2,3' == [1, 2, 3]    // true
    {} == '1'               // Uncaught SyntaxError: Unexpected token ==
    

总结规律如下: 

* null除了跟自己和undefined相比返回true,其他返回false;
* undefined除了和自己和null相比返回true,其他返回false;
* NaN和任何值比较都返回false
* Boolean跟其他类型的值比较,会被转换为Number类型

true只有和1比较会返回true, false只有和0比较会返回true

* String和Number比较,现将String转换为Number

* 原始类型和引用类型比较

当原始类型和引用类型做比较时，对象类型会依照ToPrimitive规则转换为原始类型, {}放在运算符左侧会报错.


## 4. 判断JavaScript数据类型的方式

### 4.1 typeof

typeof多用于判断一个变量属于哪个原始类型:

    typeof 'muzishuiji'  // string
    typeof 123  // number
    typeof true  // boolean
    typeof Symbol()  // symbol
    typeof undefined  // undefined
    typeof function() {}  // function

typeof不能准确判断引用类型的数据类型:

    typeof [] // object
    typeof {} // object
    typeof new Date() // object
    typeof /^\d*$/; // object
    typeof null;    // object, 众所周知的JavaScript的一个bug


### 4.2 instanceof

<code>instanceof</code>操作符可以判断引用类型具体是什么类型的变量,其主要原理就是监测构造函数的prototype 是否出现在被检测对象的原型链上.

    var a = {}
    a instanceof Object  // true
    [] instanceof Array // true
    new Date() instanceof Date // true
    new RegExp() instanceof RegExp // true
    var b = function() {}
    b instanceof Function  // true

但是有些情况下,instanceof得到的结果也不准确,

    [] instanceof Object     // true
    var b = function() {}
    b instanceof Object      // true

### 4.3 Object.prototype.toString.call

    Object.prototype.toString.call({})              // '[object Object]'
    Object.prototype.toString.call([])              // '[object Array]'
    Object.prototype.toString.call(() => {})        // '[object Function]'
    Object.prototype.toString.call('seymoe')        // '[object String]'
    Object.prototype.toString.call(1)               // '[object Number]'
    Object.prototype.toString.call(true)            // '[object Boolean]'
    Object.prototype.toString.call(Symbol())        // '[object Symbol]'
    Object.prototype.toString.call(null)            // '[object Null]'
    Object.prototype.toString.call(undefined)       // '[object Undefined]'

    Object.prototype.toString.call(new Date())      // '[object Date]'
    Object.prototype.toString.call(Math)            // '[object Math]'
    Object.prototype.toString.call(new Set())       // '[object Set]'
    Object.prototype.toString.call(new WeakSet())   // '[object WeakSet]'
    Object.prototype.toString.call(new Map())       // '[object Map]'
    Object.prototype.toString.call(new WeakMap())   // '[object WeakMap]'

我们可以使用这个方法返回传入值的准确类型,这里我们需要研究下Object.prototype.toString.call为什么可以准确返回传入值的类型.这里就不做过多的扩展了.

### 4.4 尝试实现一个判断数据类型的工具函数(受jquery源码中的类型判断的启发)

    const classType = {};
    const typeArray = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error", "Symbol"];
    typeArray.forEach(type => {
        classType["[object " + type + "]"] = type.toLowerCase();
    })
    function getType(obj) {
        if ( obj == null ) {
		    return obj + "";
	    }
	    return typeof obj === "object" || typeof obj === "function" ?
		    classType[Object.prototype.toString.call(obj) ] || "object" :
		    typeof obj;
    }

原始类型直接使用typeof, 引用类型使用Object.prototype.toString.call取得类型, classType来将对应类型的小写形式存起来,将Object.prototype.toString.call返回的多余的内容过滤掉,只留下对应类型的小写形式返回.


## 结语

在借鉴了前辈们的分享才得以完成这篇JavaScript变量与数据类型的总结,在此过程中,我加入了自己的理解和扩展,用比较浅显的语言来阐述JavaScript的一些概念,以及一些规则对应的原理.如果又发现不对的地方或者解释不到位的地方,欢迎在下方评论或者加微信`lj_de_wei_xin`与我交流~
