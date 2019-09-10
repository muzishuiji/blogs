//定义一系列执行命令
var closeDoorCommand = {
    add: function () {
        throw new Error('叶对象不能添加子节点');
    },
    execute: function() {
        console.log('关门');
    }
};

var openPcCommand = {
    add: function () {
        throw new Error('叶对象不能添加子节点');
    },
    execute: function () {
        console.log('开电脑');
    }
};

var openQQCommand = {
    add: function () {
        throw new Error('叶对象不能添加子节点');
    },
    execute: function () {
        console.log('登录 qq');
    }
};

var openTvCommand = {
    add: function () {
        throw new Error('叶对象不能添加子节点');
    },
    execute: function () {
        console.log('打开电视');
    }
};

var openSoundCommand = {
    add: function () {
        throw new Error('叶对象不能添加子节点');
    },
    execute: function () {
        console.log('打开音响');
    }
};

var MacroCommand = function () {
    return {
        commandList: [],
        //增加新的命令
        add: function (command) {
            this.commandList.push(command);
        },
        //遍历命令数组 执行命令
        execute: function () {
            for(var i = 0, command; command = this.commandList[i++];) {
                command.execute()
            }
        }
    }
};
//从形式上看,macroCommand就像一个代理一样,不同的是这个代理只负责传递请求,而不负责控制对命令对象的访问.
var macroCommand1 = new MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);

var macroCommand = new MacroCommand();

macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);
macroCommand.add(macroCommand1);   //宏命令里面添加宏命令
macroCommand.execute();

//这时候的macroCommand相当于宏命令,它包含了closeDoorCommand,openPcCommand,openQQCommand 一组子命令,

//组合模式实现遍历扫描文件夹
//创建文件夹对象
var Folder = function (name) {
    this.name = name;
    this.parent = null;     //增加this.parent属性
    this.files = [];
}
//添加文件
Folder.prototype.add = function (file) {
    file.parent = this;    //设置父对象 
}
//扫描文件
Folder.prototype.scan = function () {
    console.log('开始扫描文件 ' + this.name);
    for(var i = 0, file; file = this.files[i++];) {
        file.scan();
    }
}
//删除文件
Folder.prototype.remove = function (file) {
    if(!this.parent) {
        return;
    }
    for(var files = this.parent, l = files.lenth - 1; l >= 0; l--) {
        var file = files[i];
        if(file === this) {
            //如果文件数组中的某个文件和当前要删除的文件相等
            files.splice(l, 1);
        }
    }
}

//创建文件对象
var File = function (name) {
    this.name = name;
    this.parent = null;
}
File.prototype.add = function () {
    throw new Error('不能添加在文件下面');
}

File.scan = function() {
    console.log('开始扫描文件: ' + this.anrm)
}
File.prototype.remove = function () {
    if(!this.parent) {
        return;
    }
    for(var files = this.parent.files, l = files.length - 1; l--) {
        var file = files[i];
        if(file === this) {
            files.splice(l, 1);
        }
    }
}

var folder = new Folder('学习资料');
var folder1 = new Folder('JavaScript');
var file1 = new Folder('深入浅出Node.js');

folder1.add(new File('JavsScript设计模式与开发实践'));
folder.add(folder1);
folder.add(file1);

folder1.remove();   //移除文件夹
folder.scan();


