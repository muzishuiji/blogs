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

redux 的一系列中间件会被一个函数串起来,一个执行完通过传递的 next 调用下一个组件.

3. Redux 创建 Store

   const reducer = combineReducers({
   home: homeNumber,
   number: addNumber
   })
   const store = createStore(reducer);
   window.\$reduxStore = store

**CombineReducer 函数,用于合并多个 reducer,源码如下**

    // reducers即传入的参数对象
    function combineReducers(reducers) {
      // ...
      const finalReducerKeys = reducers.keys()
      return function combination(state={}, action) {
        let hasChanged = false
        const nextState = {}
        for(let i = 0; i < finalReducerKeys.length; i++) {
          // finalReducerKeys 是传入reducers对象的key值
          const key = finalReducerKeys[i]
          // finalReducers等价于reducers
          const reducer = finalReducers[key]
          // 运行reducer函数,返回一个state
          // 核心: 调用combination函数,实际就是循环调用传入的reducer函数
          const nextStateForKey = reducer(previousStateForKey, action)
          // 把对应reducer的下一个状态存在map结构里
          nextState[key] = nextStateForKey
          // 标识状态是否变化
          // hasChanged = hasChanged || nextStateForKey !== previousStateForKey
          // hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length
          // 返回reducers对应的下一个state的map结构
          return nextState
        }
      }
    }

    // combineReducers返回的结果是一个combination函数,这个函数返回的是Store的下一个state

**CreateStore 函数(返回一个有多个属性和方法的 Store 对象)**

    function createStore(reducer, preloadedState, enhancer) {
      // reducer -> combination函数
      let currentReducer = reducer
      // 将全部的state属性,挂载在currentState上
      let currentState = preloadedState
      if(typeof preloadState === 'function' &&
      typeof enhancer==='undefined') {
        // 第二个参数是一个函数,没有第三个参数的情况
        // 这样的情况说明,没有初始化的state,
        // 第二个参数就是中间件的函数调用
        enhancer = preloadedState
        // 将preloadedState重置
        preloadedState = undefined
      }
      if(typeof enhancer !=='undefined') {
        // 若存在中间件,则调用中间件的处理函数并返回
        return enhancer(createStore)(reducer, preloadedState)
      }
      // 来到了经典的dispatch操作
      function dispatch(action) {
        // currentReducer ---> combination函数
        // dispatch的操作逻辑其实就是触发reducer,传入当前的state和对应的action
        currentState = currentReducer(currentState, action)
      }
      // 调用dispatch, 初始化state
      dispatch({ type: ActionsTypes.INIT })
      const store = ({
        // 分发action,触发state变化的唯一途径
        dispatch: dispatch,
        // 变化监听
        subscribe,s,
        // 获取store下的全部state
        getState,
        // 替换store当前用来计算state的reducer
        replaceReducer,
        [$$observable]: observable
      })
      return store
    }

4. Redux 中间件

redux-thunk 是 redux 中间件的一种,也是比较常见的中间件,redux-thunk 库允许你编写与 store 交互的异步逻辑.

    import thunkMiddleware from 'redux-thunk'
    const reducer = combineReducers({
      home: homeNumber,
      number: addNumber
    })
    const store = createStore(reducer, applyMiddleware(
      thunkMiddleware
    ))

**thunkMiddleware 的核心代码:**

    return ({dispatch, getState}) => {
      // next就是传入的dispatch
      // 这里其实是下一个中间件的调用控制
      return function(next) {
        return function(action) {
          // redux-thunk核心
          if(typeof action === 'function') {
            return action(dispatch, getState, extraArgument)
          }
          return next(action)
        }
      }
    }

**applyMiddleware 函数**

    // 中间件调用
    return enhancer(createStore)(reducer, preloadedState)
    // 等价于
    return applyMiddleware(
      thunkMiddleware
    )(createStore)(reducer, preloadedState)
    // redux的中间件,主要处理逻辑在applyMiddleware中,
    // 它主要的目的是为了扩展store的dispatch函数
    // 使得dispatch有异步等的功能


    // 支持多个中间件传入
    export default function applyMiddleware(...middlewares) {
      // args我猜是中间件执行完的回调
      return (createStore) => (reducer, ...args) => {
        // 创建store
        const store = createStore(reducer, ...args)
        const middlewareAPI = {
          getState: store.getState,
          dispatch: (action, ..args) => dispatch(action, ...args)
        }
        // 运行中间件函数,将middlewareAPI作为参数传入
        const chain = middlewares.map(middleware => middleware(middlewareAPI))
        // 将所有中间件传入compose中,返回一个可以通过next控制多个中间件
        // 有序执行的dispatch
        dispatch = compose(..chain)(store.dispatch)
        return {
          ...store,
          dispatch
        }
      }
    }
    // 中间件处理之后的chain值
    // next就是dispatch
    chain = [function(next) {
      return function(action) {
        if(typeof action === 'function) {
          return action(dispatch, getState, extraArgument)
        }
        return next(action)
      }
    }]
    // compose用来整合中间件,返回新的dispatch处理函数
    // 将中间件层层包裹,执行的时候由内向外依次执行,
    // 这样看应该是后传入的中间件先执行
    return chain.reduce((a,b) => {
      return (...args) => {
        return a(b(...args))
      }
    })

5. Redux 的使用


    window.$reduxStore = store
    store.dispatch(action) // 触发reducer,生成新的state
    let { aState } = store.getState() // 获取state

6. 总结

- redux 创建 store

通过 combineReducer 函数合并 reducer 函数,返回一个新的函数 combination(遍历 reducer 函数,返回新的 state),蒋政函数作为参数传入 createStore 函数,函数内部通过 dispatch,初始化传入的 combination,state 生成,返回 store 对象

- redux 中间件

applyMiddleware 函数中间件的主要目的是修改 dispatch,返回多个中间件层层包裹的 dispatch 函数

- Redux 使用

实际上就是调用 dispatch, 触发循环遍历 reducer 函数,更新 state.
