## 预编译的概念

在js中，预编译时代码执行前进行的一项操作。具体来说，预编译会把变量声明和函数声明提前，并按照一定的规则将这些声明放在创建的对象中。这个过程主要分为全局预编译和局部预编译。全局预编译发生在页面加载完成时，而局部预编译则发生在函数执行的前一刻。总结来说，就是代码在执行前进行编译操作，用于确定代码之间的各种关联。

## 预编译的作用

预编译阶段主要完成函数声明和变量声明的提升，但没有初始化行为（即赋值）。需要注意的是，匿名函数不参与预编译（没办法做函数声明的提升）。在预编译过程中，js会在内存中开辟一块空间，用来存放这些变量和函数。预编译的存在有助于js引擎更有效的执行代码，因为它允许引擎在代码实际执行之前进行一些优化和准备工作（提前申请一些内存资源等）。

### 发生在全局的预编译

1. 创建GO（Global Object）对象；
2. 找变量声明，将变量名作为GO的属性名，值初始化为undefined；
3. 在全局查找函数声明，将函数名作为GO的属性名，值为该函数体；

### 发生在函数体内的预编译

1. 创建一个AO（Action Object）对象；
2. 找形参和变量声明，将形参和变量名作为AO的属性名，值初始化为undefined；
3. 形参和实参统一；(将实参（参数值）赋值给形参)
4. 在函数体内找函数声明，将函数名作为AO的属性名，值为函数体；

### 结合例子理解

1. 案例一：

```js
function fn(a){
    console.log(a)
    var a = 123
    console.log(a)
    function a(){}
    console.log(a)
    var b = function(){}
    console.log(b)
    function d(){}
    var c = a
    console.log(c)
}
fn(1)

```

输出结果：

```js
[Function: a]
123
123
[Function: b]
123
```

2. 案例二：

```js
function test(a, b) {
    console.log(a);
    c = 0
    var c;
    a = 3
    b = 2
    console.log(b);
    function b() {}
    console.log(b);
  }
  test（1）;
```

输出结果：

```js
1
2
2

```

3. 案例三

```js
global = 100
function fn(){
    console.log(global)
    global = 200
    console.log(global)
    var global = 300
}
fn()
var global
```

```csharp
// 发生在全局的预编译
GO {
  global: undefined,
  fn: function fn() {}
}
// 发生在函数体里的预编译
AO {
  global: undefined
}
```

输出结果：
```js
undefined
200
```
