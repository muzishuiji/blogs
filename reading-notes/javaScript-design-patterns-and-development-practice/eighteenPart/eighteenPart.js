
//代理模式
//本体函数, 负责创建dom元素
var myImage = (function() {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function (src) {
            imgNode.src=src;
        }
    }
})();
//代理函数
var proxyImage = (function () {
    var img = new Image;
    img.onload = function () {
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function(src) {
            //给image标签添加一个默认的图片
            myImage.setSrc('http:// imgcache.qq.com/music/photo/oooGGDysoyAonk.jpg');
            img.src = src;
        }
    }
})();

proxyImage.setSrc('http:// imgcache.qq.com/music/photo/oooGGDysoyAonk.jpg');


//使用迭代器模式实现each函数

var each = function (obj, callback) {
    var value,i =0, isArray = isArraylike(obj);
    if(isArray) { //判断obj是否是类数组
        for(; i < obj.length; i++) {
            callback.call(obj[i], i, obj[i]);
        }
    } else {
        for(i in obj) {
            value = callback.call(obj[i], i, obj[i]);
        }
    }
    return obj;
};

var appendDiv = function (data) {
    each(data, function (i, n) {
        var div = createElement('div');
        div.innerHTML = n;
        document.body.appendChild(div);
    })
};

appendDiv([1,2,3,4,5,6]);
appendDiv({ a:1,b:2,c:3,d:4,e:5,f:6});

//运用开放-封闭原则编写代码来实现对函数的扩展

Function.prototype.after = function (afterfn) {
    var _self = this;
    return function () {
        var ret = _self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

window.onload = (window.onload || function () {}).after(function () {
    console.log('我是window.onload的扩展');
});