/** count的发布订阅模式事件 */

const createStore = function(reducer, initState, rewriteCreateStoreFunc) {
  if (typeof initState === "function") {
    rewriteCreateStoreFunc = initState;
    initState = undefined;
  }
  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore);
    return newCreateStore(reducer, initState);
  }

  let state = initState;
  let listeners = [];
  /**订阅 */
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }
  /**更改状态 */
  function dispatch(action) {
    /** 按照计划修改state */
    state = reducer(state, action);
    /**通知 */
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listeners();
    }
  }
  function getState() {
    return state;
  }
  function replaceReducer(nextReducer) {
    reducer = nextReducer;
    dispatch({ type: Symbol() });
  }
  /** 这里用一个不匹配任何计划的type,来获取初始值 */
  dispatch({ type: Symbol() });
  return {
    subscribe,
    dispatch,
    getState,
    replaceReducer
  };
};
// 现在把state的修改计划统一成action
/** counter reducer */
let initState = {
  count: 0
};
function counterReducer(state, action) {
  if (!state) {
    state = initState;
  }
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1
      };
    case "DECREMENT":
      return {
        count: state.count - 1
      };
    default:
      return state;
  }
}
/** info reducer */
function InfoReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.name
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.description
      };
    default:
      return state;
  }
}

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  return function combination(state = {}, action) {
    const nextState = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      const reducer = reducers[key];
      /** 之前的key的state */
      const previousStateForKey = state[key];
      /** 执行分reducer,获得新的state */
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
    }
    return nextState;
  };
}
/** bindActionCreator, 通过闭包隐藏了actionCreator和dispatch,原理就是给对应
 * 的action包裹一层dispatch
 */
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/** actionCreators必须是function或者object */
export default function bindActionCreator(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== "object" || actionCreators === null) {
    throw new Error();
  }
  const keys = Object.keys(actionCreators);
  const boundActionCreators = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

const applyMiddleware = function(...middlewares) {
  return function rewriteCreateStoreFunc(oldCreateStore) {
    return function newCreateStore(reducer, initState) {
      /** 1. 生成store */
      const store = oldCreateStore(reducer, initState);
      const simpleStore = { getState: store.getState };
      const chain = middlewares.map(middleware => middleware(simpleStore));
      let dispatch = store.dispatch;
      /** 实现 exception(time(logger(dispatch))) */
      chain.reverse().map(middleware => {
        dispatch = middleware(dispatch);
      });
      store.dispatch = dispatch;
      return store;
    };
  };
};
const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer
});

let initState = {
  counter: {
    count: 0
  },
  info: {
    name: "",
    description: ""
  }
};
let store = createStore(reducer, initState);
// 生成新的reducer
const nextReducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer
});
store.replaceReducer(nextReducer);
const next = store.dispatch;
const loggerMiddleware = store => next => action => {
  console.log("this state", store.getState());
  console.log("action ", action);
  next(action);
  console.log("next state", store.getState());
};
const exceptionMiddleware = store => next => action => {
  try {
    next(action);
  } catch (err) {
    console.error("错误报告: ", err);
  }
};
const timeMiddleware = store => next => action => {
  console.log("time", new Date().getTime());
  next(action);
};

// 将中间件动态传入
const logger = loggerMiddleware(store);
const exception = exceptionMiddleware(store);
const time = timeMiddleware(store);
store.dispatch = exception(time(logger(next)));
stores.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count, state.info.name, state.info.description);
});
// 实现自增自减的计数器
store.dispatch({
  type: "INCREMENT"
});
store.dispatch({
  type: "DECREMENT"
});
/*修改 name*/
store.dispatch({
  type: "SET_NAME",
  name: "前端九部2号"
});
/**
 * redux中一些关键词
 * * createStore: 创建store对象,包含getState,dispatch,subscribe
 * * reducer: reducer是一个计划函数,接收旧的state和action,生成新的state
 * * action: action是一个对象,必须包含type字段
 * * dispatch: dispatch(action): 触发action,生成新的state
 * * subscribe实现订阅功能,每次触发dispatch的时候,生成新的state
 * * combineReducers: 多个reducer合并成一个reducer
 * * replaceReducer替换reducer函数
 * * middleware: 扩展dispatch函数
 * 对于不可复用的但已组件我们仅仅作为独立组件的内部组件即可
 */
<Select defaultValue="lucy" style={{ width: 120 }}>
  <Option value="lucy">lucy</Option>
</Select>;
// 通用组建的设计秘诀之一就是将dom的控制权教给开发者,组件只负责行为和
// 最基本的DOM结构
// 当z-index的值不是auto的时候会创建层叠上下文
/**
 * 层叠上下文的布局遵循着两个原则:
 * * 谁大谁在上面
 * * 后来的覆盖之前的
 * * 表现受父级影响
 */
