//在不改变函数源代码的情况下,我们可以通过保存原引用的方式改写某个函数
var a = function () {
    alert('1');
    console.log(this);
}
var _a = a;
a = function () {
    alert('2');
    _a();
}
a();

//但是使用上述方法是有弊端的:
//(1) 必须维护_a这个中间变量,当需要装饰的函数变多,这些中间变量也会越来越多
//(2) this的指向发生了改变,a作为普通函数调用时指向window,但是函数作为对象的方法调用时,this则指向该对象
var _getElementById = document.getElementById;  //该函数的this此时是指向window的
document.getElementById = function (id) {
    alert(1);
    // return _getElementById(id);  //该函数的this此时是指向document的
    return _getElementById.apply(document, arguments); //通过apply方法绑定this  
}

var button = document.getElementById('button');

//用AOP(面向切面编程)装饰函数
Function.prototype.before = function (beforefn) {
    var _self = this;
    return function () {
        //当beforefn返回false的时候直接return
        if(beforefn.apply(this, arguments) === false) {
            return;
        }
        return _self.apply(this, arguments); //先执行beforefn的作用是为了获取到最新的arguments参数
    }
}

Function.prototype.after = function (afterfn) {
    var _self = this;
    return function () {
        var ret = _self.apply(this, arguments); //先执行_self的作用是为了保留原先的arguments参数
        afterfn.apply(this, arguments);
        return ret;
    }
}

//借用这个便利,我们可以实现动态地给某个函数增加参数
var getToken = function () {
    return 'Token';
}

ajax = ajax.before(function (type, url, param) {
    param.Token = getToken();
})
ajax('get', 'http://xxx.com/userInfo', { name: 'svrf'});

var a = [
    { type: 1 },
    { type: 2 },
    { type: 3 },
    { type: 4 },
    { type: 5 },
    { type: 6 },
    { type: 7 },
    { type: 8 },
    { type: 9 }
]
var b = [
    { type: 1 },
    { type: 1 },
    { type: 1 },
    { type: 2 },
    { type: 2 },
    { type: 2 },
    { type: 3 },
    { type: 4 },
    { type: 5 },
    { type: 6 }
]
Array.prototype.contains = function (obj) {  
    var i = this.length;  
    while (i--) {  
        if (this[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
} 
function equalObject(obj1, obj2) {
    var aProps = Object.getOwnPropertyNames(obj1),
        bProps = Object.getOwnPropertyNames(obj2);
    if(aProps.length != bProps.length) {
        return false;
    }
    for(var i=0; i < aProps.length; i++) {
        var propName = aProps[i];
        console.log();
        if(obj1[propName] !== obj2[propName]) {
            return false;
        }
    }
    return true;
}
function hebing(a, b) {
    var c=[], isNull = true;
    for(var i=0; i < a.length; i++) {
        for(var j=0; j < b.length; j++) {
            if(Object.prototype.toString.call(a[i]) !== Object.prototype.toString.call(b[j])) {
                return [];
            } else if(Object.prototype.toString.call(a[i]) === "[object Object]" ) {
                if(equalObject(a[i], b[j])) {  
                    // console.log(a[i], b[j]); 
                    if(isNull) {
                        c[c.length] = b[j];
                        isNull = false;
                    } else{
                        var hasOnly = false;
                        for(var k = 0; k < c.length; k++) { 
                            console.log(b[j], c[k], k);
                            if(equalObject(b[j], c[k])) {
                                hasOnly = true;
                            }
                        }
                        if(!hasOnly) {
                            c[c.length] = b[j];
                        }
                    }           
                    
                }
            } else {
                if(a[i]===b[j]) {
                    c.contains(b[j]) ? c.push(a[i]) : '';
                }
            }
        }
    }
    return c;
}
hebing(a,b);