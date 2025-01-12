1. JSDoc与TS

  - JSDoc最大的好处：无侵入的给JS加上类型，拥有和ts一样的类型检查、类型提示、生成dts等功能，但却不需要编译，因为js代码可直接在浏览器和node环境中执行。

2. any 与 unknown、never的区别

  - any: 绕过类型检查，允许任何操作，灵活但缺乏类型安全性；
  - unknown：绕过类型检查，但要求在使用之前进行类型检查或类型断言，更安全；
  - never：表示永远不会发生的值，在不可能的情况下或不可达的代码时使用never；

3. ts的类型检测

ts的类型检测大致有以下几种途径：
- 使用ts-loader；
- 使用babel-loader 结合 fork-ts-checker-webpack-plugin；
- 使用babel-loader结合tsx；

4. typescript is的关键字的作用

is关键字用于类型谓词，允许在函数中显式的指定某个值的类型。类型谓词通常用于类型保护，帮助typescript编译器在特定代码块中缩小变量的类型范围。

is关键字用于定义一个函数的返回值类型为类型谓词。

```js
function isType(value: any): value is Type {
  // 
}
```
- value is Type 表示如果函数返回true，则value的类型被缩小为Type；
- 这个函数通常用来检查某个值是否符合特定类型；
  
