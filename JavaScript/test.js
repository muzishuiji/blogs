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
function foo() {
  console.log(this.a)
}
var c = {a: '1144'}
var b = foo.bind(c)
b()

function foo() {
  console.log(this.a)
}
var a = 2
foo()         // 隐式绑定，this指向window
var obj = {
  a: 2,
  foo: foo
}
obj.foo()  // 隐式绑定，this指向obj

function Fn() {
  this.user = '追梦子'
}
var a = new Fn()
var b = new Fn()
console.log(a === b)

function foo() {
  console.log(this.a)
}
var b = {
  a: 'muzi'
}
foo.call(b);    // 'muzi'
var c = {
  a: 'shuiji'
}
foo.call(c);    // 'shuiji'
var d = {
  a: '1234'
}
foo.bind(d)();   // '1234'
function Fn() {
  this.a = 'self'
  console.log(this.a)
}
var f1 = new Fn(b);  // 'self'

function a() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
a()()()   // window
var c = {
  a: 'shuiji'
}
a.call(c)()();   //   shuiji


function fun3() {
  console.log('fun3')
}
function fun2() {
  fun3();
}
function fun1() {
  fun2();
}
fun1();


var value = 1;
function foo() {
    console.log(value);
}
function bar() {
    var value = 2;
    foo();
}
bar();
// 结果是 ???


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope(); // ???


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();  // ???


var foo = function () {
  console.log('foo1');
}

foo();  // foo1

var foo = function () {
  console.log('foo2');
}

foo(); // foo2


function foo() {
  console.log('foo1');
}

foo();  // foo2

function foo() {
  console.log('foo2');
}

foo(); // foo2


function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};
  b = 3;
}

foo(1);

function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(1);




function foo() {
  console.log(a);
  a = 1;
}
foo(); // ???

function bar() {
  a = 1;
  console.log(a);
}
bar(); // ???


function foo() {
  function bar() {
    // ...
  }
}


foo.[[scope]] = [
  GlobalContext.VO
]
bar.[[scope]] = [
  FooContext.AO,
  GlobalContext.VO
]

foo.ScopeChain = [FooContext.AO].concat(foo.[[scope]])
bar.ScopeChain = [BarContext.AO].concat(bar.[[scope]])

var scope = "global scope";
function checkscope(){
    var scope2 = 'v';
    return scope2;
}
checkscope();
