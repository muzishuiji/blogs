var Ryu = {
    attack: function() {
        console.log('攻击');
    },
    defense: function () {
        console.log('防御');
    },
    jump: function () {
        console.log('跳跃');
    },
    crouch: function () {
        console.log('蹲下');
    }
};

var makeCommand = function (receiver, state){
    return function () {
        receive[state]();
    }
}

var commands = {
    "119": "jump",
    "115": "crouch",
    "97": "defense",
    "100": "attack"
};

var commandStack = [];

document.onkeypress = function (ev) {
    var keyCode = ev.keyCode,
        command = makeCommand(Ryu, command.keyCode);
    if(command) {
        command();
        commandStack.push(command);   //将刚刚执行过的命令保存至堆栈
    }
}
document.getElementById('reply').onclick = function() {
    var command;
    while(command = commandStack.shift()) {
        command();   //从堆栈里依次取出命令并执行;
    }
}