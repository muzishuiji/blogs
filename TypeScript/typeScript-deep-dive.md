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

### 2.2 引用

### 2.3 null 和 undefined

### 2.4 this

### 2.5 闭包

### 2.6 数字

### 2.7 truthy

## 第 3 章 JavaScript 新语法特性

主要介绍与 ES6+有关的知识点,与之相关的功能已经在 TypeScript 中使用了.

### 3.1 类

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
