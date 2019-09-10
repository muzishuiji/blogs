
/**
 * 判断数据类型
 * @param {*} type 
 */
var isType = function (type) {
    return function(obj) {
        return Object.prototype.toString.call(obj) == '[object '+ type +']';
    }
}

var isString = isType('String');
var isArray = isType('Array');
var isNumber = isType('Number');
//这里的isArray的值就是指向isType内部的匿名函数,所以传入的数组[1,2,3]就是匿名函数的形参,所以返回的结果是true.

console.log(isArray([1,2,3]));

//批量注册isType函数
var Type = {};

//这个for循环写的很巧妙.没有传入第三个参数,第二个参数是取数组['String', 'Array','Number']中索引i对应的值传给type
for(var i = 0,type;type = ['String', 'Array','Number'][i++];) {

    //因为下面这个函数是一个回调函数,回调函数属于异步行为,会等到所有的同步行为逻辑执行完以后才会执行
    //所以这个回调函数执行的时候循环已经结束,i的值变成了['String', 'Array','Number']数组长度减一,
    //所以这个时候的type的值是数组的最后一个元素,所以这里我们需要一个立即执行函数形成一个闭包,把每次循环的type值都封闭起来
    (function(type) {
        
        Type['is' + type] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object '+ type +']';
        }
    })(type);
    
}
Type.isArray([]);  //输出: true
Type.isString('sdfsdfdf')  //输出: true

function aaa() {
    var run = false,memo;
    return function () {
        memo = 'sdfsdf'
        if(run) return momo;
        run = true;
        return memo = Arrray.prototype.toString.call([])

    }
}

//闭包和面向对象设计
var extent = function () {
    var value = 0;
    return {
        call: function () {
            value++;
            console.log(value);
        }
    }
}
var exten = extent();
exten.call(); //输出: 1
exten.call(); //输出: 2
exten.call(); //输出: 3

//改成面向对象的写法,这个是将方法绑定在一个对象的属性上
var extent = {
    value: 0,
    call: function () {
        this.value++;
        console.log(this.value);
    }
}
exten.call(); //输出: 1
exten.call(); //输出: 2
exten.call(); //输出: 3

//或者创建一个构造函数,然后将方法绑定在构造函数的原型上,通过实例化这个构造函数,调用原型上的某个方法
var Extent = function() {
    this.value = 0
}
Extent.prototype.call = function () {
    this.value++;
    console.log(this.value);
}
var extent = new Extent();
exten.call(); //输出: 1
exten.call(); //输出: 2
exten.call(); //输出: 3


function loadImgs(start, end) {
    return new Promise (function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url+'?start='+ start + '&end='+ end);
        xhr.onload = function () {
            if(xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = function () {
            reject(xhr.statusText);
        };
        xhr.send();
    })
}

var handler = function () {
    var dataResult = []
    return function *(next) {
        var start = 0,end = 10;
        while (end <= 30) {
           var data = yield loadImgs(start, end);
           dataResult.push(data);
           start += 10;
           end += 10;
        }
        yield next;  //这里要不要加,求指教
        
    }
}

Function.prototype.before = function (beforefn) {
    var _self = this;   //保存原函数的引用
    return function () { //返回了原函数和新函数的"代理"函数
        //执行新函数,修正this,改变传入的函数beforefn运行时候的this,也就是将这个传入的函数绑定在原函数的this对象上,相当于给原函数的this对象绑定一个新的方法(传入的函数)
        beforefn.apply(this, arguments);  
        return _self.apply(this, arguments); //执行原函数
    }

}

Function.prototype.after = function (afterfn) {
    var _self = this;  
    return function () {
        var ret = _self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
}

var func = function () {
    console.log(2);

};

funv = func.before(function () {
    console.log('1');
}).after(function () {
    console.log('3');
})
//1
//2
//3

//命令模式的意图就是把请求封装为对象,从而分离请求的发起者和氢气球的接收者之间的耦合关系
//请求
var Tv = {
    open: function () {
        console.log('打开电视机');
    },
    close: function() {
        console.log('关上电视机');
    }
};
//请求的执行者
var createCommand = function(receiver) {
    var execute = function() {
        return receiver.open();
    }
    var undo = function () {
        return receiver.close();
    }
    return {
        excute: excute,
        undo: undo
    }
}

//请求的发起者
var setCommand = function (command) {
    document.getElementById('execute').onclick = function () {
        command.execute();
    }
    document.getElementById('undo').onclick = function () {
        command.undo();
    }
}

setCommand(createCommand(Tv));

//函数柯里化
var currying = function (fn) {
    var args = [];

    return function () {
        if(arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }
};
var cost = (function () {
    var money = 0;
    return function () {
        for(var i = 0, l = arguments.length; i < l; i++) {
            money += arguments[i];
        }
        return money;
    }
})();

var cost = currying(cost);   //转化成currying函数
cost(100);
cost(200);
cost(300);
alert(cost());

//关于函数节流的一个实现,原理就是设置一个延时,如果延时还没有完成,则忽略请求
var throttle = function (fn, interval) {
    var _self = fn,   //保存被延时执行的函数引用
        timer,        //定时器
        firstTime = true;    ///是否是第一次调用
    return function () {
        var args = arguments,_me = this;
        if(firstTime) {
            _self.apply(_me, args);
            return firstTime = false;
        }
        if(timer) {  //如果定时器还在,说明前一次延迟执行还没有完成
            return false;
        }
        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            _self.apply(_me, args);

        }, interval || 500);
    };
};

window.onresize = throttle(function () {
    console.log(1)
}, 500);

//分时批量操作DOM节点
var timeChunk = function (ary, fn, count, time) {
    var len = ary.length;
    var obj, timmer;
    var start = function () {
        for(var i = 0; i < Math.min(len, count); i++) {
            obj = ary.shift();
            fn(obj);
        }
    }
    return function () {
        timmer = setInterval(function () {
            if(ary.length === 0) {
                return clearInterval(timmer);
            }
            start();
        },time);
    } 
}

var ary = [];
for(var i = 1;i <= 1000; i++) {
    ary.push(i);
}
var renderFriendList = timeChunk(ary, function(){
    var div= createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
}, 8, 200);


//惰性加载函数 
//有时当一个函数有多个分支判断的时候,为了避免每次进入函数都需要进行分支判断,
//有一种方案是我们可以写成自执行函数,在代码加载的时候就立刻进行以此判断,以便让该函数返回了一个包裹正确逻辑的函数
//但是这种方案有个缺点,也许我们并没有使用过这个函数,这样看来,这个函数的自执行反而拖慢了页面首次加载的时间.
//还有一种方案就是惰性载入函数方案,此时该函数依然有一些分支判断,但是在第一次进入分支以后.在函数内部会重写这个函数.,
//重写之后的函数就是我们需要的.在下一次调用该函数的时候,该函数内部变不再会进入分支语句.

var addEvent = function (elem, type, handler) {
    if(window.addEventListener) {
        addEvent = function (elem, type, handler) {
            elem.addEventListener(type, handler, false)
        }
        
    } else if(window.attachEvent) {
         addEvent = function (elem, type, handler) {
            elem.attachEvent(type, handler, false)
        }
    }
    addEvent(elem, type, handler);
}
//这样一来一旦进入分支判断语句addEvent函数就会被重写,避免了每次进入函数都要进行分支判断,又可以保证需要被调用的时候才会被执行


