// 自执行函数模拟块级作用域
(function() {
    for(var i = 0; i < 5; i++) {
        console.log(i); // 0 1 2 3 4
    }
})();


function Parent(name){
    console.log('dddd')
    
    return {
        name
    }
}
const p1 = new Parent('222');
Parent.constructor === 