//策略模式

//传统的面向对象语言的策略模式的实现
//定义一系列的算法
var performanceS = function () {};
performanceS.prototype.calculate = function (salary) {
    return salary * 4;
};
var performanceA = function () {};
performanceA.prototype.calculate = function (salary) {
    return salary * 3;
};
var performanceB = function () {};
performanceB.prototype.calculate = function (salary) {
    return salary * 2;
};
//奖金类
var Bonus = function () {
    this.salary = null;      //原始工资
    this.strategy = null;    //绩效等级对应的策略对象
};
//获取原始工资
Bonus.prototype.setSalary = function (salary) {
    this.salary = salary
}
//获取策略对象
Bonus.prototype.setStrategy = function (strategy) {
    this.strategy = strategy;
}
//计算奖金数额
Bonus.prototype.getBouns = function () {
    return this.strategy.calculate(this.strategy);
}

//客户端发起请求
var bonus = new Bonus();

bonus.setSalary(1000);
bonus.setStrategy(new performanceS());
bonus.getBouns();    //40000
bonus.setStrategy(new performanceA());
bonus.getBouns();    //30000

//javascript的策略模式

var strategy = {
    'S': function (salary) {
        return salary * 4 ;
    },
    'A': function (salary) {
        return salary * 3
    },
    'B': function (salary) {
        return setSalary * 2;
    }
};
//策略模式就是把一组方法都封装在一个对象中,然后根据需要调用不同的方法.
//这使得我们增加新的策略和使用策略都变得非常方便.
var calculateBonus = function(level, salary) {
    return strategy[level](salary);
}
console.log(calculateBonus('S',20000));  //80000
console.log(calculateBonus('A',20000));  //60000