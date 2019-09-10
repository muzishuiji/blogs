//编码实现 发布-订阅模式 优化: 将发布订阅功能封装为一个对象,然后动态的为需要的对象添加发布-订阅功能
var event = {
    clientList: [],   //缓存列表,寻访订阅者的回调函数
    listen: function (key, fn) {  //监听订阅者的订阅,并将订阅者加入缓存队列
        if(!salesOffice.clientList[key]){
            salesOffice.clientList[key] = [];
        }
        salesOffice.clientList[key].push(fn);
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments);  //取第一个参数,也就是订阅者的标识key
        var fns = this.clientList[key];
        if(!fns && fns.length === 0) {
            return false;
        }
        for(var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);         //使得fn运行时候的this指向salesOffice
        }
    },
    remove: function (key, fn) {
        var fns = this.clientList[key];
        if(!fn) {
            return false; //key对应的消息没有人订阅
        }
        if(!fn) {  //如果没有传入回调函数,则取消key对应的所有订阅.
            fns && (fns.length = 0);
        } else {
            for(var l = fnx.length - 1; l >= 0; l--) {
                var _fn = fns[l];
                if(_fn === fn) {
                    fns.slice(l, 1);  //删除想要remove的回调函数 第一个参数是删除位置 1为删除,0为不删除
                }
            }
        }
    }
}

//动态为其他对象添加发布订阅功能
var installEvent = function (obj) {
    for(var i in event) {
        obj[i] = event[i];
    }
}

var salesOffice= {};
installEvent(salesOffice);

salesOffice.listen('key01', function(price) {   //添加订阅者
    console.log('您想要查询楼房的价位是:  ' + price);
});

salesOffice.listen('key02', function(price) {   //添加订阅者
    console.log('您想要查询楼房的价位是:  ' + price);
});

salesOffice.trigger('key01', 20000);
salesOffice.trigger('key02', 80000);
