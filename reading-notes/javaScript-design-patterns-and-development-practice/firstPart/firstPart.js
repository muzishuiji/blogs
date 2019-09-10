/**
 * 鸭子模型
 */
var duck = {
    duckSinging: function () {
        console.log('嘎嘎嘎');
    }
};

var chicken = {
    duckSinging: function () {
        console.log('嘎嘎嘎');
    }
}

var choir = [];   //合唱团
var joinChoir = function (animal) {
    //只要它是动物且具有歌唱的行为,那么久认为它是鸭子
    if(animal && typeof animal.duckSinging) {
        choir.push(animal);
        console.log('恭喜加入合唱团');
        console.log('合唱团已有成员数量:' + choir.length);
    }
}

joinChoir(duck);  //恭喜加入合唱团

joinChoir(chicken);  //恭喜加入合唱团


/**
 * 多态
 */
var makeSound = function (animal) {
    if(animal instanceof Duck) {
        console.log('嘎嘎嘎')
    } else if(animal instanceof Chicken) {
        console.log('咯咯咯')
    }
};

var Duck = function() {};
var Chicken = function() {};

makeSound(new Duck());      //嘎嘎嘎
makeSound(new Chicken());   //咯咯咯

//以上的写法会导致每一次增加新的动物都要去修改发出声音的函数,我们需要把不变的事物与可能改变的事物分离开来

//修改后的代码如下:

var makeSound = function (animal) {
    //不同的对象响应行为
    animal.sound();
}
var Duck = function() {}
Duck.prototype.sound = function () {
    console.log('嘎嘎嘎');
}

var Chicken = function () {}
Chicken.prototype.sound = function () {
    console.log('咯咯咯');
}

var Dog = function () {}
Dog.prototype.sound = function () {
    console.log('汪汪汪');
}

//发送给不同的对象消息
makeSound(new Duck())
makeSound(new Chicken())
makeSound(new Dog())