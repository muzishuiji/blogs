## 简介

mobx是一个状态管理库，主要用于管理应用中的状态。它通过函数响应式编程来实现状态管理。mobx的核心思想是通过观察状态的变化，自动更新依赖该状态的视图或计算值。

## 核心概念

- observable：可观察的状态，可以是对象、数组、类实例等；
- computed：计算值，基于observable状态派生出的值；
- action：修改状态的操作，确保状态变更的可预测性；
- reaction：响应状态变化的副作用，如自动更新UI；

## @observable 和 @action装饰器的实现原理

mobx提供了装饰器语法来简化observable 和action的使用。装饰器是一种特殊类型的声明，可以附加到类声明、方法、访问器、属性或参数上，用来修改/监听类的行为。

### @observable装饰器

@observable用于将类的属性标记为可观察的。当这个属性的值发生变化时，所有依赖它的计算值或反应都会自动更新。

**源码分析：**

Mobx的@observable装饰器是通过decorate函数实现的。decorate函数接受一个对象或类，并为其属性应用指定的装饰器。

主要作用：将对应属性转换为可观察的，mobx会跟踪这些属性的变化，并在变化时通知所有依赖它们的观察者。

```js
import { observable, decorate } from 'mobx';

class Store {
    value: 0;
}
decorate(Store, {
    value: observable,
})
```
在Mobx内部，observable装饰器会调用createObservable函数，将属性转换为可观察的。具体来说，createObservable会为属性创建一个observableValue实例，这个实例会跟踪属性的值，并在值变化时通知所有依赖它的观察者。（参考了vue的设计，帮助开发者实现了可观察属性的依赖收集和状态变更后的派发更新。）

### @action装饰器

@action装饰器用于将类的方法标记为动作。动作是修改状态的地方，mobx会确保在动作执行期间，所有的状态变更都是原子的，并且在动作执行完毕后，才会通知所有依赖这些状态的观察者。

主要作用：用于标记这是一个状态修改动作，且会在装饰器里执行createAction，该函数逻辑应当是监听到action执行完毕，状态发生变更后，通知相关依赖方更新状态。

**源码分析：**
@action装饰器是通过createAction函数实现的。createAction函数会返回一个包装函数，这个包装函数会在执行原始方法之前和之后，分别调用startAction和endAction。

```js
function createAction(fn, name) {
    const res = function() {
        return executeAction(name, fn, this, arguments);
    }
    return res;
}
function executeAction(actionName, fn, scope, args) {
    startAction(actionName, scope, args);
    try {
        return fn.apply(scope, args);
    } finally {
        endAction();
    }
}
```

## mobx的依赖收集和派发更新

1. 依赖收集：
  - 当组件或计算值访问observable对象时，如果组件被observer，mobx则会自动跟踪组件的依赖关系，将组件注册为对应的observable对象的观察者；
2. 状态更新：
  - 当observable对象的状态发生变化时，mobx会通知所有依赖它的观察者；
3. 触发重渲染：
  - 对于React组件，Mobx会通过forceUpdate等机制重新执行其渲染函数，并触发React的更新机制；
