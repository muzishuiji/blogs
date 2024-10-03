1. 什么是references？

tsconfig文件中的references字段来管理项目的依赖关系和构建顺序。references字段允许在一个monorepo或多包项目中指定包之间的依赖挂你，以确保正确的构建顺序和类型检查。

因为有了依赖关系的信息，可以做到以下功能：
  1. 增量编译：当使用项目引用时，typescript编译器可以只编译那些上次编译以来发生变化的项目；
  2. 编译器性能：使用项目引用可以改善编译器性能，因为编辑器可以仅加载需要的项目，从而减少内存占用并提高响应速度；
  3. 支持引用目标的类型检查：通过fork ts checker等方式执行ts类型检查时，能同时检查到引用项目的类型问题；

```json
{
    "compilations": {

    },
    "references": [
        {
            "path": "./packages/package-a",
        },
        {
            "path": "./packages/package-b",
        },
    ]
}
```
需要注意的是：
  1. 被引用的项目需设置 "composite": true，这样才能被其他的项目引用。
  2. 引用的项目会生成.d.ts声明文件，这些文件会被依赖它的项目使用，以了解类型信息。

