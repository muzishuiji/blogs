## React出现的历史背景及介绍

1. react的出现是为了解决哪些问题?

* 传统的UI操作关注太多细节
* 应用程序分散在各处,难以追踪和维护

2. react始终整体刷新页面,无需关注细节
3. 把你从繁琐的ui操作中解放出来,你无需关心ui的更新,只需要关注状态的管理和更新.

4. React很简单

* 一个新概念,就是组件,让你用组件的方式去开发项目
* 4个必须API
* 单向数据流
传统的MVC不便于扩展和维护,flux架构不是一个完整的实现,而是一种数据模式.
* 完善的错误提示

以组件的方式实现ui的构建
5. 创建一个组件需要考虑的因素
* 创建静态ui
* 考虑组件的状态组成
* 考虑组件的交互方式

6. 受控组件与非受控组件

* 受控组件,表单元素状态由使用者维护


        <input type="text"
            value={this.state.value}
            onChange={evt => 
                this.setState({ value: evt.target.value})}
        />
* 非受控组件,表单状态由自身维护


        <input 
            type="text"
            ref={node => this.input = node}
        />

7. 创建组件的时候需要遵循的原则

* 单一职责原则
确定一个组件只做一件事,如果一个组件变得复杂,则应该考虑拆分成小组件.
* DRY原则
能计算得到的状态就不要单独存储,组件尽量无状态,所需数据通过props获取.

8. JSX

jsx,就是让你可以在JavaScript代码中直接写HTML标记,它不是一种模板,而是动态创建组件的语法糖,你可以使用jsx语法来创建组件,也可以使用react.createElement来创建组件.

jsx优点:

* 声明式创建界面的直观
* 代码动态创建界面的灵活
* 无需学习新的模板语言

9. React的生命周期和使用场景

* render阶段

纯净且没有副作用,可能会被react暂停,中止或重新启动

* pre-commit阶段

可以读取DOM

* Commit阶段

可以使用DOM,运行副作用,安排更新

9. constructor

* 用于初始化内部状态
* 唯一可以直接修改state的地方

10. getDerivedStateFromProps

* 当state需要从props初始化时使用(我的理解state需要根据props的值更新)
* 尽量不要使用,维护两者状态一致性会增加复杂度
* 每次render都会调用
* 典型场景,表单组件获取默认值

11. componentDidMount

* ui渲染完成后调用
* 只执行一次
* 典型场景: 获取外部资源,订阅事件

12. componentWillUnmount

* 组件移除时被调用
* 典型场景: 资源释放,定时器清除

13. getSnapshotBeforeUpdate

* 在页面render之前会调用
* 典型场景: 获取render之前的dom状态,做一些副作用操作

14. componentDidUpdate

* 每次UI更新时被调用
* 典型场景: 页面需要根据props变化重新获取数据

15. shouldComponentUpdate

* 决定Virtual DOM是否需要重绘
* 一般可以由pureComponent自动实现
* 典型场景: 性能优化

16. Virtual DOM原理

react团队对dom patch的算法做了优化,将复杂度由O(n^3)降低到O(n).react的virtual dom采用广度优先的深层比较,当节点跨层移动的时候其实react是分辨不出来的,它只是粗暴的把原有的节点删除,然后在移动后的地方创建新的节点,这样其实性能上是有一定的损耗的.

虚拟DOM的两个假设:
* 组建的DOM结构是相对稳定的,假定没有节点的跨层级移动;
* 类型相同的兄弟节点可以被唯一标识.

为节点制定key属性,可以使得react能够高性能的更新你的应用.

17. 高阶组件

高阶组件的概念就是给当前组件扩展一些别的应用逻辑

## redux

Redux让组件通信更容易

1. Redux特性

* 单一数据来源
传统的mvc框架中一个view可能会有多个model,一个model也可能对应多个view,这就会让应用的结构错综复杂,不容易管理和维护.
* 可预测性
state + action = new state, 不可变特性,每次状态更新会产生一个新的state

* 纯函数更新Store
新的状态依赖于旧的状态(输入参数)

2. Store

`const store = createStore(reducer)`

store有三个方法:
* 1.getState(); // 获取当前的状态
* 2.dispatch(action); // 触发action,更新state
* 3.subscribe(listener); // 监听store的变化,调用回调函数

定义reducer,创建store,createAction,subscribe订阅状态,bindActionCreators帮我们给函数包裹一层dispatch操作,免去了手动调用dispatch的操作.高阶函数,combineReducer用于组合多个renducer.

3. connect

把一个组件connect到一个store上,连接成功后,组件里就可以访问store以及action了.connect其实是一个高阶组件,可以实现让组件可以访问和操作Store的状态.

4. Redux中间件

Redux中间件主要做两个事情: 
* 截获action,判断是否是一个函数,是的话去执行
* 发出action,将异步的执行结果传入,触发action.
Redux 中间件通过在dispatcher中截获action做特殊处理.

5. 异步action不是特护的action,而是多个同步的action的组合使用

6. 单个action和reducer放在同一个文件
7. Redux的运行基础,不可变数据,为何需要不可变数据?
* 性能优化
* 易于调试和追踪
* 易于推测,可预测性
有一个轻量级的不可变数据的实现方案immer

8. React Router
为什么需要路由?
* 单页应用需要进行页面切换
* 通过url可以定位到页面
* 更有语义的组织资源的显示与隐藏
memoryRuter内存路由,一般服务端渲染的时候会用到.

9. 基于路由组织资源的有点:

* 1.实现业务逻辑的松耦合
* 2.易于扩展,重构和维护
* 3.路由层面实现lazy load,统一的地方做懒加载的处理

navLink带有选中状态的link.prompt,页面要切换时的确认操作.
redirect,登陆校验时会用到,route路由匹配显示对应组件
exact是否精确匹配,route默认会显示所有匹配的组件,采用switch只显示第一个匹配的组件.页面状态可以通过url参数控制.