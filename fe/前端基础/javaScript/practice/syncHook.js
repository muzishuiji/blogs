

const HooksType = {
    SYNC: 'sync'
}

class SyncHook {
    constructor(args) {
        this.args = Array.isArray(args) ? args : []; // 形参列表
        this.listeners = [];
    }
    tap(option, fn) {
        if(typeof option === 'string') {
            option = {
                name: option,
            }
        }
        let tapInfo = {
            ...option,
            fn,
            type: HooksType.SYNC, 
        }   
        this.listeners.push(tapInfo);
    }

    compiler({
        args,
        listeners,
        type
    }) {
        // var listeners=this.listeners;\n var fn = this.listeners[i];fn(...args);
        const getHeader = () => {
            let code = "";
            code += "var listeners = this.listeners;\n";
            return code;
        }

        const getContent = () => {
            let code = '';
            for(let i = 0; i < listeners.length; i++) {
                code += `var fn${i}=listeners[${i}].fn;\n`;
                code += `fn${i}(${args.join(',')});\n`;
            }
            return code;
        }
        return new Function(args.join(','), getHeader() + getContent());
    }

    call(...args) {
        this._call = this.compiler({
            args: this.args,
            listeners: this.args,
            type: HooksType.SYNC, 
        });
        this._call(args);
    }
}

const syncHook = new SyncHook(["author", "age"]);

//第二步：注册事件1
syncHook.tap("监听器1", (name, age) => {
    console.log("监听器1:", name, age);
});

//第二步：注册事件2
syncHook.tap("监听器2", (name, age) => {
    console.log("监听器2:", name, age);
});

syncHook.call("木子水吉", "18");

