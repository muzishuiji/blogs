function currying(fn, ...args) {
    if(args.length >= fn.length) {
        return fn(...args);
    } else {
        return (...args2) => currying(fn, ...args, ...args2);
    } 
}

const add = (a, b, c) => {
    return a + b + c;
}
const curryingFun = currying(fn);
curryingFun(1)(2)(3);
curryingFun(1,2)(3);
curryingFun(1)(2, 3);
curryingFun(1, 2, 3);
