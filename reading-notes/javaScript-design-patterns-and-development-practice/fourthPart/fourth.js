//单例模式的简单实现
var Singleton = function (name) {
    this.name = name;
    this.instance = null;
};
Singleton.prototype.getName = function (name) {
    alert(this.name);
};

Singleton.getInstance = function (name) {
    if(!this.instance) {
        console.log('ff');
        this.instance = new Singleton(name);
    }
    return this.instance;
};

var a = Singleton.getInstance('dsfsdf');
var b = Singleton.getInstance('gggg');
console.log(a, b);

//用代理实现单例模式
var CreateDiv = function (html) {
    this.html = html;
    this.init();
}

CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.html = this.html;
    document.body.appendChild(div);
}

var ProxySingletonCreateDiv = (function () {
    var instance;
    return function (html) {
        if(!instance) {
            instance = new CreateDiv(html);
        } 
        return instance;
    }
})();

var a = new ProxySingletonCreateDiv('dfdf');
var b = new ProcessingInstruction('ssssee');
alert(a === b);

//我们都知道在编程中应当尽可能的减少对全局变量的使用,以防止它造成命名空间污染,下面有几种编程方法可以降低这种污染

//(1) 使用命名空间
var namespace1 = {
    a: function () {
        alert('sdf');
    },
    b: function () {
        alert('dfgdf');
    }
}

// 动态创建命名空间
var myApp = {}
myApp.namespace = function (name) {
    var parts = name.split('.');
    var current = myApp;
    for(var i = 0; i < parts.length; i++) {
        if(!current[parts[i]]) {//当该属性不存在的时候定义该属性是一个对象
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }

};

myApp.namespace('event');
myApp.namespace('dom.style');
console.dir(myApp);

//(2) 利用闭包封装成死有对象  _name 和 _age 被封装在闭包产生的作用域中,外部是访问不到这两个变量的,这就避免了对全局的命令污染.
var user = (function () {
    var _name = name,
        _age = 28;
    return {
        getUserName: function () {
            return _name + ' ' + _age;
        }
    }
})();

//创建一个div
var createLoginLayer = function () {
    var div = document.createElement('div');
    div.innerHTML = '我是登录弹窗';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
}

//创建一个iframe
var createSingleFrame = function () {
    var iframe = document.createElement('frame');
    document.body.appendChild(div);
    return iframe;
};

var getSingle = function () {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}
var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function () {
    var loginLayer = createLoginLayer();
    loginLayer.style.display = 'block';
}
document.getElementById('createFrame').onclick = function () {
    var createFrame = createSingleFrame();
    createFrame.src = 'www.baidu.com';
}

//给列表中的元素绑定事件,使用惰性单例模式,完成一次绑定
var bindEvent = getSingle(function () {
    document.getElementsByClassName('div1').onclick = function () {
        alert('dff');
    }
    return true;
});

var render = function () {
    console.log('开始为列表中的元素添加绑定');
    bindEvent();
}
render();
render();
render();  //可以看到函数执行多次,但是事件绑定实际上只执行了一次.


