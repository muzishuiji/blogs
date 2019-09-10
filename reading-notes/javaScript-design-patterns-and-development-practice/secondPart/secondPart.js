/**
 * this
 */

 //1.作为对象的方法调用
var obj = {
    a: 1,
    getA: function() {
        alert(this === obj);  
        alert(this.a);
    }
}
obj.getA();  //此时的this指向调用它的对象obj

//2. 作为普通函数调用,有的时候我们不小心把一个函数当做普通函数调用时,就会导致this丢失
window.name = 'ddd';
var myObject = {
    name: 'dddsdf',
    getName: function () {
        return this.name
    }
}
var getName = myObject.getName;
console.log(getName());         //现在相当于该函数是做为普通函数调用,那么此时的this指向window

//3. 构造器调用
//通常情况下,构造器中的this指向返回的对象,但是如果返回的不是一个对象或者是一个基本类型的数据则此时的this指向该构造对象.
var MyClass = function () {
    this.name = "sddf"
}
var obj = new MyClass();
alert(obj.name);   //输出sddf

var MyClass = function () {
    this.name = "sddf";
    return {
        name: "lijier"
    }
}
var obj = new MyClass();
alert(obj.name);   //输出lijier 因为构造函数返回来一个对象,导致运行时候的this指向该对象

//4. Function.prototype.call或Function.prototype.apply调用
var obj1 = {
    name: "sven",
    getName: function() {
        return this.name
    }
};

var obj2 = {
    name: "name"
};

//通过调用apply或者call可以改变函数运行时候的this指向,使得函数运行时后的this指向传入的第一个参数
console.log(obj1.getName());             //输出: sven
console.log(obj1.getName.call(obj2));    //输出: name 


document.getElementById('div1').onclick = function() {
    alert(this.id);       //div1
    var func = function () {
        alert(this.id); 
    }
    func();            //undefind,作为普通函数调用,this指向window
    func.call(this);   //div1,绑定了函数运行时候的this
}

//5. function.prototype.bind的实现
Function.prototype.bind = function(context) {
    var self = this;
    return function() {
        return self.apply(context. arguments);
    }
};
var obj = {
    name: 'sdssd'
};
var fun= function() {
    console.log(this.name)
}.bind(obj);

fun();

//当我们想要某个对象具有某个方法,我们可以采用   方法.call(这个对象) 方法.apply(这个对象)
