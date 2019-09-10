//享元模式
//定义对象的内部状态
var Upload = function (uploadType) {
    this.uploadType = uploadType;
};

//定义删除文件的函数
Upload.prototype.delFile = function (id) {
    uploadManager.setExternalState(id, this); //调用状态管理器的方法读取文件的实际大小
    if(this.fileSize < 3000) {
        return this.dom.parentNode.removeChild(this.dom);
    }
    if(window.confirm('你确定要删除该文件吗? ' + this.fileName)) {
        return this.dom.parentNode.removeChild(this.dom);
    }
};

//定义一个工厂来创建upload对象,如果某种内部状态对应的共享对象已经被创建过,name直接返回这个对象,否则创建一个新的对象.
var UploadFactory = (function () {
    var createFlyWeightObjs = {};
    
    return {
        create: function (uploadType) {
            if(createFlyWeightObjs[uploadType]) {
                return createFlyWeightObjs[uploadType];
            }
            return createFlyWeightObjs[uploadType] = new Upload(uploadType);
        }
    }
})();

//没有内部状态的upload函数和工厂函数
var Upload = function (uploadType) {
    
};
var UploadFactory = (function(){
    var uploadObj;
    return {
        create: function () {
            if(uploadObj) {
                return uploadObj;
            }
            return uploadObj = new Upload();
        }
    }
})();

//然后创建对象的外部状态管理器uploadManager对象,他负责向UploadFactory提交创建对象的请求,
//并用一个uploadDatabase对象保存所有upload对象的外部状态,以便在程序运行过膝恒给upload共享对象设置外部状态
var uploadManager = (function () {
    var uploadDatabase = {};

    return {
        //向工厂函数请求创建upload对象的函数
        add: function (id, uploadType, fileName, fileSize) {
            var flyWeightObj = UploadFactory.create(uploadType);
            var dom = document.createElement('div');
            dom.innerHTML = '<span>文件名称: '+ fileName +',文件大小: '+ fileSize +'</span>'+
                            '<button class="delFile">删除</button>';
            dom.querySelector('.delFile').onclick = function () {
                flyWeightObj.delFile(id);  //删除对应id的文件
            }
            document.body.appendChild(dom);

            //存储upload对象的外部状态
            uploadDatabase[id] = {
                fileName: fileName,
                fileSize: fileSize,
                dom: dom
            };
            return flyWeightObj;
        },
        setExternalState: function (id, flyWeightObj) {
            //取出对应id的upload对象(获取外部状态)赋值给flyWeightObj对象,也就是函数传入的第二个参数
            var uploadData = uploadDatabase[id];  
            for(var i in uploadData) {
                flyWeightObj[i] = uploadData[i];
            }
        }
    }
})();

//触发上传动作的startUpload函数
var id = 0;
window.startUpload = function (uploadType, files) {
    for(var i = 0, file; file = files[i++];) {
        var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
    }
};

startUpload('plugin', [
    {
       fileName: '1.txt',
       fileSize: 1000 
    }, {
        fileName: '2.html',
        fileSize: 3000 
    },
    {
        fileName: '3.txt',
        fileSize: 5000 
    },
]);


startUpload('flash', [
    {
       fileName: '1.txt',
       fileSize: 1000 
    }, {
        fileName: '2.html',
        fileSize: 3000 
    },
    {
        fileName: '3.txt',
        fileSize: 5000 
    },
]);

