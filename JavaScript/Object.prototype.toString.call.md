我们先来看看toString方法,每个引用类型都可以调用toString方法

    Object.toString();   // "function Object() { [native code] }"

    Array.toString();    // "function Array() { [native code] }"

    Function.toString(); // "function Function() { [native code] }"

    Data.toString();     // "function Date() { [native code] }"

    RegExp.toString();   // "function RegExp() { [native code] }"
    
    Array.toString === Object.toString;       // true
    Date.toString === Object.toString;        // true
    RegExp.toString === Object.toString;      // true
    Function.toString === Object.toString;    // true

引用类型对象的toString都指向同一个地址,他们返回的结果都是调用该方法的对象.

而Object.prototype.toString方法返回的是调用它的对象的数据类型(也就是this这个对象的数据类型),我们大胆做以下尝试:

    Object.prototype.toString();   // "[object Object]"
    var tempFun = Object.prototype.toString;

    var aaa = [];  
    aaa.tempFun = tempFun;
    aaa.tempFun();      //  "[object Array]"

    var reg = new RegExp();
    reg.tempFun = tempFun;
    reg.tempFun();     //  "[object RegExp]"

    var fun = new Function();
    fun.tempFun = tempFun;
    fun.tempFun();     //  "[object Function]"


果不其然,和我们预想的一样,也就是说Object.prototype.toString其实就是返回toString方法执行时候的this这个对象的数据类型,

我们通过调用call方法来绑定Object.prototype.toString执行时候的this对象,从而得到了传入对象的数据类型,焕然大悟~~
