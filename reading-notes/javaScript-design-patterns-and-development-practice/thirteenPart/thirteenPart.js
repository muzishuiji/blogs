//运用职责链模式编写代码

//500元订单
var order500 = function (orderType, pay, stock) {
    if(orderType === 1 && pay === true) {
        console.log('500元定金预购,得到100元优惠券');
    } else {
        order200(orderType, pay, stock);
    }
}

//200元订单
var order200 = function (orderType, pay, stock) {
    if(orderType ===2 && pay === true) {
        console.log('200元定金预购,得到50元优惠券');
    } else {
        orderNormal(orderType, pay, stock);
    }
}

//普通购买订单
var orderNormal= function (orderType, pay, stock) {
    if(stock > 0) {
        console.log('普通购买, 无优惠券');
    } else{
        console.log('手机库存不足');
    }
}

//运用职责链模式获取文件上传对象
Function.prototype.after = function (fn) {
    var self = this;
    return function () {
        var ret = self.apply(this, arguments);  //获取当前这个对象的返回值
        if(ret === 'nextSuccessor') {  //没有遇到职责链的尾节点
            return fn.apply(this, arguments);
        }
        return ret;
    }
}

var getActiveUploadObj = function () {
    try {
        return new ActiveXObject("TXFTNActiveX.FTNUpload");  //IE上传控件
    } catch(e) {
        return 'nextSuccessor';
    }
};

var getFlashUploadObj = function () {
    if(supportFlash()) {
        var str = '<object type="application/x-shockwave-flash"></object>';  //flash上传
        return $(str).appendTo($('body'));
    } 
    return 'nextSuccessor';
}

var getFormUploadObj = function () {
    return $('<form><input name="file" type="file" /></form>').appendTo($('body'));
};

var getUploadObj = getActiveUploadObj.after(getFlashUploadObj).after(getFormUploadObj);
console.log(getUploadObj());
