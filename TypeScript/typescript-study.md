# TypeScript

## 基础类型

### 布尔值

    let isDone: boolean = false

## 数字

    let decLiteral: number = 6

## 字符串

    let name: string = `Hello , my name is ${name}`;

## 数组

1. 第一种声明


    let list: number[] = [1,2,3]

2. 使用数组泛型


    let list: Array<number> = [1,2,3]

## 元组 Tuple

元组类型允许表示一个一直元素数量和类型的数组,各元素的类型不必相同.

    let x: [string, number];
    x = ['hello', 10];  // ok
    x = [10, 'hello'];  // error
    // 当访问已知索引的元素,会得到正确的类型:
    console.log(x[0].substr(1));  // ok
    console.log(x[1].substr(1));  // Error, 'number' does not have 'substr'
    // 当访问一个越界的元素时,会按照数组可以容纳的类型做判断,
    x[6] = true;   // error, 布尔不是(string | number)类型

## 枚举

    enum Color { Red, Green, Blue }
    let c: Color = Color.Green

## Any

我们用 any 来表示不确定类型的变量.

    let notSure: any = 4;
    let list: any[] = [1,true, "free"];  // 一个包含不同类型数据的数组

## Void

用于没有返回值的函数

    function warnUser(): void {
        console.log("This is my warning message");
    }
    let unuseable: void = undefined

## null 和 undefined

理论情况下你可以给 null 和 undefined 的变量赋值任何类型的数据,但是如果配置了 strictNullChecks, 开启了严格模式,则只能复制 viod 类型的数据或者它们自身.

## Never

never 类型表示的是那些永不存在的值的类型.

    // 返回never的函数必须存在无法到达的终点
    function error(message: string): never {
        throw new Error(message)
    }

## Object

使用 object 类型,就可以更好的表示像 Object.create 这样的 API

    declare function create(o:object | null): void
    create({ prop: 0 }); // OK
    create(null); // OK

## 类型断言

类型断言就是告诉编辑器,我已经知道了某个变量对应的数据类型,类型断言有两种,一种是"尖括号"语法,另一种是 as 语法.

    let someValue: any = "this is a string";
    let strLength: number = (<string>someValue).length;
    let strLength: number = (someValue as string).length;

当再 typescript 中使用 jsx 的时候只有 as 语法是被允许的.

## 属性重命名

    let {a:newName1, b: newName2} = o

## 默认值

    function keepWholeObject(wholeObject: { a:string, b?: number}) {
        let {a, b = 1001} = wholeObject;  // 传入参数缺省时使用默认值
    }

## 函数声明

    function f({ a, b=0} = {a: ""}):void {

    }
    f({a: "yes"}); // ok, default b=0
    f(); // ok, default to {a: ""} , which then defaults b = 0
    f({}); // error, 'a' is required if you supply an argument

## 展开

注意对象的展开仅包含对象的可枚举属性.
