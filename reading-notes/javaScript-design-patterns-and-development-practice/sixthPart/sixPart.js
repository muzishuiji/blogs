//一个简单的代理 以小明送花为例
var Flower = function () {};
var xiaoming = {
    sendFlower: function (target) {
        target.receiverFlower();
    }
}
var B = {
    receiverFlower: function () {
        A.listenGoodMood(function() {  //B监听A的心情,在合适的时候给A送花
            var flower = new Flower();  //假设买一束花开销很大,所以在真正需要它的时候去创建.
            A.receiverFlower(flower);
        });
        
    }
};

var A = {
    receiverFlower: function (flower) {
        console.log('收到花' + flower);
    },
    listenGoodMood: function (fn) {
        setTimeout(() => {  //假设A十秒之后心情好
            fn();
        }, 10000);
    }
};

xiaoming.sendFlower(B);


//使用代理模式实现图片预加载
var myImage = (function (){
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return function (src) {
        imgNode.src = src
    }
})();

var proxyImage = (function () {
    var image = new Image;
    img.onload = function () {
        myImage(this.src);
    }
    return function (src) {
        myImage('file:// /C:/Users/svenzeng/Desktop/loading.gif');
        img.src=src;
    }
})();
proxyImage('http://www.baid.com/a.jpg');

//用高阶函数动态地创建代理
/***计算乘积 ***/
var mult = function () {
    var a = 1;
    for(var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
}

/***计算加和 ***/
var plus = function () {
    var a = 1;
    for(var i = 0, l = arguments.length; i < l; i++) {
        a = a + arguments[i];
    }
    return a;
}
/***创建缓存代理的工厂 ***/
var createProxyFunction = function (fn) {
    var cache = {};
    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        console.log(args);
        if(args in cache) { //当该函数已经执行过一次,则直接返回执行结果  
            return cache[args];
        }
        return cache[args] = fn.apply(this, arguments);
    }
}

var proxyMult = createProxyFunction(mult),proxyPlus = createProxyFunction(plus);
console.log(proxyMult(1,2,3,4));
console.log(proxyMult(1,2,3,4));
console.log(proxyPlus(1,2,3,4));
console.log(proxyPlus(1,2,3,4));

//miniConsole的代理
var miniConsole = (function () {
    var cache = [];
    var handler = function (ev) {
        if(ev.keyCode === 113) {
            var script = document.createElement('script');
            script.onload = function () {
                for(var i = 0,fn; fn = cache[i++];) {
                    fn();
                }
            }
            script.src = 'miniConsole.js';
            document.getElementsByTagName('head')[0].appendChild(script);
            document.body.removeEventListener('keydown', handler);
        }
    };

    document.body.addEventListener('keydown', handler, false);
    return {
        log: function() {
            var args = arguments;
            //当log被触发的时候,将每次调用触发的函数存放到cache数组中
            cache.push(function () {
                return miniConsole.log.apply(miniConsole, args);
            })
        }
    }
})();

miniConsole.log(11);


//miniConsole.js 代码
miniConsole = {
    log: function() {
        console.log(Array.prototype.join.call(arguments));
    }
};