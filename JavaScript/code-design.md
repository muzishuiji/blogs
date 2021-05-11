## 最近使用react（vue类似）开发的一些思考

### 组件化（结合参考https://juejin.im/post/5d566e82f265da03f77e653c#heading-44）
组件化就是页面看作一棵组件树构成，由很多个足够合理的小组件组合成整个应用。
根据最近的项目的经验，设计有如下类组件：

* 基础组件（table、select...，跨项目通用的组件）
* 项目内通用组件
* 模块内通用组件
* 业务组件（具体业务组件逻辑）

具体业务组件由上到下可考虑如下抽象设计：
* 布局组件（layout，和业务逻辑无关，是页面布局结构的抽象，可填充具体业务组件）
* 高阶组件（高阶组件是一个函数，接收一个组件作为参数，并返回一个功能增强的组件）
* 逻辑组件（实现具体业务逻辑代码细节的组件）
* 纯展示组件（无状态组件，纯粹根据props渲染）

### 代码分层
在此举一个最近对项目代码结构优化的例子，项目中一个报表页面，用于展示数据，具备的功能有：复杂组合条件筛选、按字段排序、
编辑字段、开关状态控制等，原有代码把数据获取、事件处理和渲染方法都放在同一个组件文件里，简单来说就是这个报表组件代码过于臃肿，
但是按照组件分割划分的思想，这个报表组件已经足够原子，难以再细分。问题在于获取数据、过滤数据、更新数据逻辑过于庞杂，事件处理比较多，
既然继续细分不合适，那就用上代码分层的思想了，仔细观察报表组件的逻辑，从上到下分为：数据、事件、渲染，那就按此分层代码，数据最外层，
事件依赖于数据层，次之，最底层是渲染层，同时依赖于上层的事件和最外层的数据，结构变更后包装最终的组件如下：
```javascript
import Data from './Data'
import Event from './Event'
import Render from './Render'
import Table from 'components/Table'

@Data
@Event
@Render
class List {
  render () {
    const {
      data1,
      data2,
      ...
    } = this.props.dataProps
    const {
      handle1,
      handle2,
      ...
    } = this.props.eventProps
    const {
      render1,
      render2,
      ...
    } = this.props.renderProps
    return (
      <Table
        data1={data1}
        data2={data2}
        handle1={handle1}
        render1={render1}
        ...
      />
    )
  }
}
```

```javascript
// ./Data
export function withData (WrappedComponent) {
  return class Data {
    ...
    render () {
      return (
        <WrappedComponent
          dataProps={...}
        />
      )
    }
  }
}
```
```javascript
// ./Event
export function withEvent (WrappedComponent) {
  return class Data {
    ...
    handle1 () {
      const {...} = this.props.dataProps
    }
    render () {
      return (
        <WrappedComponent
          eventProps={...}
        />
      )
    }
  }
}
```

```javascript
// ./Render
export function withRender (WrappedComponent) {
  return class Data {
    ...
    render1 () {
      const { data1 } = this.props.dataProps
      const { handle1 } = this.props.eventProps
      return (
        <button
          onClick={handle1.bind(this, data1)}
        />
      )
    }
    render () {
      return (
        <WrappedComponent
          renderProps={...}
        />
      )
    }
  }
}
```

### 代码适配器
项目中使用了SuperAgent作为http请求库，为了适配项目需要，对此做了几层的代码适配封装处理，包括：参数处理、成功响应数据预处理、
失败错误统一处理、数据缓存处理，具体以数据缓存处理为例；
```javascript
import storage from './storage'
function cacheWrapper(config, request) {
  const {
    useCache,
    forceUpdate,
    cacheTime,
    cacheMode,
    cacheKey
  } = config
  let cacheData
  if (useCache) {
    cacheData = storage.getItem(cacheKey)
  }
  return cacheData ? Promise.resolve(cacheData) : (
    function () {
      return request().then(data => {
        useCache && storage.setItem(cacheKey, data, cacheMode, cacheTime)
        return data
      })
    }
  )()
}
```

## 优化代码
* 一些基本的优化代码思路（javascript设计模式与开发实践）：
职责单一（分解过于复杂的模块、组件、函数）、提炼过程为函数、用对象参数替代过长的参数列表

* 优化代码结构设计，组件化开发的代码结构其实就是组件设计的结构，可见组件化设计

* 代码风格规范：命名规范（变量命名：如bool真假判断isxxx、事件命名:handlexxx、渲染方法命名renderxxx，请求数据命名：fetchxxx、非请求的获取数据getxxx、过滤数据方法命名：filterxxx）
、组件代码书写位置规范：
```javascript
class demo {
  // 数据
  state = {}
  // 生命周期方法
  componentDidMount () {}
  // 事件
  handle () {}
  // 渲染
  render () {}
}
```

* 性能优化（具体分析）


## 一些开发原则

1. 约定由于配置

* 比如约定组件文件夹和组件首字母大写,名字用驼峰
* 隔离变化,将不变的东西抽离出来封装成组件,动态处理变化的东西

