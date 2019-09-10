/*** 策略对象 ***/
var strategies = {
    isNonEmpty: function (value, errorMsg) {
        if(value === '') {
            return errorMsg;
        }
    },
    minLength: function (value, length, errorMsg) {
        if(value.length < length) {
            return errorMsg;
        }
    },
    isMobile: function (value, errorMsg) {
        if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    }
}

/*** 请求策略的逻辑 ***/
var Validator = function () {
    this.cache = [];
};

/****add方法,处理请求规则,调用请求策略 ** */
Validator.prototype.add = function(dom, rules) {
    var selef= this;
    for(var i=0, rule; rule = riles[i++];) {
        (function (rule){
            //使用闭包,将rule保存起来
            var strategyAry = rule.strategyAry.split(':');
            var strategy = strategyAry.shift();
            self.cache.push(function() {
                strategyAry.unshift(dom.value);
                strategyAry.push(rule.errorMsg);
                return strategies[strategy].apply(dom, strategyAry);  //将需要的参数组装在数组里,然后调用apply函数传入
            });
        })(rule)
    }

};

Validator.prototype.start = function () {
    for(var i = 0,validatorFun; validatorFun = this.cache[i++]; ) {
        var errorMsg = validatorFun();
        if(errorMsg) {
            return errorMsg;
        }
    }
}

