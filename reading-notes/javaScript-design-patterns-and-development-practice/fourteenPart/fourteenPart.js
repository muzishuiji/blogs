//中介者模式改造泡泡堂游戏

//第一步: 创建一个玩家对象,并定义相关状态 角色名字 队伍颜色 生存状态
var Player = function (name, teamColor) {
    this.name = name;
    this.teamColor = teamColor;
    this.state = 'alive';
}
// 成功和失败的原型方法
Player.prototype.win = function () {
    console.log(this.name + ' won!');
}
Player.prototype.lose = function () {
    console.log(this.name + ' lose!');
}
//玩家死亡和移除玩家
Player.prototype.die = function () {
    this.state = 'dead';
    playerDirector.ReceiveMessage('playerDead', this);  //给中介者发送消息,玩家死亡
}
Player.prototype.remove = function () {
    playerDirector.ReceiveMessage('removePlayer', this); //给中介者发消息,移除该玩家
}

//玩家换队
Player.prototype.changeTeam = function(color) {
    playerDirector.ReceiveMessage('changeTeam', this, color);  //给中介者发消息,玩家切换战队
}
//创建玩家的工厂函数
var playerFactory = function (name, teamColor) {
    var newPlayer = new Player(name, teamColor);
    playerDirector.ReceiveMessage('addPlayer', newPlayer);  //通知中介者,添加新的玩家
    return newPlayer;
}

//在中介者playerDirector中开放一些接收消息的接口
//该中介者内部定义一些方法,  新增玩家, 移除玩家, 玩家换队
var playerDirector = (function () {
    var players = {},  //保存所有玩家
    operations = {};   //中介者可以执行的操作
    //新增一个玩家
    operations.addPlayer = function(player) {
        //以颜色作为玩家战队的标识
        var teamColor = player.teamColor; 
        players[teamColor] = players[teamColor] || [];  //定义一个战队
        players[teamColor].push(player);                //往战队里添加成员
    };

    //移除一个玩家
    operations.removePlayer = function (player) {
        var teamColor = player.teamColor,
            teamPlayers = players[teamColor] || [];
        for(var i=0,l; l = teamPlayers[i++];) {
            if(l.name === player.name) {
                players[teamColor].splice(i-1, 1);
            }
        }
    };

    //玩家换队
    operations.changeTeam = function (player, newTeamColor) {
        //先把原战队的玩家移除,然后添加到新的队列中
        operations.removePlayer(player);
        player.teamColor = newTeamColor;
        operations.addPlayer(player);
    };

    //玩家死亡
    operations.playerDead = function (player) {
        
        var teamColor = player.teamColor,
            teamPlyers = players[teamColor];
        var all_dead = true;
        for(var i = 0, player; player = teamPlyers[i++];) {
            if(player.state !== 'dead') {
                all_dead = false;
                break;
            }
        }
        if(all_dead) {
            for(var i = 0, player; player = teamPlyers[i++]; ) {
                player.lose();  //本对所有玩家lose
            }
            for(var color in players) { 
                if(color !== teamColor) {
                    var otherPlayers = players[color];
                    for(var i = 0, player; player = otherPlayers[i++]; ) {
                        player.win();  //其他队伍玩家获胜
                    }
                }
            }
        }
    };
    var ReceiveMessage = function () {
        var message = Array.prototype.shift.call(arguments);  //取参数的第一个参数为消息名称,将arguments的数组的第一个元素删除
        operations[message].apply(this, arguments);
    }
    return {
        ReceiveMessage: ReceiveMessage
    }
})();

var player1 = playerFactory('皮蛋', 'red'),
    player2 = playerFactory('小乖', 'red'),
    player3 = playerFactory('宝宝', 'red'),
    player4 = playerFactory('小强', 'red');

var player5 = playerFactory('黑妞', 'blue'),
    player6 = playerFactory('重头', 'blue'),
    player7 = playerFactory('胖墩', 'blue'),
    player8 = playerFactory('海盗', 'blue');

// player1.die();
// player2.die();
// player3.die();
// player4.die();

// player1.remove();
// player2.remove();
// player3.die();
// player4.die();

player1.changeTeam('blue');
player2.die();
player3.die();
player4.die();