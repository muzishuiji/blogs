// 自执行函数模拟块级作用域
(function() {
    for(var i = 0; i < 5; i++) {
        console.log(i); // 0 1 2 3 4
    }
})();


function Parent(name){
    console.log('dddd')
    
    return {
        name
    }
}
const p1 = new Parent('222');


Function.prototype.myCall = function(thisArg, ...args) {
    const fn = Symbol();
    thisArg = thisArg || window;
    thisArg[fn] = this;
    const result = thisArg[fn](...args);
    delete thisArg[fn];
    return result;
}

let obj = {
    name: "muzishuiji"
}
function foo() {
    console.log(this.name)
}
foo.myCall(obj)  // 输出 muzishuiji

Function.prototype.myApply = function(thisArg, args) {
    const fn = Symbol();
    thisArg = thisArg || window;
    thisArg[fn] = this;
    let result = thisArg[fn](...args);
    delete thisArg[fn];
    return result;
}
let obj = {
    name: "muzishuiji"
}
function foo() {
    console.log(this.name)
}
foo.myApply(obj, [])  // 输出 muzishuiji


Function.prototype.myBind = function (thisArg, ...args) {
    let self = this;
    var _fun = function () {
        // new调用该函数
        return self.apply(this instanceof self ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)) )
    }
    // 继承原型上的属性和方法
    _fun.prototype = this.prototype;
    return _fun;
}
let obj = {
    name: "muzishuiji"
}
function foo() {
    console.log(this.name)
    console.log(arguments)
}
const aa = foo.myBind(obj, 'a', 'b', 'c')  // 输出 muzishuiji
aa(); // 输出 muzishuiji a b c