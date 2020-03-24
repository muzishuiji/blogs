# 记录我阅读优秀技术博客的一些笔记

## 第一篇 <<精读极客公园 2019>>

1. 多问问 why not,少说多做,不妥协,去改变.
2. 我想去做 xxx.为什么不呢?失败了怎么办?不做又怎么知道呢?为什么不呢?
3. 怎样成为一个懂算法,人工智能与城市规划的复合型人才.
4. 未来的云计算期可以是分布式的,算法开源出来,各大服务器厂商允许用户上传自己的算法.
5. 人的成长可能有一段转折,也就是在达到愚昧巅峰时,需要跌入绝望之谷,才能爬向真正的智慧之巅.
6. 数据就是能源.

数据就像石油一样,在起初就是流量,甚至可以打包出售,但随着我们对数据挖掘能力的提高
将数据结合算法与 AI,转化为决策依据,转化为自动价值,转化为健康预测,等等,所以数据就是财富.

"大数据时代"反而是数据挖掘的初级阶段,因为我们的数据处理方式有限,就像挤海绵一样,一大块海绵只能挤出几滴水,在未来的高级数据挖掘时代,可能是"小数据时代",通过少量数据就能提取许多有效信息.

7. 三级火箭是互联网运作的基本模式.

- 通过免费产品吸引用户,这是第一级火箭
- 之后通过互动产品留住客户,这是第二级火箭
- 最后将用户分发到游戏,商品等内容,榨取利润.

8. 将互联网运用在各个垂直产业,带来实实在在的效率提升,是走出互联网寒冬的基本方法.

所有成功的创业公司都是在国家发展路线中踩对了点,通过观察环境,让自身跟着大趋势走,才能得到成功.

9. 创新与产品的关系:

- 产品需求 -> 创新
- 技术创新 -> 新产品
- 多产品抽象需求 -> 平台级创新

10. 未来谁能服务好中小企业玩家,谁就是下一个平台.
11. 中国式经济魔方中潜藏的创新机会
12. 人口过多带来的各种层次化差异,导致有了淘宝和京东,还可以创造出拼多多.
13. 未来处于上升阶段的行业: 交通,教育,文化娱乐,医疗.
14. 由于中国人口众多,地域,文化各种差异较大,所以会有更多的创新创业的机会.
    关键是要找到一个具体的问题,然后通过一系列途径和方案去解决它.
15. 现在这个时代,人人都在关注数据价值.
16. 传统企业在消亡,传统行业在兴起,传统行业\*互联网才能创造更大的价值.
17. 智能造车,未来世界一定是逐步取代重复劳动力的时代,在这样的时代如何更好地自处不被社会抛弃,使我们一直要思考的问题.
18. 流量红利消失,流量成本已经超过收益,烧钱是没有用的了,只有真正优秀的产品,真正为客户解决实际的问题的产品,才能更好地生存.
19. 利用机器学习进行画质修复,利用机器学习去分析音频,实现剧情的跳转和只看某个人.
20. 有时间的话看看<<刷新>>一书
21. 专注于一件事,并坚持下去
22. 创业团队要招到比自己更优秀的人.
23. 专注于深挖图像技术可否?

24. 未来技术的方向: 机器学习,人工智能,图像处理,可视化.

25. 迪士尼的创新来自于不断试错

## 第二篇 <<setState 做了什么>>

1. 跨端组件的开发思想,暴露统一的 api 接口,然后内部根据不同的平台做具体的实现.
2. react 只做 view 层的涉及,不做 dom 更新,而是交由第三方 npm 包去定义 updater.

这样更新 dom 的逻辑就可以根据我们开发平台的需要去引入对应的 npm 包,从而用于适用项目所服务平台的 updater 函数.

3. 通用查询服务的实现也是借助同样的原理,磨平不同数据库之间查询数据的语法差异,暴露统一的 API 接口,让用户通过一套 SQL 查询各种类型的数据库中的数据.
4. 收敛的第一步是先统一 API.
5. 思考一些像 setState 一样的规范与实现分离的案例

我个人觉得 react 的事件处理机制就是规范与实现分离的案例,暴露出统一的 api,帮我们磨平浏览器对于 DOM 事件处理之间的差异.

## 第三篇 <<重新思考 Redux>>

1. 评价一个框架或工具的质量:

`工具质量 = 工具节省的时间/使用工具消耗的时间`

2. redux 给我们带来状态管理的便利的同时,还会创造出一些耗时耗力需要解决的问题.
   (关于这一点,我没有足够的实践,暂时不知道 redux 的带来的不好的地方.)

3. 基于 Redux 的框架需要解决什么问题.

- 简化初始化


    // redux现有的使用方式
    const store = preloadedState => {
      return createStore(
        rootReducer,
        preloadedState,
        compose(applyMiddleware(thunk, api), DevTools.instrument())
      )
    }
    // 如果换成配置的方式
    const store = new Redux.Store({
      initialState: {},
      reducers: {count},
      middlewares: [api, devTools]
    })

- 简化 Reducers

redux 的 reducer 粒度太大,不但导致函数内手动配置 type,还带来了 type,payload 等理解成本

    const countReducer = (state, action) => {
      switch(action.type) {
        case INCREMENT:
          return state + action.payload;
        case DECREMENT:
          return state - action.payload;
        default:
          return state;
      }
    }
    // 如果用配置的方式设置reducers,就像定义一个对象一样,会更清晰
    const countReducer = {
      INCREMENT: (state, action) => state + action.payload,
      DECREMENT: (state, action) => state - action.payload
    }

- 支持 async/await


    // redux 处理动态数据,异步dispatch
    const incrementAsync = count => async dispatch => {
      await delay();
      dispatch(increment(count))
    }
    // 异步action
    const incrementAsync = async count => {
      await delay()
      dispatch(increment(count))
    }

- 将 action + reducer 改为 action

如果我们只有两类 action: reducer action 和 effect action

- reducer action: 改变 store
- effect action: 处理异步场景,能调用其他 action 不能修改 store,同步的场景,一个 reducer 函数就能处理,只有异步场景需要 effect action 处理掉异步部分,同步部分依然交给 reducer 函数,这两种 action 职责更清晰.

* 不再显示申明 action type

不要用一个文件存储 action 的类型了,`const ACTION_ONE = 'ACTION_ONE'` 其实就是重复写了一遍字符串,直接用对象的 key 表示 action 的值,再加上 store 的 name 为前缀保证唯一性即可.

- Reducer 直接作为 ActionCreator

redux 调用 action 比较繁琐,使用 dispatch 或者将 reducer 经过 ActionCreator 函数包装,为什么不直接给 reducer 自动包装 ActionCreator 呢?减少样板代码,让每一行代码都有业务含义.

    // 代码示例
    import { init, dispatch } from '@rematch/core'
    import delay from './makeMeWait';
    const count = {
      state: 0,
      reducers: {
        increment: (state, payload) => state + payload,
        decrement: (state, payload) => state - payload
      },
      effects: {
        async incrementAsync(payload) {
          await delay();
          // reducer自动包装成actionCreator,可被dispatch直接调用
          this.increment(payload);
        }
      }
    }
    const store = init({
      models: { count }
    })
    dispatch.count.incrementAsync(1)

- 关于 reducer 申明与调用参数不一致的问题:

reducer 声明的时候是两个参数,而调用的时候是一个参数,基于此点,我们可以做如下更改:

    const count = {
      state: 0,
      reducers: {
        increment: payload => this.state + payload,
        decrement: payload => this.state - payload
      },
      effects: {
        async incrementAsync(payload) {
          await delay();
          this.increment(payload);
        }
      }
    }

总结: 在想清楚如何减少使用成本之前,不要着急讲一个工具用在项目中.因为可能会导致使用工具节省的时间远小于使用工具消耗的时间.

## 第四篇 <<前端数据流哲学>>

1. 数据流管理模式

比较热门的数据流管理模式分为三种:

- 函数式,不可变,模式化. 典型实现: Redxu-简直就是正义的化身.
- 响应式,依赖追踪.典型实现: Mobx
- 响应式,和楼上的区别是以流的形式实现,典型实现: Rxjs, xstream

数据流使用通用的准则是: 副作用隔离,全局与局部状态的合理划分.

react 只是一个 view 层

2. rxjs

rxjs 给前端数据流带来了全新的视角,rxjs 带来了两种新的开发方式,第一种是 cycle.js,将一切前端副作用转化为数据源,直接对接到 dom,另一种是类似 redux-observable,将 rxjs 数据流处理能力融合到已有的数据流框架中.

如果说 redux-saga 解决了异步,那么 redux-observable 就是解决了副作用(将一些副作用转化为数据源),同时赠送了 rxjs 数据处理能力.

3. 综合这些框架的思想,我们能收获点什么?

redux 和 rxjs 完全隔离了副作用,因为他们有一个共性,那就是对前端副作用的抽象.

redux 通过在 action 中做副作用,将副作用隔离在 reducer 之外,使 reducer 成为了纯函数.

rxjs 将副作用先转化为数据源,将副作用隔离在管道流处理之外.

而 mobx,缺少了对副作用抽象这一层,所以导致了代码写的比 redux 和 rxjs 更爽,但副作用与纯函数混杂在一起,因此与函数式无缘.

4. 现在的前端开发过程分为三个部分: 副作用隔离 => 数据流驱动 => 视图渲染

5. 对框架封装的抽象度越高,框架之间的差异就越小,渐渐的,我们从框架名称的讨论中解放,演变成对框架+数据流哪种组合更加合适的思考.
6. 前端的框架可能会尽力从无到有,或者从有到无的过程,但是一些优秀的编程思想会被保留下来.

## 第五篇 <<react 代码整洁之道>>

1. 避免重复的代码段.


    // Dirty
    const MyComponent = () => {
      <div>
        <OtherComponent type="a" className="colorful" foo={123} bar={456}>
        <OtherComponent type="b" className="colorful" foo={123} bar={456}>
      </div>
    }
    // Clean
    const MyOtherComponent = ({type}) => (
      <OtherComponent type="b" className="colorful" foo={123} bar={456}>
    )
    const MyComponent = () => {
      <div>
        <MyOtherComponent type="a" />
        <MyOtherComponent type="b" />
      </div>
    }

2. 可预测,可测试

3. 自我解释

减少注释,让代码写的更加语义化,只注释复杂,潜在逻辑.

    // Dirty
    const fetchUser = (id) => {
        fetch(buildUri`/users/${id}`) // Get User DTO record from REST API
        .then(convertPormat) // Convert to snakeCase
        .then(validateUser) // Make sure the the user is valid
    }
    // Clean
    const fetchUser = (id) => {
        fetch(buildUri`/users/${id}`)
        .then(snakeToCamelCase)
        .then(validateUser)
    }

4. 斟酌变量名

布尔值或者返回值是布尔类型的函数,命名以 is,has,should 开头.

    // Dirty
    const done = current => goal
    // Clean
    const isComplete = current => goal
    // 函数以其效果命名,而不是怎么做的来命名
    // Dirty
    const loadConfigFromServer = () => {
      // ...
    }
    const loadConfig = () => {
      // ...
    }

5. 遵循设计模式

对于 React,遵循以下几个最佳实践:

- 单一职责原则,确保每个功能都完整完成一项功能,比如更细粒度的组件拆分,同时也要便于测试.
- 不要把组件内部的依赖强加给使用方
- lint 规则尽量严格

函数式编程,只要为每个功能写一遍,剩下的就是记住并调用它

6. 逻辑与渲染分离,便于维护,其次便于测试.

7. 提倡无状态组件


    // Dirty
    class TableRowWrapper extends Component {
      render() {
        return (
          <tr>
            {this.props.children}
          </tr>
        )
      }
    }
    // Clean
    const TableRowWrapper = ({ children }) => (
      <tr>{children}</tr>
    )

无状态组件更适合上层具有业务含义的组件,页面级别组件状态太多,不合适,五一无状态组件比较适合对基础组件包裹并增强业务能力这一层.

8. 解构


    // Dirty
    const splitLocale = locale.split('-');
    const language = splitLocale[0];
    const country = splitLocale[1];

    // Clean
    const [language, country] = locale.split('-');

9. 推荐在 typescript 中开启 strict 模式,强制使用良好的开发习惯.

## 第六篇 <<精读 React 高阶组件>>

1. HOC 的适用范围

对比 HOC 范式 `compose(render)(state)`与父组件(Parent Component)的范式`render(render(state))`,如果完全利用 HOC 来实现 React 的 implement,将擦欧总与 view 分离,也未尝不可,但并不优雅.HOC 本质上是统一功能抽象,强调逻辑与 UI 分离,但在实际开发中,前端无法逃离 DOM,而逻辑与 DOM 的相关性主要呈现 3 种关联形式.

- 与 DOM 相关,建议使用父组件,类似于原生 HTML 编写.
- 与 DOM 不相关,如校验,权限,请求发送,数据转换这类,通过数据变化间接控制 DOM,可以使用 HOC 抽象.
- 交叉的不部分,DOM 相关,但可以做到完全内聚,即这些 DOM 不回话外部有关联,均可.

HOC 适合做和 DOM 不相关,又是多个组件的共性操作.例如表单的校验和数据请求(react-refetch).

    connect(props => ({
      usersFetch: `/users?status=${props.status}&page=${props.page}`,
      useStatsFetch: {url: `/users/stats`, force: true }
    }))(UsersList)

通过高阶组件可以将更细粒度的组件组合成 Selector 与 Search

Props Proxy 的两个作用: **提取 state** 和 **操作 props**

    function formFactoryFactory({
      validator,
      trigger = 'onChange',
      ...
    }) {
      return FormFactory(WrappedComponent) {
        return class Decorator extends React.Component {
          getBind(trigger, validator) {
            ...
          }
          render() {
            const newProps = {
              ...this.props,
              [trigger]: this.getBind(trigger, validator)
            }
            // 高阶组件为WrappedComponent加上一层校验追踪
            return <WrappedComponent { ...newProps } />
          }
        }
      }
    }
    // 调用
    formFactoryFactory({
      validator: (value) => {
        return value !== ''
      }
    })(<Input placeholder="请输入..." />)


    import { createForm } from 'rc-form';
    class Form extends React.Component {
      submit = () => {
        this.props.form.validateFields((error, value) => {
          console.log(error, value)
        })
      }
      render() {
        const { getFieldError, getFieldDecorator } = this.props.form;const errors = getFieldError('required)
        return (
          <div>
            {getFieldDecorator('required', {
              rules: [{ required: true }],
            })(<Input />)}
            {errors ? errors.join(','): null}
            <button onClick={this.submit}>submit</button>
          </div>
        )
      }
    }
    export createForm()(Form)

**组合优于继承**

## 第七篇 <<入坑 react 前没有人会告诉你的事>>

1. 要做好基于 react 的前端架构,你不仅需要对自己的业务了如指掌,还需要对各种解决方案的特性以及适合怎样的业务形态了如指掌.

2. react 生态如此活跃和庞大,对于新手来说经常会迷茫同一个功能选择哪个技术的问题,毕竟不了解,你可能没有办法选择更适合自己项目业务场景的技术.这就是 react 给开发者的考验.

## 第八篇 <<useEffect 完全指南>>

1. Function Component 是更彻底的状态驱动抽象,甚至没有 class component 生命周期的概念,只有一个状态,而 React 负责同步到 DOM.

2. 学习启发式思考和逐层递进的方式写作.

3. 每次 Render 都有自己的 Props 和 State.

可以认为每次 Render 的内容都会形成一个快照并保留下来,因此当状态变更而 Rerender 时,就形成了 N 个 Render 状态,而每个 Render 状态都拥有自己固定不变的 Prop 与 State.

    function Counter() {
      const [count, setCount] = useState(0)
      return (
        <div>
          <p>You clicked { count } times</p>
          <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
      )
    }

每次点击时,count 只是一个存在与 render 函数中的不会变的常量.所以每次 Render 的过程中,count 的值都会被固化为: 1,2,3,像下面这样:

    // During first render
    function Counter() {
      const count = 0;  // returned by useState
      // ...
      <p>You clicked {count} times</p>
      // ...
    }
    // after a click, our function is called again
    function Counter() {
      const count = 1;  // renturned by useState
      // ...
      <p>You clicked {count} times</p>
      // ...
    }
    // after another click, our function is called again
    function Counter() {
      const count = 2;  // renturned by useState
      // ...
      <p>You clicked {count} times</p>
      // ...
    }

其实不仅是对象,函数在每次渲染时也是独立的,这就是 Capture Value 特性.

`useEffect`也一样具有`Capture Value`的特性,`useEffect`在实际 DOM 渲染完毕后执行,那 `useEffect`拿到的值也遵循`Capture Value`的特性.`useEffect`在每次 Render 的过程中,拿到的 count 都是固化下来的常量.

4. 如何绕过 Capture Value

利用`useRef`就可以绕过 Capture Value 的特性,可以认为 red 在所有 Render 过程中保持着唯一引用,因此对 Ref 的复制或取值,拿到的都只有一个最终状态,而不会在每个 render 间存在隔离.

    function Example() {
      const [count, setCount] = useState(0);
      const latestCount = useRef(count);

      useEffect(() => {
        // Set the mutable latest value
        latestCount.current = count;
        setTimeout(() => {
          // Read the mutable latest value
          console.log(`You clicked ${latestCount.current} times`);
        }, 3000);
      });
      // ...
    }

5. 用同步取代生命周期

Function Component 不存在生命周期,所以不要把 Class Component 的生命周期概念搬过来试图对号入座,Function Component 仅描述 UI 状态,React 会将其同步到 DOM,仅此而已.

6. 不要对 Dependencies 撒谎

一定要诚实引入 useEffect 内部用到的所有依赖,不然会产生意想不到的错误,但是诚实有的时候也会带来麻烦,如下面的代码:

    // 这样的代码会导致频繁的生成/销毁定时器,带来了一定的性能负担
    useEffect(() => {
      const id = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      return () => clearInterval(id);
    }, [count]);

使用 react 提供的`useReducer`可以创建一个局部的`Redux`,这样不管在更新数据时需要依赖多少变量,在调用更新的动作里都不需要依赖任何变量.

    const [state, dispatch] = useReducer(reducer, initialState);
    const { count, step } = state;

    useEffect(() => {
      const id = setInterval(() => {
        dispatch({ type: "tick" }); // Instead of setCount(c => c + step);
      }, 1000);
      return () => clearInterval(id);
    }, [dispatch]);

7. useCallback

useCallback 可以将我们创建一个有状态依赖的函数,当以来状态发生变化时,该函数会重新创建,这样依赖该函数的 useEffect 也会重新执行.给函数添加依赖使得逻辑内聚.

通常,一个 Class Componnet 的普通取数需要考虑这些点:

- 在 DidMount 初始化发请求
- 在 DidUpdate 判断取数参数是都变化,变化后就调用取数函数重新取数
- 在 unmount 生命周期添加 flag,在 didMount, didUpdate 两处做兼容,当组件销毁时取消取数,避免内存泄漏.

这样的取数据过程,需要在不同的生命周期里维护多套逻辑,如果换成 Function Component 的话,会是这样的.

    function Article({id}) {
      const [article, setArticle] = useState(null)
      // 副作用,在依赖发生变化后,取数据之后更新数据, 然后再组件销毁的时候
      清除相关副作用
      useEffect(() => {
        let didCancel = false;
        async function fetchData() {
          const article = await API.fetchArticle(id)
          if(!didCancel) {
            setArticle(article)
          }
        }
        fetchData()
        return () => {
          didCancel = true
        }
      },[API.fetchArticle, id])
    }

学会忘记可以更好的理解,不要把别的模式的固有思维套结再另一个模式上去理解.
