// 对于context, react包仅仅会做如下定义:
function createContext(defaultValue) {
  let context = {
    _currentValue: defaultValue,
    Provider: null,
    Consumer: null
  }
  context.Provider = {
    $$typeof: Symbol.for('react.provider'),
    _context: context
  }
  context.Consumer = {
    $$typeof: Symbol.for('create.context'),
    _context: context
  }
  return context;
}
/**
* 每个平台对UI更新逻辑的实现,封装在updater函数里,所以不同平台代码会为
组件添加各自的updater函数实现,但是他们用的是同一套虚拟dom节点
*/
// inside React DOM
const inst = new YourComponent()
inst.props = props;
inst.updater = ReactDOMUpdater;

// inside React DOM Server
const inst = new YourComponent()
inst.props = props;
inst.updater = ReactDOMServerUpdater

// inside React Native
const inst = new YourComponent()
inst.props = props
inst.updater = ReactNativeUpdater

// 这些updater函数是由react之外的第三方包定义,但是由react的setState来负责调用
setState(partialState, callback) {
  // 更新dom
  this.updater.enqueueSetState(this, partialState, callback)
}
// 以上的关系可以这样描述
// react -> setState -> updater -> react-dom
// hooks的原理与setState类似,当调用useState与useEffect时,其内部调用如下:
const React = {
  __currentDispatcher: null,
  useState(initialState) {
    return React.__currentDispatcher.useState(initialState)
  },
  useEffect(initialState) {
    return React.__currentDispatcher.useEffect(initialState)
  }
}
// ReactDOM提供了__currentDispatcher
const preDispatcher = React.__currentDispatcher;
React.__currentDispatcher = ReactDOMdispatcher;
let result;
try {
   result = YourComponent(props)
} finally {
  React.__currentDispatcher = preDispatcher
}
// react与react-dom之间传递了dispatch,虽然你看不到,但这个dispatch必须对应到唯一的react实例
// 这就是为什么hooks不允许同时加载多个react实例的原因
// 和updater一样,dispatch也可以被各平台实现重写,比如react-debug-hooks就重写了dispatcher
// reconciler调节器