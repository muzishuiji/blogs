//为了防止没有定义buttonWasPressed这个方法而导致错误,我们需要月抽象父类,使这个异常至少会在程序运行期间就被发现.
var State = function () {};
State.prototype.buttonWasPressed = function () {
    throw new Error('父类的buttonWasPressed方法必须被重写');
};

//OffLightState;
var OffLightState = function (light) {
    this.light = light;
};
OffLightState.prototype = new State();
OffLightState.prototype.buttonWasPressed = function () {
    console.log('弱光');  //OffLightState对应的行为
    this.light.setState(this.light.weakLightState); //切换状态到weakLightState
}
//WeakLightState;
var WeakLightState = function(light) {
    this.light = light;
};
WeakLightState.prototype = new State();
WeakLightState.prototype.buttonWasPressed = function () {
    console.log('强光');  //WeakLightState对应的行为
    this.light.setState(this.light.strongLightState); //切换状态到strongLightState
}

//StrongLightState;
var StrongLightState = function(light) {
    this.light = light;
};
StrongLightState.prototype = new State();
StrongLightState.prototype.buttonWasPressed = function () {
    console.log('关灯');  //StrongLightState
    this.light.setState(this.light.offLightState); //切换状态到strongLightState
}

var Light = function () {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new strongLightState(this);
    this.button = null;
}
//初始化灯的状态
Light.prototype.init = function () {
    var button = document.createElement('button'),
        self = this;
    this.button = document.body.appendChild('button');
    this.button.innerHTML = '开关';
    this.currState = this.offLightState; //设置当前状态
    this.button.onclick = function () {
        self.currState.buttonWasPressed();
    }
}
//设置灯的状态
Light.prototype.setState = function (newState) {
    this.currState = newState;
};

var light = new Light();
light.init();

//javascript版本的状态机

//方法一: 通过Function.property.call方法直接把请求委托给某个字面量对象
var Light = function () {
    this.currState = FSM.off;   //设置当前状态
    this.button = null;
};

Light.prototype.init = function () {
    var button = document.createElement('button'),self = this;
    button.innerHTML = '已关灯';
    this.button = document.body.appendChild(button);
    this.button.onclick = function () {
        self.currState.buttonWasPressed.call(self); //把请求委托给FSM状态机
    }
}
var FSM = {
    off: {
        buttonWasPressed: function () {
            console.log('关灯');
            this.buttonWasPressed.innerHTML = '下一次按我是开灯';
            this.currState = FSM.on;
        }
    },
    on: {
        buttonWasPressed: function () {
            console.log('开灯');
            this.buttonWasPressed.innerHTML = '下一次按我是关灯';
            this.currState = FSM.off;
        }
    }
}
var light = new Light();
light.init();

//使用delegate函数来改写,这个函数主要控制状态切换函数执行时的this
//让状态自己切换,我们只负责控制逻辑
var delegate = function (client, delegation) {
    return {
        buttonWasPressed: function() {
            return delegation.buttonWasPressed(client, arguments);
        }
    }
}
var FSM = {
    off: {
        buttonWasPressed: function () {
            console.log('关灯');
            this.buttonWasPressed.innerHTML = '下一次按我是开灯';
            this.currState = FSM.on;
        }
    },
    on: {
        buttonWasPressed: function () {
            console.log('开灯');
            this.buttonWasPressed.innerHTML = '下一次按我是关灯';
            this.currState = FSM.off;
        }
    }
}
var Light = function () {
    this.offState = delegate(this, FSM.off);
    this.onState = delegate(this, FSM.on);
    this.currState = this.offState;
    this.button = null;
};

Light.prototype.init = function () {
    var button = document.createElement('button'),self = this;
    button.innerHTML = '已关灯';
    this.button = document.body.appendChild(button);
    this.button.onclick = function () {
        self.currState.buttonWasPressed();
    }
};

var light = new Light();
light.init();