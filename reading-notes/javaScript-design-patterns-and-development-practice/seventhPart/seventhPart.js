//实现自己的迭代器 接收两个参数, 第一个为循环的数组,第二个为循环中的每一步后将被处罚的回调函数
var each = function (ary, callback) {
    for(var i = 0; i < ary.length; i++) {
        if(callback.call(ary[i], i, ary[i]) === false) {
            break;
        }
    }
}
each([1,2,3], function (i, n) {
    if(i > 2) {
        return false;
    }
    alert([i, n]);
});