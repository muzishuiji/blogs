## react-code

这里记录一些开发过程中的一些经验

1. 推荐使用 React.FC 申明`Function Component`组件类型与定义 props 参数类型
2. 使用`React.useMemo`来优化渲染性能,避免重复渲染.
3. 使用`App.defaultProps`定义 prop 的默认值

4. 为什么是 React.useMemo 而不是 React.memo?

银租在组件通信时存在 React.useContext 的用法啊,这种用法会使所有用到的组件重渲染,只有`React.useMemo`能处理这种场景的按需渲染.

5. 为什么不使用解构赋值代替`defaultProps`?

使用解构赋值在书写上会更优雅,但是对于对象类型每次 Rerender 时引用都会变化,这会带来性能问题.

6. `useState`定义的变量要语义化一点,方便理解和查阅.
7. `useRef`尽量少用,大量的 Mutable 的数据会影响代码的可维护性.
8. `useReducer`推荐在多组件通信时使用,结合`useContext`一起使用.
9. 可以在函数内部声明普通常量或变量函数吗?

定义在组件内部的常量和函数会在组件每次重新渲染的时候重新执行,所以常量通常推荐定义到函数外层避免性能问题,函数推荐使用`useCallback`声明.

10. 发请求分为操作型请求和渲染型请求.

- 操作型请求


        return React.useMemo(() => {
            return (
                <div onClick="requestService.addList"></div>
            )
        }, [requestService.addList])

- 渲染型请求

渲染型请求在`useAsync`中进行,比如刷新列表页,获取基础信息,或者进行搜索,都可以抽象为依赖了某些变量,当这些变量变化时需要重新取数

        const { loading, error, value } = useAsync(async () => {
            return requestService.freshList(id)
        }, [requestService.freshList, id])

定义组件内共享状态: `store.ts`

        export const StoreContext = React.createContext<{
            state: state;
            dispatch: React.Dispatch<Action>
        }>(null)
        export interface State {};
        export interface Action { type: 'xxx' } | { type: 'yyy' }
        export const initState: State = {}
        export const reducer: React.Reducer<State, Action> = (state, action) => {
            switch(action.type) {
                default:
                    return state;
            }
        }

跟组件注入共享状态: main.ts

        import { StoreContext, reducer, initState } from './store'
        const AppProvider: React.FC = props => {
            const [state, dispatch] = React.useReducer(reducer, initState)
            return React.useMemo(() => {
                <StoreContext.Provider value={{ state, dispatch }}>
                    <App />
                </StoreContext.Provider>
            }, [state, dispatch])
        }

任意子组件访问/修改共享状态- child.ts

        import { StoreContext } from './store'
        const app: React.FC = () => {
            // 拿到组件共享传递过来的state和dispatch
            const { state, dispatch } = React.useContext(StoreContext)
            return React.useMemo(() => {
                <div>{state.name}</div>
            },[state.name])
        }

注入根组件的 props

        const PropsContext = React.createContext<props>(null) // 一个接收props的context组件
        const AppProvider: React.FC<props> = props => {
            return React.useMemo(() => {
                <PropsContext.Provider value={props}>
                    <App />>
                </PropsContext.Provider>
            }, [props])
        }

11. debounce 优化
    input 组件的 onchange 使用 debounce 会有一个问题,当 input 是受控组件时,debounce 的值不能即使回填,导致无法输入的问题.

首先,react 的时间分片机制通过智能调度系统优化渲染优先级,所以我们不必担心频繁的变更状态会导致性能问题,我们需要找到 input change 的时候需要重复渲染的组件中比较慢的组件,我们可以从优化这些组件的渲染入手,通过使用 useDebounce 来降低改组件更新的频率.示例代码如下:

        const App: React.FC = ({ text }) => {
            const textDebounce = useDebounce(text, 1000)
            return useMemo(() => {
                // 渲染
            }, [textDebounce])
        }

通过使用`textDebounce`,将渲染频率控制在指定的范围内.

12. 关于`prop`传递的注意事项:


        class App{
            render() {
                return <Child id={this.state.id} onChange={id => this.setState({id})} />
            }
        }
        // 上面的写法APP组件的更新都会出发child组件的重新渲染
        // 我们可以使用 useCurrentValue 对总是变化的props进行封装
        function useCurrentValue<T>(value: T): React.RefObject<T> {
            const ref = React.useRef(null)
            ref.current = value
            return ref
        }
        const App: React.FC = ({ onChange }) => {
            // 创建一个对变化的prop的引用,每次用的都是这个引用
            const onChangeCurrent = useCurrentValue(onChange)
        }

13. redux 的 createStore 和 redux-thunk 结合可以实现数据持久化， 但要比对缓存中的数据和当前数据的版本，以免功能更新带来的数据展示错误。

其实是通过给 createStore 的第二个参数传入一个函数，根据情况返回缓存中的state，从而实现了数据持久化的效果。




