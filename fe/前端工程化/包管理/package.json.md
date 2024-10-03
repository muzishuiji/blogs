1. exports

exports 字段中指定特定的属性，可以定义模块的导出路径。

```js
{
    // ...
    exports: {
        // 模块默认导出
        '.': {
            'import': './src/index.js',
            'require': './dist/index.js',
            'default': './dist/index.js'
        },
        '/utils': {
            'import': './src/index.js',
            'require': './dist/index.js',
        },
    }
}
```

2. resolutions

强制约束某个模块使用特定版本, 例如：
```json
{
    "resolutions": {
        "axios": "^0.26.1"
    },
}
```


