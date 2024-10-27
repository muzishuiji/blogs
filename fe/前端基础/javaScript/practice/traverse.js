// 输入 45dss 返回 ['广东省', '深圳市']

const cityData = [
  {
    id: 'axzx',
    name: '广东省',
    children: [
      {
        id: 'sdsd',
        name: '深圳市',
        children: [
          {
            id: '45dss',
            name: '南山区',
          },
          {
            id: 'sdsd11',
            name: '福田区',
            children: [
              {
                id: 'ddrr2',
                name: 'A街道',
              },
            ],
          },
        ],
      },
      {
        id: '2323d',
        name: '东莞市',
        children: [
          {
            id: 'xxs2',
            name: 'A区',
          },
          {
            id: 'kklio2',
            name: 'B区',
          },
        ],
      },
    ],
  },
];


const traverseTree = (data, id) => {
    let dfs = (data, parentNames, id) => {
        for(let item of data) {
            if(item.id === id) {
                return parentNames;
            }
            if(item.children) {
                let res = dfs(item.children, parentNames.concat(item.name), id);
                return res;
            }
        }
    }
    return dfs(data, [], id);
}

// traverseTree(cityData, '45dss');
let traverseTreeBFS = function (data, id) {
    let queue = [{
        node: data,
        path: []
    }];
    while(queue.length) {
        let { node, path } = queue.shift();
        for(let item of node) {
            if(item.id === id) {
                return path;
            }
            if(item.children) {
                queue.push({
                    node: item.children,
                    path: path.concat(item.name)
                });
            }
        }
    }
    return null;
}
console.log(traverseTreeBFS(cityData, '45dss'), '---');

// matchRoute会把嵌套路由拍平，然后和location匹配
// 匹配完成之后会通过pushState或者replaceState修改history，然后更新state
// 前进后退则是监听popState。
// 点击link链接也会进行location和routes的匹配，然后history.pushState来修改history，之后通过react的setState来触发重新渲染。

// 分别用dfs和bfs来遍历一棵树

const cityData = [
  {
    id: 'axzx',
    name: '广东省',
    children: [
      {
        id: 'sdsd',
        name: '深圳市',
        children: [
          {
            id: '45dss',
            name: '南山区',
          },
          {
            id: 'sdsd11',
            name: '福田区',
            children: [
              {
                id: 'ddrr2',
                name: 'A街道',
              },
            ],
          },
        ],
      },
      {
        id: '2323d',
        name: '东莞市',
        children: [
          {
            id: 'xxs2',
            name: 'A区',
          },
          {
            id: 'kklio2',
            name: 'B区',
          },
        ],
      },
    ],
  },
];
let traverseTreeDfs = function (cityData, id) {
  let dfs = (data, id, parentNames = []) => {
    for(let item of data) {
      if(item.id === id) {
        return parentNames;
      }
      if(item.children) {
        return dfs(item.children, id, parentNames.concat(item.name))
      }
    }
  }
  return dfs(cityData, id, []);
}
traverseTreeDfs(cityData, '45dss');

let traverseTreeBfs = function(data, id) {
  let queue = [{
    node: data,
    path: []
  }];
  while(queue.length) {
    let { node, path } = queue.shift();
    for(let item of node) {
      if(item.id === id) {
        return path;
      }
      if(item.children) {
        queue.push({
          node: item.children,
          path: path.concat(item.name),
        })
      }
    }
  }
  return [];
}
traverseTreeBfs(cityData, '45dss');


// 最下层一些底层模块
// 数据获取&缓存（作为上层模块运行的上下文），一些key-map映射关系（包括但不仅限于form的rendererMap，eventMap， plugin的pluginMap）
// 一些schema解析转换逻辑，表单参数、表单的基础数据类型校验等底层模块和工具方法
// 稍微上层一些就是管理工具，联动执行器（本质上是一个订阅发布模式实现的模块，字符a订阅字段b的变更， 字段change时触发对应的订阅回调）
// 配置参数只配置eventKey，通过key-map去映射到并执行对应的listener逻辑。
// 在上层是一些compiler逻辑，文本的compiler，form表单的compiler，以及一些文本和数据处理的转换逻辑xxxCompiler。
// 在上层是各种provider，提供业务运行需要的上下文数据
// 在上层就是一些通用UI组件，在通用UI组件之上时业务UI组件。
// vite适用于需要快速开发和调试的项目，特别是在开发环境中。开发服务器，配置简单，适用于现代前端项目和快速开发

