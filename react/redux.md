# Redux 从设计到源码

## Redux 是什么?

1. Redux 是 JavaScript 状态管理容器,能提供可预测的状态管理.

- web 应用是一个状态机,状态与视图是一一对应的
- 所有的状态都保存在一个对象里

[Redxu 工作流程]()

Store 是 Redux 的状态容器,它里面存储这所有的状态数据,每个状态都跟一个视图一一对应.

**核心概念:**

- Store: 保存数据的地方,类似于一个容器,整个应用只能有一个 Store

- State: Store 对象包含所有数据,如果想得到某个时点的数据,就要对 Store 生成快照,这种时点的数据集合,叫做 State.

- Action: state 的变化,会导致 View 的变化,Action 是 view 发生了变化,发出的通知,意在告诉 State 要发生变化了.

- Reducer: Store 收到 Action 以后,必须给出一个新的 State,这样 view 才会发生变化,reducer 主要负责 State 的计算,它接收当前 State 和 action 作为参数,返回一个新的 State.

- dispatch: 是 view 提交 action 的方法

2. Redux 的出现是为了让每个 State 变化都是可预测的,将应用中的动作和状态统一管理,让一切有据可循.我们的所有操作都可以追踪出来,这就是 redux 的主要设计思想.Redux 使得状态的变化可预测,动作与状态统一管理.

## Flux

Flux 最大的特点,就是数据的单向流动.

- 1. 用户访问 View
- 2. View 发出用户的 action
- 3. Dispatcher 收到 Action,要求 Store 进行相应的更新
- 4. Store 更新后,发出一个 change 事件,触发视图更新

Redux 在 dispatch action 后,到达 Store 钱的这一段,可以任意操作 action 和 Store,很容易实现灵活的日志打印,错误收集,api 请求.路由等操作.

## Redux 的一些方法

1. Store.dispatch(currentState, action)

- 调用 Reducer,传参(currentState, action)
- 按顺序执行 listener(这里应该会有更新视图的操作)
- 返回 action

2. compose.js

这个方法用于组合一些传入的函数,在中间件时会用到,执行的结果是将各个函数串联起来.

redux 的一系列中间件会被一个函数串起来,一个执行完通过 next 返回给下个中间件.
