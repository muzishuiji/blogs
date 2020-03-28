function visibilityFilter(state = "SHOW_ALL", action) {
  if (action.type === "SET_VISIBILITY_FILTER") {
    return action.filter;
  } else {
    return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([{ text: action.text, completed: false }]);
    case "TOGGLE_TODO":
      return state.map((todo, index) =>
        action.index === index
          ? { text: todo.text, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
}

// 组合reducer
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
}

import { combineReducers, createStore } from "redux";
let reducer = combineReducers({ visibilityFilter, todos });
let store = createStore(reducer);

// Redux和Rx.js的结合
function toObservable(store) {
  return {
    subscribe({ next }) {
      const unsubscrible = store.subscribe(() => next(store.getState()));
      next(store.getState());
      return {
        unsubscrible
      };
    }
  };
}
// action创建函数
function addTodo(text) {
  return {
    type: ADD_TO,
    text
  };
}

// 在flux中,调用action创建函数时,一般会触发一个dispatch
function addTodoWithDispatch(text) {
  const action = {
    type: ADD_TO,
    text
  };
  dispatch(action);
}
// 而reduz只是讲action创建函数的结果传给dispatch
dispatch(addTodo(text));
// 或者创建一个被绑定的action创建函数来自动dispatch
const boundAddTodo = text => dispatch(addTodo(text));
boundAddTodo();

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }
        return todo;
      });
    default:
      return state;
  }
}
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}
function todosApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  };
}

// redux提供的combineReducers可以实现和todosApp一样的功能
const todosApp = combineReducers({
  visibilityFilter,
  todos
});

// createStore
import { createStore } from "redux";
import todoApp from "./reducers";
let store = createStore(todoApp);

import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from "./actions";

// 打印初始状态
console.log(store.getState());
//
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
// 发起一系列 action
store.dispatch(addTodo("Learn about actions"));
store.dispatch(addTodo("Learn about reducers"));
store.dispatch(addTodo("Learn about store"));
store.dispatch(toggleTodo(0));

// mapStateToProps过滤state仅读取自己需要的state
const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};
// 容器组件可以负责读取state,分发action
// 分发action
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id));
    }
  };
};

// 使用connect创建容器组件,并传入组件需要的state和action
import { connect } from "react-redux";
const visibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default visibleTodoList;
// 你可以通过props的形式将store传入到所有容器组件中,但这样太麻烦
// 我们可以使用provider,传入store,然后所有被其包裹的组件都可以访问store
// 而不必显示的传递它,只需要在渲染跟组件时传递即可

let store = createStore(todoApp);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
