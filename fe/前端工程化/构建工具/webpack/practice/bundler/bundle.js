const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');
const path = require('path');
const moduleAnalyser = (filename) => {
    const content = fs.readFileSync(filename, 'utf-8');
    // 生成抽象语法树ast
    const ast = parser.parse(content, {
        sourceType: 'module'
    })
    const dependencies = {}
    // 对入口文件的依赖分析
    traverse(ast, {
        // 引入语模块的语句
        ImportDeclaration({node}) {
            const dirname = path.dirname(filename)
            const newFile = dirname + node.source.value.replace("./", "/");
            dependencies[node.source.value] = newFile;
        }
    })
    
    // ast, code, options
    // code即为编译生成的,可在浏览器上运行的代码
    const { code } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    })
    return {
       filename,
       code,
       dependencies
    }
}

// 创建依赖图谱
// 返回一个文件和图谱对应的map结构
const makeDependenciesGraph = (entry) => {
    const entryModule = moduleAnalyser('./src/index.js');
    // 借用队列实现递归调用
    const graphArray = [ entryModule ]
    for(let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i];
        const { dependencies } = item;
        if(dependencies) {
            for(let j in dependencies) {
                graphArray.push(
                    moduleAnalyser(dependencies[j])
                )
            }
        }
    }
    const graph = {}
    graphArray.forEach(item => {
        graph[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    });
    return graph;
}

// 
const gernerateCode = (entry) => {
    const graph =JSON.stringify(makeDependenciesGraph(entry));
    return `
        (function(graph) {
            function require(module) {
                function localRequire(relativePath) {
                    return require(graph[module].dependencies[relativePath])
                }
                var exports = {};
                (function(require, exports, code) {
                    eval(code);
                })(localRequire, exports, graph[module].code);
                return exports;
            };
            require('${entry}')
        })(${graph})
    `
}
const generate = gernerateCode('./src/index.js');
console.log(generate)
