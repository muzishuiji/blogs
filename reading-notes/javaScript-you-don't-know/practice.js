MyModules.define("bar", [], function() {
    function hello(who) {
        return "Let me introduce: " + who;
    }
    return {
        hello: hello
    };
});

MyModules.define("foo", ["bar"], function (bar) {
    var hungry = "hippo";
    function awesome() {
        console.log(bar.hello(hungry).toUpperCase());
    }
    return {
        awesome: awesome
    }
});
var bar = MyModules.get("bar");
var foo = MyModules.get("foo");
bar.hello("hippo");  // Let me introduce: hippo
foo.awesome();   // LET ME INTRODUCE: HIPPO

// bar.js
function hello(who) {
    return "let me introduce: " + who;
}
export hello;

// foo.js
// 从bar模块中导入hello()
import hello from "bar";
var hungry = "hippo";
function awesome() {
    console.log(hello(hungry).toUpperCase());
}
export awesome;

// baz.js 
// 导入完整的"foo"和"bar"模块
module foo from "foo";
module bar from "bar";
console.log(bar.hello("rhino"));
foo.awesome();

function foo() {
    console.log(a);
}
function bar() {
    var a = 3;
    foo();
}
var a= 2;
bar();

'use strict'
function foo() {
    console.log(this.a);
}
var a = 2;


function test(a,b,c) {
    var array = [].slice.call(arguments, 2);
    console.log(array);
}
test("sddd", "sdd","是的发送到");
// 软绑定
// 当this指向全局或者不存在的时候将其绑定到obj上
if(!Function.prototype.softBind) {
    Function.prototype.softBind = function () {
        var fn = this;
        // 捕获所有curried参数
        var currird = [].slice.call(arguments, 1); // 截取从第二个参数开始以后的参数
        var bound = function () {
            return fn.apply(
                (!this || this === (window || global))? object : this, 
                currird.concat.appl(currird, arguments)
            );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    }
}
// 这样创建出来的bound对象会继承fn函数,如果函数执行时候的this没有被明确指定,则软绑定到obj对象上
var myObject = {
    get a() {
        return 2;
    }
}
myObject.a = 3;
myObject.a;

// Object.create()的polyfill代码
if(!Object.create) {
    Object.create = function (o) {
        function F() {};
        F.prototype = o;
        return new F();
    }
}

// 两种创建对象之间的关联的方法

// 典型的"原型"面向对象风格
function Foo(who) {
    this.me = who;
}
Foo.prototype.identify = function () {
    return "i am " + this.me;
};

function Bar(who) {
    Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);
console.log(Bar.prototype);
Bar.prototype.speak = function () {
    alert("Hello, " + this.identify() + ".");
};
var b1 = new Bar("b1");
var b2 = new Bar("b2");
b1.speak();
b2.speak();

// 对象关联的风格
Foo = {
    init: function (who) {
        this.me = who;
    },
    identify: function () {
        return "I am " + this.me;
    }
};
Bar = Object.create(Foo);
Bar.speak = function () {
    alert("Hello, " + this.identify() + ".");
}
console.log(Bar instanceof Foo);
var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);
b2.init();

b1.speak();
b2.speak();


// class语法糖来在JavaScript中实现类继承的功能
// 事实上,JavaScript中并没有真正的类,所谓的继承就是通过[[Prototype]]原型链的查找来实现的
class Widget {
    constructor(width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }
    render($where) {
        if(this.$elem) {
            this.$elem.css({
                width: this.width + "px";
                height: this.height + "px";
            }).appendTo($where);
        }
    }
}
class Button extends Widget {
    constructor(width, height, label) {
        super(width,height);  // 通过super()来引用父类中的方法
        this.label = label || "Default";
        this.$elem = $("<button>").text(this.label);
    }
    render($where) {
        super($where);
        this.$elem.click(this.onclick.bind(this));
    }
    onclick(evt) {
        console.log("button " + this.label + " clicked!")
    }
}
$(document).ready(function() {
    var $body = $(document.body);
    var btn1 = new Button(125,30,"hello");
    var btn1 = new Button(150,40,"world");
    btn1.render($body);
    btn2.render($body);
})