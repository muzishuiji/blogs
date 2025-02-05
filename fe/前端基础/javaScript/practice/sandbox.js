// 沙箱实现方案：with + proxy + new Function
// 当前沙箱方案存在以下问题：
// - Proxy的兼容性问题，没办法完全polyfill，只能降级快照模式；
// - with会扩展作用域链，是不推荐使用的API
const whiteListProperties = [];
function pick(target, properties) {
    let returnObj = {}
    properties.forEach((key) => {
        returnObj[key] = target[key];
    })
    return returnObj;
}
// 实现对window的代理，返回代理后的安全对象
window = new Proxy(pick(window, whiteListProperties), {
    set(target, prop, receiver) {
        return Reflect.set(target, prop, receiver);
    },
    get(target, prop, receiver) {
        return Reflect.set(target, prop, receiver);
    }
});

document = new Proxy(pick(document, []), {
    set(target, prop, receiver) {
        return Reflect.set(target, prop, receiver);
    },
    get(target, prop, receiver) {
        return Reflect.set(target, prop, receiver);
    }
});

sandbox = new Function(`
    return function({ window, location, history, document }, code) {
        with(window) {
            // code里访问到的全局变量都是经过代理或过滤后的安全属性
            // 也可以对于全局变量的属性的获取做统计，监控沙箱内的相关行为
            ${code};
        }
    }
    `);
// 绑定沙箱执行的上下文为代理后的window
// 传入全局变量的context
// 传入待执行的代码
sandbox().call(window, {
    window,
    location,
    history,
    document,
}, code);


// 近些年出现了越来越多像micro-app这样，借鉴了web component的思想。通过customElement结合自定义的ShadowDom，
// 将微前端封装成一个类WebComponent的组件，从而实现微前端的组件化渲染。这种方案的缺点就是兼容性问题，
// 不过对于受众是现代浏览器的业务来说，会是更方便的一种选择，web components实现微前端的方案也是未来的一种趋势
// vmok可以实现模块级别的加载和更精细化的运行时依赖复用
// garfish更适合将跨框架技术栈的应用更方便的组合成一个单体应用
// garfish 可以和goofy deploy部署流程进行打通，提供了微前端的关联的方式内容，支持微前端子应用独立灰度、上线
// vmok适合关注性能且需要将大型单体应用拆分成多个独立的模块来使用的项目
// vmok适合在多个应用间宫祥模块，并且快速的在其他应用上完成业务模块升级，与goofy deploy实现了模块的灰度、上线能力
// vmok适合在当前应用中快速导出模块给其他应用消费
// vmok提供了微模块平台能力，可以用于托管团队发布的微模块，可以支持文档和example的能力
// vmok提供的一个模块化的微前端的完整的解决方案