## React出现的历史背景及介绍

1. react的出现是为了解决哪些问题?
   * 传统的UI操作关注太多细节
   * 应用程序分散在各处,难以追踪和维护

2. react始终整体刷新页面,无需关注细节
3. 把你从繁琐的ui操作中解放出来,你无需关心ui的更新,只需要关注状态的管理和更新.

4. React很简单
        * 组件化开发：让你用组件化的方式去开发项目
        * 单向数据流
        * 完善的错误提示

5. 创建一个组件需要考虑的因素
        * 创建静态ui
        * 考虑组件的状态组成
        * 考虑组件的交互方式

6. 受控组件与非受控组件

  * 受控组件：状态（state）完全有React组件控制的表单元素（值由React状态控制，变化由React事件处理）；

  ```js
  function ControllInpt() {
    const [value, setValue] = useState('');
    return (
      <input
        type="text"
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
      >
    )
  }
  ```
  优缺点与适用场景：
    - 优点：
      - 数据一致性与可预测性：由于表单值始终由React状态管理，数据流清晰，易于追踪和调试，你可以随时从state中获取表单的当前值；
      - 实时校验与反馈：可以轻松地在onchange事件中实现实时输入校验，并立即向用户提供反馈；
      - 易于实现复杂交互：例如，根据一个输入框的值动态禁用/启用另一个输入框，或者根据内容进行格式化；
      - 方便集成第三方库：许多UI组件库的表单组件都是基于受控模式设计的；
    - 缺点：
      - 性能开销：对于每次按键输入，onchange事件都会触发组件的重新渲染。如果表单非常复杂或者输入频率很很高，可能导致性能问题。
      - 代码量增加：每个受控表单元素都需要value属性和onchange事件处理器，导致代码量相对冗余；
    - 适用场景：
      - 需要实时校验和反馈的表单（如密码强度检测、用户名可用性检查）；
      - 需要根据输入动态改变UI的表单（如级联选择器、动态表单项）；
      - 需要重置表单或预填充数据的场景；
      - 与React组件库配合使用；


  * 非受控组件：其值由DOM自身维护的表单元素。与受控组件不同，你不需要通过React的state来管理表单的值，而是直接通过DOM引用（通常使用useRef Hook）来获取表单的当前值

  ```js
  function UncontroledInput({ onSubmit }) {
    const inputRef = useRef(null); 
    const handleSumbit = (e) => {
      const value = inputRef.current.value;
      console.log('提交的非受控组件值', value);
    }
    return (
      <form onSumbit={handleSumbit}>
        <input
          id="dff"
          type="text"
          ref={inputRef} 
        >
         <input type="submit" value="提交" />
      </form>
    )
  }
  ```
  优缺点与适用场景：
  - 优点：
    - 性能较好：不需要每次输入都触发组件重新渲染，对于高频输入的表单性能表现更佳；
    - 代码量较少：无需为每个表单元素编写onchange事件处理器和useState声明，代码更简洁；
  - 缺点：
    - 难以实现实时校验：由于React不控制表单的值，实时校验需要额外的逻辑，实时校验需要在onBlur时触发；
    - 数据流不清晰：表单的值直接由DOM维护，React组件无法直接访问，需要通过ref手动获取，数据流不如受控组件直观；
  - 适用场景：
    - 简单的表单，无需实时校验或复杂交互；
    - 需要集成非React的DOM库或插件：当这些库直接操作DOM时，非受控组件可以避免冲突；
    - 性能敏感的场景：如需要处理大量输入或高频更新的表单；

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

jsx会被babel最终转化成React.createElement这种形式：
```js
<div>
 <img src="avatar.png" className="profile" />
 <Hello />
</div>
```
babel或tsc转译后：

```js
React.createElement(
  'div',
  null,
  React.createElement('img', {
    src: '',
    className: '',
  }),
  React.createElement(Hello, null)
)

```

9. React的生命周期和使用场景

        * render阶段

        纯净且没有副作用,可能会被react暂停,终止或重新启动

        * pre-commit阶段

        可以读取DOM

        * Commit阶段

        可以使用DOM,运行副作用,安排更新

10. constructor

        * 用于初始化内部状态
        * 唯一可以直接修改state的地方

11. getDerivedStateFromProps

        * 当state需要从props初始化时使用(我的理解state依赖props的值更新)
        * 尽量不要使用,维护两者状态一致性会增加复杂度
        * 每次render都会调用
        * 典型场景,表单组件获取默认值

12. componentDidMount

        * ui渲染完成后调用
        * 只执行一次
        * 典型场景: 获取外部资源,订阅事件

13. componentWillUnmount

        * 组件移除时被调用
        * 典型场景: 资源释放,定时器清除

14. getSnapshotBeforeUpdate
        * 在页面render之前会调用
        * 典型场景: 获取render之前的dom状态,做一些副作用操作

15. componentDidUpdate

        * 每次UI更新时被调用
        * 典型场景: 页面需要根据props变化重新获取数据

16. shouldComponentUpdate

        * 决定Virtual DOM是否需要重绘
        * 一般可以由pureComponent自动实现
        * 典型场景: 性能优化

17. Virtual DOM原理

react的virtual dom采用广度优先的深层比较,当节点跨层移动的时候其实react是分辨不出来的,它只是粗暴的把原有的节点删除,然后在移动后的地方创建新的节点,这样其实性能上是有一定的损耗的.

虚拟DOM的两个假设:

* 组件的DOM结构是相对稳定的,假定没有节点的跨层级移动;
* 类型相同的兄弟节点可以被唯一标识.

为节点制定key属性,可以使得react能够高性能的更新你的应用.

**优点**

  - 保证性能下限：虚拟DOM可以经过diff找出最小差异，然后批量进行patch，这种操作虽然比不上手动优化，但是比起粗暴的DOM操作性能要好很多，因此虚拟DOM可以保证性能下限；
  - 无需手动操作DOM：React会处理虚拟DOM的diff和patch，开发者无需手动操作DOM，只需专注于状态管理，极大提升开发效率；
  - 跨平台：虚拟DOM本质上是js对象，而DOM与平台强相关，相比之下虚拟DOM可以进行更方便的跨平台操作，例如服务端渲染、移动端开发等；

**缺点**

  - 无法进行极致优化：在一些性能要求极高的应用中虚拟DOM无法进行针对性的极致优化；

18. 高阶组件

高阶组件的概念就是给当前组件扩展一些别的应用逻辑

19. React调试

用户数据是保存在useDataDir里的，一个useDataDir对应一个浏览器实例，各种chrome插件、浏览记录、cookies等，所有用户数据都保存在useDataDir里。一个useDataDir只能跑一个实例，我们调试的时候，如果没有指定useDataDir，默认是临时创建一个新的useDataDir。这是会没有安装的chrome插件。如果希望调试的时候有已安装的插件，可以把useDataDir设置为false，这样就使用默认的useDataDir来跑：
![alt text](./imgs/image.png)

20. React的数据不可变
    - 普通的class组件，setState会重新渲染；
    - 继承的PureComponent的class组件，setState时会比props和state引用是否改变，还会对state的每个key的值做比较，变了才会重新渲染；
    - function组件在用useState的setXxx时，会比较state的引用是否变化，变了就会重新渲染；

21. React的渲染流程

整体分为两大阶段：
        - render阶段：把React Element树（也可以叫vdom）转成fiber链表的reconcile过程，reconcile过程并不只是创建新的fiber节点，当更新的时候，还会和之前的fiber节点做diff，判断是新增、修改、还是删除，并打上对应的标记。整个reconciler过程由Scheduler负责调度，通过时间分片来把计算任务分到多个子任务里去。
        - commit阶段：reconcile结束就有了完整的fiber链表，再次遍历这个fiber链表，执行其中的effect、增删改dom等。
        commit也分成了三个小阶段：
            - before mutation：操作dom之前，effect函数会在before mutation前异步调度执行；
            - mutation： 操作dom；
            - layout： 操作dom之后，useLayoutEffect会在layout阶段同步执行。在mutation阶段更新了dom，在layout阶段就可以拿到ref了。

22. React的并发模式

React的并发模式简单来说就是基于优先级的可打断的渲染流程。fiber结构的设计，一方面可以极大的降低查询节点的时间复杂度，把整个vdom树变成线性的链表结构，使得查询的时间复杂度为O(1)。另一方面链表的数据结构设计存储正在处理的fiber节点，使得耗时的渲染任务可以被打断、恢复。

        - 双缓冲
        Fiber结构使用了双缓冲技术，即维护两个虚拟DOM树：当前树（Current Tree）和工作树（Work-in-Progress Tree）。当前树表示当前渲染的UI状态，而工作树表示正在进行的更新。
        更新过程中，React会在工作树上进行计算和修改，完成后将工作树切换为当前树，从而实现了UI的更新。这种方式避免了直接修改当前树，减少了不必要的计算和渲染。（将状态变更汇总起来处理）
        - 递归变迭代
        传统的React渲染过程是递归的，即在更新阶段，react会递归地遍历整个组件树，这种方式在处理大型组件树时，可能会导致栈溢出或性能问题。
        fiber架构将递归遍历改为迭代遍历，每个fiber节点都包含了指向父节点、子节点和兄弟节点的指针。React可以通过这些指针在fiber树上进行迭代遍历、查询节点，从而避免了递归带来的栈溢出和性能问题。

23. React的Hook为什么不能写在判断和循环里？

React Hooks不能写在条件语句、循环或其他嵌套函数中。这是因为React依赖于Hooks的调用顺序来正确的管理组件状态和副作用。如果Hooks的调用顺序在不同的渲染周期发生变化，React将无法正确跟踪和管理组件状态，从而导致难以调试的错误。

24. React中使用Hooks的好处

  1. 状态管理更简洁
  Class Component的状态管理主要通过类组件的`this.state`和`this.setState`来实现。Hooks引入了`useState`，使得函数组件可以拥有状态，并且状态管理的代码更加简洁和直观。
  2. 副作用管理方便
  Hooks提供了`useEffect`，使得在函数组件中处理副作用（如数据获取、订阅、手动DOM操作等）变得更加方便。`useEffect`允许你在组件渲染后执行副作用操作，并且可以控制副作用的执行时机。
  3. 逻辑复用更灵活
  Hooks允许你将组件逻辑提取到自定义Hooks中，从而实现逻辑的复用。自定义Hooks可以封装复杂的状态逻辑或副作用逻辑，并在多个组件中共享。
  4. 组件结构更清晰
  Hooks使得函数组件的结构更加清晰和简洁。函数组件没有类组件中的生命周期方法，所有逻辑集中在函数体内，使得代码更易于理解和维护。
  5. 更好的性能优化
  Hooks提供了`useMemo`和`useCallback`，使得在函数组件中进行性能优化更加容易。`useMemo`可以缓存计算结果，`useCallback`可以缓存函数引用，从而避免不必要的渲染。
  6. 更好的TypeScript支持
  Hooks与TypeScript结合更加自然，因为函数组件的类型推断更加直观。你可以直接使用TypeScript的类型注解来定义Hooks的参数和返回值。

25. JSX的解析流程

  1. 编译JSX：Babel解析JSX转换成render function，本质上调用React.createElement。
  2. React.createElement调用，生成虚拟DOM；
  3. 遍历虚拟DOM树，将其转换为fiber结构（这个过程叫reconcile）；
  reconcile过程并不只是创建fiber节点，当更新的时候，还会和之前fiber节点做diff，判断是新增、修改还是删除，然后打上对应的标记。
  4. 根据增删改的标记，更新真实DOM中发生变化的部分；
  5. 调用组件的生命周期方法，执行清理副作用操作；
  根据增删改的标记，更新真实dom中发生变化的部分

25. React Router

  1. history.scrollRestoration可以设置保留滚动位置
  它的值有auto、manual，默认是auto，也就是会自动定位到上次滚动位置，设置为manual就不会了。
  2. 当你在history中导航时，popState就会触发，比如history.forward，history.back，history.go。但是history.pushState、history.replaceState并不会触发popState。
  添加、修改history不会触发popState，只有history之间导航才会触发。
  3. react的路由跳转是封装了pushState和replaceState的，当pushState或者replaceState触发的时候，会触发matchRoutes，match完会pushState修改history，然后更新state，触发了setState，组件树会重新渲染。

  渲染时会用到Outlet渲染子路由，用到useXxx来取一些匹配信息，这些都是通过context传递的。

  4. 为什么需要路由?
    * 单页应用需要进行页面切换
    * 通过url可以定位到页面
    * 更有语义的组织资源的显示与隐藏
    memoryRouter内存路由,一般服务端渲染的时候会用到.

  5. 基于路由组织资源的优点:
    * 1.实现业务逻辑的松耦合
    * 2.易于扩展,重构和维护
    * 3.路由层面实现lazy load,统一的地方做懒加载的处理
    navLink带有选中状态的link.prompt,页面要切换时的确认操作.
    redirect,登陆校验时会用到route路由匹配显示对应组件
    exact是否精确匹配,route默认会显示所有匹配的组件,采用switch只显示第一个匹配的组件.页面状态可以通过url参数控制.
  6. hash router和history router的区别；
    - 表现形式：
      - hash router 有#号，哈希值后面的内容不会发送到服务器；
      - history router没有#号，整个URL都会被发送到服务器；
    - 实现原理：
      - hash router 通过修改location.hash来实现路由跳转，监听hash-change来感知路由跳转；
      - history router通过pushstate、replacestate来实现路由跳转，监听popstate来感知路由跳转；
    - 服务器配置需求：
      - hash router不需要付服务器配置，服务器始终返回一个 html文件，适合静态文件托管；
      - history router需要配置将所有路由都指向index.html;
    - SEO友好性：
      - hash router：搜索引擎通常忽略URL中的哈希部分，不利于搜索引擎搜录；
      - history router：URL结构更清晰，搜索引器可以正确识别，有利于SEO优化；

26. React Context

context的实现：

首先是调用createContext方法，这个方法返回一个对象，有3个属性：

  - _currentValue：保存context的值的地方，私有属性；
  - Provider：ContextProvider类型的jsx；
  - Consumer：ContextConsumer类型的jsx；

具体实现逻辑：

  - provider的处理就是修改了 context._currentValue的值，也可以自己修改；
  - useContext和consumer的原理类似，都是读取context._currentValue，然后传入组件渲染；

Consumer如何保证消费最近的一个Provider提供的value：当一个Consumer组件需要消费数据时，React会在组件树中向上查找最近的Provider组件。React会记录每个Provider的value，并在查找过程中使用这些记录来确定最近的Provider组件，消费对应Provider组件的value。

context导致的重渲染如何解决？

  - 拆分context，每一类状态放在一个context里，这会导致context嵌套过多，维护成本增加。
  - 用zustand等状态管理库，通过selector逻辑只订阅组件依赖的状态的变更；
  - 用memo包裹子组件，它会对比新旧props（浅比较），没变化就不会重新渲染；

27. useEffect的effect函数在commit阶段的before mutation阶段异步执行。

异步执行就是用setTimeout，Promise等api包裹执行的逻辑；

这些逻辑会以单独的宏任务或微任务的形式存在，然后进入Event Loop调度执行。

异步执行的effect逻辑有两种可能，在下次渲染之前执行完这个effect或者分片时间不够了，在渲染之后执行了。这样就导致页面出现闪动，第二次渲染值更新了，如果不想闪动一下，就用useLayoutEffect。

useLayoutEffect和useEffect的区别是useLayoutEffect的执行是同步的，浏览器会等effect逻辑执行完再渲染。
而如果这段同步执行的逻辑耗时太久，会导致页面卡顿，所以开发者需要根据实际情况考虑选择使用useEffect还是useLayoutEffect。

```js
useLayoutEffect(() => {
  // 副作用代码，会阻塞浏览器绘制
  return () => {
    // 清理函数
  }
}, [dependencies]); // 依赖项数组
```
useLayoutEffect的执行流程概述：
- 组件渲染；
- react 更新DOM；
- useLayoutEffect回调函数同步执行；
- 浏览器绘制页面；

适合使用useLayoutEffect的场景：
- 需要同步读取DOM布局信息；
- 需要同步修改DOM样式以避免“闪烁”；
- 与第三方DOM库集成；
确保D3.js，一些动画库操作DOM志气那，拿到react更新后的DOM。


28. useRef可以视为React的一个组件内的全局变量，它的值的修改不会触发重渲染。useRef一般用来存一些不用于渲染的内容。

29. 在React里，只要涉及到state的修改，就必须返回新的对象，不管是useState还是useReducer。
这也是react的特性之一：数据不可变性。
如果要修改复杂的深层嵌套的对象，可以用immer来优化。

30. forwardRef + useImperativeHandle
react不支持直接传入ref获取对组件实例的引用，因为react处理一个普通的函数组件时，会直接调用该函数并返回react元素。由于函数组件没有实例，无法为其创建一个可供ref引用的句柄。

forwardRef + useImperativeHandle组合使用使得子组件可以自定义暴露给父组件的内容，是父组件访问和修改子组件状态的一种方式。

React遇到一个由forwardRef创建的组件时，它会进行以下处理：
1. 特殊类型标记：forwardRef返回的组件在内部会被react标记为一种特殊的类型（$$typeof Symbol(react.forwardRef）)；
2. Ref参数传递：在协调过程中，当react渲染这个forwardRef组件时，如果服组件传递了ref属性，react会识别这个特殊标记，并将这个ref对象作为第二个参数传递给forwardRef的渲染函数；
3. 内部绑定：渲染函数内部，开发者将这个ref绑定到实际的DOM节点或子组件上。此时，React会将父组件的ref对象与这个内部的DOM节点或组件实例关联起来；

forwardRef 就像一个中间人，它拦截了父组件传递的ref，并将其作为普通参数传递给函数组件，从而绕过来函数组件不能直接接收ref的限制。这样，父组件就可以通过其ref对象，间接获取到forwardRef组件内部的某个DOM节点或组件实例的引用；

>> 如果绑定ref的组件是一个函数组件，通常需要借助forwardRef做一个中转处理；
>> 如果绑定ref的组件是一个类组件，通常可以直接传入ref，绑定这个类组件实例，访问类组件的相关方法

过度使用ref的缺点：
- 数据流不清晰：直接操作DOM或组件实例会绕过react的数据流，使得组件的行为难以预测和测试；
- 组件耦合度增加：父组件直接操作子组件内部，增加了组件之间的耦合；
- 难以维护：命令式代码通常比声明式代码更难理解和维护；

>> react19已经支持函数组件可以直接接收ref，无需forwardRef.

31. 可以使用memo包裹组件来避免非必要的重渲染。

如果子组件用了memo，给它传递的对象，函数类的props就需要用useMemo、useCallback包裹，否则，每次props都会变，memo就没用了。

反之，如果props使用useMemo，useCallback，但是子组件没有被memo包裹，那也没意义，因为不管props变没变父组件重渲染都会导致子组件重渲染。

32. React的生命周期

  - useEffect不添加依赖类似于componentDidMount，不添加依赖的返回值类似于componentWillUnmount；
  - useEffect添加prop为依赖，类似于getDerivedStateFromProps；
  - useEffect添加state为依赖，类似于componentDidUpdate；
  - useLayoutEffect：useLayoutEffect会在dom更新之后，浏览器绘制之前调用（commit的layout阶段）。getSnapshotBeforeUpdate会在render方法之后，dom更新之前调用（commit的before mutation阶段）；

33. React引入Fiber架构的原因和必要性

React引入Fiber架构的主要原因是为了解决处理大型应用时，虚拟DOM的更新和渲染过程出现的性能瓶颈和用户体验问题。虽然之前的虚拟DOM树也可以正常的进行跟新和渲染，但在某些情况下，它可能无法满足React对高性能和流畅用户体验的需求。以下是引入Fiber架构的主要原因：

  1. 调度：
    - 问题：在旧版本的架构中，React的渲染过程是同步的，这意味着React开始渲染一个组件树时，它会一直执行到渲染完成，期间不会中断。这在处理大型组件树时会导致长时间的阻塞，影响用户体验，尤其是在低端设备上。
    - 解决方案：fiber结构引入了任务调度的概念，允许React将渲染工作分解为多个小任务，并在浏览器的主线程空闲时执行这些任务。这使得React可以在渲染过程中暂停、恢复和中断任务，从而避免长时间的阻塞，提高应用的交互流畅度。
  2. 优先级
    - 问题：在旧版本的架构中，所有任务的优先级都是相同的，React无法区分哪些任务更重要，哪些任务可以稍后处理。这可能导致一些高优先级的任务（如用户交互）被低优先级的任务（如渲染）阻塞。
    - 解决方案：Fiber架构引入了优先级机制，允许react根据任务的优先级来调度任务。如果进来的任务的优先级比当前在执行的任务的优先级高，React会维护一个优先级队列，优先处理用户交互事件等高优先级的任务，然后再处理数据更新较低优先级的任务。

  3. 并发
    - 问题：在旧版本的架构中，React的渲染过程是单线程的，无法并发处理多个任务，这限制了React处理复杂应用时的性能。
    - 解决方案：Fiber架构引入了并发模式，允许React看起来在同一时间处理多个任务，提高应用的性能和响应性。

  4. 增量渲染

    - 问题：在旧版本的架构中，React的渲染性能是全局的，即每次更新都会重新渲染整个组件树。这在处理大型组件树时会导致性能问题。
    - Fiber架构引入了增量渲染的概念，允许React将渲染工作分解为多个小的单元（Fiber），并在多个帧中逐步完成渲染（scheduler调度）。这使得React可以在不阻塞主线程的情况下，更新组件树，提高渲染性能。

  5. 错误边界

    - 问题：在旧版本的架构中，如果一个组件在渲染过程中抛出错误，整个应用可能会被崩溃；
    - 解决方案：Fiber架构引入了错误边界的概念，允许开发者定义错误边界组件，当子组件抛出错误时，错误边界组件可以捕获错误并显示备用UI，从而提高应用的健壮性；
  
  6. 更好的调和
    
    - 问题：在旧版本的架构中，React的reconciler是基于递归的，这会导致在处理大型组件树时，调用栈过深，影响性能，且容易发生栈溢出；
    - 解决方案：Fiber架构将reconciler过程从递归改为基于链表的迭代，这使得React可以在不消耗过多调用栈空间的情况下，处理大型组件树。此外，Fiber架构还允许React在调和过程中暂停和恢复，从而更好地控制渲染过程。

34. React是如何触发重渲染的

- 当调用setState（类组件）或状态更新函数（如setCount，函数组件）时，React会新的状态值存储起来，并标记组件为“需要更新”，并安排重新渲染；
当调用setState或者this.setState时，会创建一个状态更新任务，加入队列，然后调度更新。

```js
function dispatchSetState(fiber, queue, action) {
  const update = {
    action,
    next: null,
  }
  enqueueUpdate(fiber, queue, update);  // 将更新加入队列
  schedulerUpdateOnFiber(fiber); // 调度更新
}
function enqueueSetState(inst, payload, callback) {
  const fiber = getInstance(inst);
  const update = createUpdate(payload, callback);
  enqueueUpdate(fiber, update); // 将更新加入队列
  scheduleUpdateOnFiber(fiber); // 调度更新
}

function scheduleUpdateOnFiber() {
  // 底层调用performSyncWorkOnRoot来同步执行渲染任务
  // 主要分为两个阶段：
  // 1. render阶段；vdom -> fiber, dom diff 给dom打上增删改的标记
  // 2. commit阶段；根据标记将dom diff的结果应用到真实dom上
}
```
- React在触发重新渲染的时候，会使用虚拟DOM比较前后dom状态的变化，计算出最小的dom更新操作，然后应用到真实dom上；

35. class组件和函数组件的区别和优缺点：

  1. class组件
  **优点：**
    - 提供丰富的生命周期方法，便于控制组件的不同阶段，适合复杂的组件逻辑；
    - 
  **缺点：**
    - 代码冗余：需要编写较多的模版代码；
    - 生命周期方法导致代码逻辑分散，难以维护；
    - 需要理解this绑定、生命周期等概念；
    - 由于实例化的开销，class组件的性能略低于函数组件；
    - 逻辑复用只能通过HOC或Render Props，写起来比较笨重；
  2. 函数组件
  **优点：**  
    - 减少了模版代码，逻辑更清晰；
    - 通过自定义Hooks可以很方便的复用逻辑；
    - 不需要理解this绑定和生命周期方法；
  **缺点：** 
    - 需要模拟实现组件的生命周期方法；

36. React组件强制重渲染
```js
function MyComponent() {
  const [, forceUpdate] = useReducer(() => ({}), {});

  const clickHandler = () => {
    forceUpdate();
  }
  return (
    <div>
      <p>Random value:</p>
      <button onClick={clickHandler}>Force Update</button>
    </div>
  )
}
```
37. useState的原理

useState是react的一个hook，用于在函数组件中添加状态管理。它的核心原理如下：
  1. 状态存储：
    - React在内部维护一个状态链表，每个useState调用对应链表中的一个节点；
    - 组件的状态按useState的调用顺序存储在链表中；
  2. 初始化和更新：
    - 首次渲染时，useState初始化状态，并将初始值存储在链表的对应节点中；
    - 后续渲染时，useState返回链表中存储的当前状态值；
  3. 状态更新触发重新渲染：
    - 调用useState返回的更新函数（如setState）时，react会更新链表中的状态值，并安排重新渲染；
38. 在 React 类组件中，为什么修改状态要使用 setState 而不是用 this.state.xxx = xxx

39. React为什么要自定义合成事件
  - 解决浏览器兼容性问题，抹平差异，提供统一的api接口；
  - 通过事件委托机制来优化事件处理；
  - 使用事件池来复用事件对象，以减少内存分配和垃圾回收的开销（react17移除，因为现代浏览器性能已经足够好）；
  - React的合成事件不仅适用于web平台，还可以扩展到其他平台（如React Native）；
  - React的合成事件支持自定义事件和高级功能，可以实现更灵活的事件处理；

40. React16的dom diff流程梳理；
  1. 第一轮遍历：同层一一对比，若新旧fiber节点类型相同，则复用，更新props。如果新旧fiber节点类型不同，则终止遍历；
  2. 第二轮遍历，将旧的Fiber节点放入Map，继续遍历新的VDOM中的Fiber节点，如果旧fiber节点存在，则打上更新标记，不存在，则打上新增标记。剩下的旧的Fiber节点，则打上删除的标记；
  3. 得到最终的Fiber树后，commit阶段操作DOM并渲染；

### React Ref

1. createRef 创建的是一个seal对象，不能增删属性，其实创建普通的对象，也能实现dom实例的绑定。

```js
function createRef() {
    var refObject = {
        current: null
    }
    {
        Object.seal(refObject)
    }
    return refObject;
}
```
2. useRef

```js
function mountRef(initialValue) {
    let hook = mountWorkInProgressHook();
    var ref = {
        current: initialValue
    }
    {
        Object.seal(ref)
    }
    hook.memoizedState = ref;
    return ref;
}
function updateRef(initialValue) {
    var hook = updateWorkInProgressHook();
    return hook.memoizedState;
}
```

3. forwardRef

forwardRef函数创建了专门的React Element类型

```js
function forwardRef(render) {
    // ...
    var elementType = {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render: render
    }
    // ...
    return elementType;
}
```
然后beginWork处理这类型的节点会做专门的处理，也就是将它的的ref的值传递给函数组件，所以渲染函数组件的时候留了第二个参数来传递ref，从而完成了ref从父组件到子组件的传递。

4. render阶段处理到原生标签也就是HostComponent类型的时候，如果有ref属性会在fiber.flags里加一个标记。

5. commit阶段会在layout操作完dom后遍历fiber链表更新HostComponent的ref，也就是将fiber.stateNode赋值给ref.current。

6. forwardRef创建了单独的react element类型，在beginWork处理到它的时候做了特殊处理，就是把ref作为第二个参数传递给了函数组件。

7. useImperativeHandle的底层实现就是useEffect，只不过执行的函数和需要的对象是指定传入的，这样在layout阶段调用hook的effect函数的时候就可以更新ref了。

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

定义reducer,创建store,createAction,subscribe订阅状态,bindActionCreators帮我们给函数包裹一层dispatch操作,免去了手动调用dispatch的操作.高阶函数,combineReducer用于组合多个reducer.

3. connect

把一个组件connect到一个store上,连接成功后,组件里就可以访问store以及action了.connect其实是一个高阶组件,可以实现让组件可以访问和操作Store的状态.

4. Redux中间件

Redux中间件主要做两个事情: 
* 截获action,判断是否是一个函数,是的话去执行
* 发出action,将异步的执行结果传入,触发action.
Redux 中间件通过在dispatcher中截获action做特殊处理.

5. 异步action不是特殊的action,而是多个同步的action的组合使用

6. 单个action和reducer放在同一个文件
7. Redux的运行基础,不可变数据,为何需要不可变数据?

  * 性能优化
  * 易于调试和追踪
  * 易于推测,可预测性
有一个轻量级的不可变数据的实现方案immer

## React 的事件机制

React的事件机制是其核心特性之一，它提供了一种统一的方式来处理DOM事件，使得开发者可以在React组件中以声明式的方式来处理事件。React的事件机制并不是直接使用原生DOM事件，而是通过合成事件（SyntheticEvent）来实现的。

1. 合成事件（SyntheticEvent）

React的事件系统基于合成事件（SyntheticEvent），这是一种跨浏览器的事件包装器。合成事件与原生DOM事件类似，但它提供了跨浏览器的兼容性和一致性。React通过合成事件来屏蔽不同浏览器之间的差异，使得开发者可以编写跨浏览器的代码。

2. 事件委托（Event Delegation）

React的事件系统采用了事件委托（Event Delegation）的机制。事件委托是一种优化技术，它将事件处理程序附加到DOM树的顶层元素（通常是document或reactDom.render的根元素），而不是每个子元素上。当事件触发时，React会在冒泡到顶层元素上时将事件并分发给对应的组件。

事件委托的优势：
  - 性能优化：减少事件处理程序的数量，用特别是在处理大量子元素时；
  - 动态元素：对于动态添加或删除的元素，事件委托可以自动处理，无需手动绑定或解绑事件；

3. 事件池（Event Pool）

React会创建一个合成事件对象，并将其传递给事件处理函数。同时使用事件池来重用合成事件对象，以提高性能。事件处理程序执行完毕后，合成事件对象会被重置并放回事件池中。

4. 注意事项

异步事件处理：由于合成事件对象会被重用，因此在异步操作中访问事件对象时，可能会遇到事件对象已被重置的情况。如果需要在异步操作中访问事件对象，可以通过event.persist() 方法来保留事件对象。

```js
function handleClick(event) {
  event.persist();
  setTimeout(() => {
    console.log(event.target); // 输出当前点击的元素
  }, 0);
}
```

## React和Vue的区别

React和Vue是两个非常流行的前端框架库，他们都用于构建用户界面，但在设计理念、使用方式和生态系统方面有一些显著的区别。

1. 核心思想

  - React：React是一个用于构建用户界面的js库，它遵循组件化的思想，将ui拆分为独立、可重用的组件。React使用JSX语法，允许你在js代码中编写类似HTML的结构；
  - Vue：VUe是一个渐进式js框架，它也遵循组件化的思想，但更注重灵活性和易用性。Vue使用模版语法（类似HTML）和单文件组件（SFC），将模版、逻辑和样式封装在一个文件中。

2. 模版与JSX

  - React：使用JSX来描述组件的结构，JSX是一种在js中编写类似于HTML代码的语法扩展。JSX最终会被编译成js代码。
  - Vue：使用模版语法，模版式纯HTML的扩展，跟之前的ejs有些相像，更容易上手。Vue的模版语法支持指令（v-if、v-for）和插值，使得数据绑定和条件渲染更加直观；

3. 数据绑定

  - React：使用单向数据流，数据从父组件流向子组件。React中的状态（state）是不可变的，每次修改都要返回新的state；
  - Vue：使用双向数据绑定，数据可以在视图和模型之间自动同步。Vue的状态是响应式的，当数据变化时，视图会自动更新。

4. 性能

  - React：使用虚拟DOM来优化性能，React的diff算法能够最小化DOM操作，提高渲染效率。但是更细粒度的避免重渲染需要开发者管理好状态依赖，以及给组件增加memo等逻辑来实现；
  - Vue：vue也使用虚拟DOM，但vue的响应式系统能够更细粒度的追踪依赖关系，减少不必要的重渲染；

5. 渲染机制的差异

  1. 更新触发机制的根本差异
    - React-推式更新（Push-based）；
    ```js
    // react中的状态更新
    const [count, setCount] = useState(0);
    // 当调用setCount时，rect不知道哪些组件会受影响
    setCount(count + 1); // 触发整个组件树的重新渲染检查
    ```
    - Vue-拉式更新（Pull-based）
    ```js
    const count = ref(0)
    // Vue通过依赖追踪知道哪些组件依赖这个数据
    count.value++;// 值更新依赖count的组件
    ```
  2. 依赖追踪机制
    - React
      - 粗粒度更新：不知道组件内部依赖哪些状态；
      - 全组件重渲染：状态变化时整个组件函数重新执行；
      - 手动优化：需要开发者使用React.memo,useMemo等手动优化；
    - Vue：
      - 细粒度更新：精确跟踪每个数据的依赖关系；
      - 按需更新：只更新真正依赖变化的数据的部分；
      - 自动优化：响应式系统正确处理依赖关系；
  3. 渲染过程对比
    - React：
    ```text
    状态更新 → 调度器 → 协调器 → 渲染器 → 
              ↓
          时间切片 → Fiber树构建 →  Diff算法 →  DOM更新
    ```
    - Vue：
    ```text
    响应式数据变化 → 依赖收集 → 组件更新队列 → 批量更新
                    ↓
               精确定位组件 → 局部重渲染
    ```
### 为什么React需要Fiber架构，而Vue不需要？
1. react的根本问题（旧版本）
  1. 同步递归：一旦开始更新就无法停止；
  2. 粗粒度更新：不知道具体哪些组件需要更新；
  3. 长时间阻塞：大型应用更新时阻塞主线程；
fiber架构通过时间切片拆分大量的更新任务，优先级调度优先处理高优的更新任务，空闲时恢复，继续更新来保证交互体验的流畅性；

2. vue不需要Fiber架构
  1. vue的响应式优势：
    - 组件级更新：只更新需要更新的组件；
    - 自动批量更新：Vue会自动将同步的更新合并；
    - 更新量可控：由于精确追踪，更新工作量较小；
  2. vue模版编译的优势
    - 静态提升：静态内容编译时确定，运行时跳过（diff时跳过）；
    - Block级优化：将动态内容打包成Block，减少遍历；
    - Patch Flag：标记哪些属性需要更新；
3. 设计哲学
  1. React
    - 简单心智模型： UI=f(state);
    - 可预测性：函数式、不可变；
    - 性能需要手动优化：react.meomo, useMemo等；
    - 学习成本：需要理解其渲染机制；
  2. Vue
    - 开发体验好：自动优化、直观；
    - 性能优秀：精确更新；
    - 魔法较多：响应式系统复杂；
    - 调试困难：依赖追踪不透明；

## Ref的实现原理

render阶段处理到原生标签也就是HostComponent类型的时候，如果有ref属性会在fiber.flags里加一个标记。

commit阶段会在layout操作完dom后遍历fiber链表更新HostComponent的ref，也就是把fiber.stateNode赋值给ref.current。（更新ref的引用）

react并不关心ref是哪里创建的，用createRef、useRef创建的，或者forwardRef传过来的都行，甚至普通对象也可以。createRef、useRef只是把普通对象 Object.seal了一下。

useImperativeHandle的底层实现就是useEffect，只不过执行的函数是它指定的，bind了传入的ref和create函数，这样layout阶段调用hook的effect函数就可以更新ref。

## react的性能优化
1. React.memo
React.memo是一个高阶组件，用于对函数组件的props进行浅比较，避免在props未发生变化时重新渲染；
React.PureComponent是类组件的优化版本。
2. 使用useCallback和useMemo
  - useCallback：缓存回调函数，避免每次渲染创建新的函数；
  - useMemo：缓存计算结果，避免重复计算；
3. 优化列表渲染；
  - 使用id等作为列表项的唯一key，以便react可以最小化dom更新操作；
  - 虚拟列表（只渲染当前可视区域）；
4. 避免useContext的不当使用导致重渲染；
  - 状态拆分：拆分成更小的部分，避免状态变化导致不必要的重渲染；
  - 使用状态管理库：zustand等集中管理状态，减少组件之间的耦合；
  - 使用useReducer：组件内部的负载状态，使用useReducer代替useState，减少状态的更新次数；
5. 代码分割与懒加载；
  - 借助React.lazy + Suspense来动态加载组件，减少初始包体积；
  - 动态import+webpack的代码分割，来懒加载模块；

## React18的新特性

### 改动点

1. 通过react18的新api来开启并发模式（Concurrent Mode）；
2. 新的根API：ReactDOM.createRoot(root).render(<App />)，启用并发渲染；
3. 如果你的项目使用了ssr服务端渲染，需要把hydration升级为hydrateRoot；
4. tsx中children属性需要手动声明；
5. 在18之前，只有在react事件处理函数中，才会自动执行批处理，其他情况会多次更新； 在18之后，任何情况下都会自动进行批处理，将多次更新操作始终合并为一次，包含在异步代码和原生事件处理函数中的状态更新。

批处理更新的工作原理：

React在执行更新时采用了一种懒惰的方式，它会将同一个事件循环中的多个更新累积起来，然后一次性应用这些更新，不会对每个更新立即进行重新渲染。避免了不必要的重渲染，从而提高了性能。该特性的引入使得React应用可以更有效率的处理状态更新，尤其是在复杂的应用和异步操作中。

react也支持使用flushSync来退出批量更新处理。

并发模式的工作原理：
并发模式基于React的Fiber架构，在React18中被全面启用。核心机制包括：
- Fiber树：React将组件树表示为链表结构（Fiber节点），允许渲染过程被暂停、恢复或放弃；
- 时间分片：渲染任务被分成小片段（通常为5ms内，成为yieldInterval），浏览器每帧渲染后检查是否有更高优先级的任务，如果有，暂停当前渲染，否则，继续；
- 双缓冲树：React维护两个树，当前树（已渲染的UI）和工作树（正在更新的树）。更新在工作树上进行，完成后替换当前树，避免频繁修改UI；
- Scheduler：React的调度器管理任务优先级，确保高优先级任务优先执行；
react会使用requestIdleCallback调度低优先级任务。不用requestIdleCallback而是自己设计时间分片的原因：
  - 兼容性：safari、旧版edge不支持；
  - 粒度问题：requestIdleCallback的调度太粗粒度（可能在唱任务后出发），无法精确控制5ms时间分片；
  - 优先级不支持不足：无法灵活控制任务按优先级调度执行；

```js
// 调度执行的伪代码逻辑
function workLoop(startTime) {
  let nextUnitOfWork = getNextFiber();
  while(nextUnitOfWork !== null) {
    // React通常会在批量处理多个fiber节点后检查
    if(shouldYield(startTime)) {
      // 时间分片耗尽或有高优先级任务：暂停，重新调度
      scheduleNextWork(nextUnitOfWoek);
      return;
    }
    // 处理下一个工作单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWoek);
  }
}
```

7. 批处理是一个破坏性改动，如果你想退出批量更新，你可以使用flushSync；
8. 18之前的版本，开启严格模式会对每个组件进行两次渲染，以便你观察一些意想不到的结果，但是react17中，取消了其中一次渲染的控制台日志，一边让日志更容易阅读；
react18中，官方取消了这个限制，如果你安装了devtools，第二次渲染的日志颜色将显示为灰色，以柔和的方式显示在控制台。

StrictMode故意通过双重渲染组件，帮助开发者发现副作用在渲染之间可能不一致的问题，在并发模式下，React可能会开始一个更新，然后在完成之间中断它，稍后再恢复更新。这意味着如果你的render函数或其他函数有副作用，那么这些副作用可能会在更新完成之前执行多次，从而可能暴露出问题。

StrictMode主要解决以下问题：
  - 不安全的生命周期警告：帮助识别使用了即将废弃的生命周期钩子的组件，鼓励开发者使用更加安全的生命周期方法；
  - 脱离react api的警告：使用比较老的ref api或者直接修改dom；
  - 意外的副作用：识别出不恰当的副作用，使它们在react并发模式下不会产生问题；
  - 弃用的api使用：探测到使用废弃的API和模式；
  - 开发习惯：鼓励使用如key属性等的最佳实践，从而提高应用性能；

### 新的API

1. useId

支持客户端和服务端生成相同的唯一的ID，避免hydration的不兼容，这解决了React17及以下版本中存在的问题。因为服务器渲染提供的HTML时无序的，userId的原理就是每个id代表组件在组件树中的层级结构。

2. useInsertionEffect

useInsertionEffect是react18新增的hook，专门用于处理样式注入的场景。它在样式计算之前同步执行，确保在浏览器开始绘制之前，样式已经插入到dom中。这个hook的目的是避免在使用css-in-js库时的样式闪烁问题。

## React19的新特性

1. React Compuler（自动优化编译器）
  - 描述：React19引入了一个内置编译器（以前称为React Forget），它自动分析组件代码，生成优化的版本。开发者无需手动使用useMemo，useCallback或memo来避免不必要重渲染，编译器会智能处理依赖关系；
  - 好处：减少性能优化模版代码，提高代码可读性。适用于函数组件和hooks；
  - 示例：只编写普通组件，编译器在构建时自动memoize计算密集部分；
  - 注意：需要babel插件支持，目前是可选启用；
2. Actions（表单和异步操作简化）；
  - 描述：引入useActionState hook来处理表单提交和异步动作，支持内置的pending状态、错误处理和乐观更新；
  - 好处：简化服务端表单处理，自动管理加载状态和错误，无需额外状态管理；
  - 示例：
  ```js
  import { useActionState } from 'react';
  function Form() {
    const [state, submitAction, isPending] = useActionState(async (prevState, formData) => {
      // 异步提交数据
      const result = await api.submit(formData);
      return result;
    });
    return (
      <form action={submitAction}>
        <input name="name" />
        <button disabled={isPending}>提交</button>
      </form>
    )

  }
  ```
  - 相关：支持useOptimistic hook用于乐观UI更新；

3. use Hook（简化数据获取）
  - 描述：一个新Hook，支持直接在组件中使用promise和async/await来获取数据，而无需包装在useEffect中；
  - 好处：使异步数据加载更直观，结合Suspense实现加载状态管理；
  - 示例：
  ```jsx
  import { use } from 'react';
  function DataFetcher(){
    const data = use(fetchDataPromise());
    return <div>{data.name}</div>
  }

  ```
  - 注意：需要与Suspense结合处理加载中状态；

4. 函数组件直接支持ref；
函数组件可以直接接收ref参数，无需forwardRef包装。简化ref传递方式，减少模版代码；
```jsx
  import { use } from 'react';
  function MyInput({ ref }) {
    return <input ref={ref} />
  }
```
5. Asset Loading(资源加载优化)

  - 描述：内置支持预加载资源（图像、字体、脚本），通过新的API确保资源在渲染前加载；
  - 好处：性能改进，尤其在SSR中减少闪烁；
  - 示例：`<img src="image.jpg" loading="lazy" />`，自动预加载；新hook如preload用于手动控制；
6. Document Metadata（文档元数据支持）
描述：允许在组件中直接声明 <title>、<meta> 等标签，而无需外部库或 Helmet。
好处：简化 SEO 和元数据管理，尤其在 Next.js 等框架中。
```jsx
  function Page() {
    return (
      <>
        <title>My Page</title>
        <meta name="description" content="Hello" />
        <h1>Content</h1>
      </>
    );
  }
```
注意：React 会自动处理重复标签和优先级。

7. 其他改进和变化
  - Async Components：组件现在可以是 async 函数，直接使用 await（结合 use 和 Suspense）。
  ```jsx
    async function AsyncComponent() {
       const data = await fetchData();
       return <div>{data}</div>;
    }
  ```
  - Hydration 错误处理：更好的客户端/服务器不匹配恢复，支持部分 hydration（只渲染不匹配的部分）。
  - Context as Provider：Context 可以直接用作 Provider 组件，简化语法。
  - Diff 算法优化：细微改进，但核心与 React 18 类似。
  - 废弃/移除：移除 forwardRef 和 memo 的 render 函数支持；一些旧 API 被弃用。


## React Compiler v1.0

React Compiler v1.0 主要用于性能优化。

- 兼容React 和 React Native；
- 自动优化性能；
- 支持Vite、Next.js

React Compiler会在构建阶段自动优化React组件的重渲染逻辑，无需开发者手动编写useMemo、useCallback等优化代码，就能提升应用性能，大大减轻开发负担。

## React19.2
1. <Activity>: 一种用于隐藏和恢复其子项的UI和内部状态的新API，类似于Vue的keep-alive；
2. useEffectEvent 是一个React Hook，可让您将非反应性逻辑提取到Effect Event中；
3. cacheSignal：（用于RSC）让您知道cache()生命周期何时结束；
4. React Performance：轨迹出现在浏览器开发者工具Performance面板时间线上；

React19.2 是一个“打磨型”更新，专注于提升现有功能的稳定性和性能。

