export const useState = (defaultValue) => {
    const value = useRef(defaultValue);

    const setValue = (newValue) => {
        if(typeof newValue === 'function') {
            value.current = newValue(value.current);
        } else {
            value.current = newValue;
        }
        // 触发组件的重渲染
        dispatchRenderAction();
    }

    return [value.current, setValue];
}

// 批量执行action
let stateHooks
let stateHookIndex
function useState(initial) {
    let currentFiber = wipFiber;
    let oldHook = currentFiber?.alternate?.stateHooks[stateHookIndex];
    const stateHook = {
        state: oldHook ? oldHook.state : initial,
        queue: oldHook ? oldHook.queue : [],
    }
    // 维护一个useState的hook
    stateHook.queue.forEach((action) => {
        stateHook.state = action(stateHook.state);
    });

    // 重置队列queue
    stateHook.queue = [];
    stateHookIndex++;
    stateHooks.push(stateHook);
    currentFiber.stateHooks = stateHooks;
    const setState = (action) => {
        // 避免重复执行
        const eagerState = typeof action === 'function' ? action(stateHook.state) : action;
        if(eagerState === stateHook.state) return;
        stateHook.queue.push(typeof action === 'function' ? action : () => action);
        // 执行update逻辑
        wipRoot = {
            ...currentFiber,
            alternate: currentFiber,
        }
        nextWorkOfUnit = wipRoot;
    }
    return [stateHook.state, setState];
 }
