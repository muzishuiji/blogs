1. JSDoc与TS

  - JSDoc最大的好处：无侵入的给JS加上类型，拥有和ts一样的类型检查、类型提示、生成dts等功能，但却不需要编译，因为js代码可直接在浏览器和node环境中执行。

2. any 与 unknown的区别

  - any: 绕过类型检查，允许任何操作，灵活但缺乏类型安全性；
  - unknown：绕过类型检查，但要求在使用之前进行类型检查或类型断言，更安全；

3. ts的类型检测

ts的类型检测大致有以下几种途径：
- 使用ts-loader；
- 使用babel-loader 结合 fork-ts-checker-webpack-plugin；
- 使用babel-loader结合tsx；


  
