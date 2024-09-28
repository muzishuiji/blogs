// 用hooks模拟实现生命周期
// 1. componentDidMount
// 2. componentWillUnmount
useEffect(() => {
    console.log('component did mount')
    return () => {
        console.log('component did unmount')
    }
}, []);

// 3. componentDidUpdate
useEffect(() => {
    console.log('component did update')
}, [dependency1, dependency2]);

// 4. shouldComponentUpdate
const MyComponent = React.memo(function MyCom(props) {
    return <div>{props.value}</div>
});

// 5. getDerivedStateFromProps：用props更新state，结合useEffect和useState实现
function MyComponent(props) {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if(props.someProp !== state.someProp) {
            setState({
                someProp: props.someProp
            });
        }
    }, [props.someProp]);
    return <div>{state.someProp}</div>
}

// 6. getSnapshotBeforeUpdate：在更新前获取dom信息
function MyComponent() {
    const myRef = useRef();

    useEffect(() => {
        const snapshot = myRef.current.getBoundingClientRect();
        console.log(snapshot)
    }, []);

    return <div ref={snapshot}>some content</div>
}


