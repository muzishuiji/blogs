/**
 * jsonp的工作原理
 * 1. 客户端定义一个回调函数：这个回调函数会在服务器返回数据时被调用；
 * 2. 创建一个script标签：将请求的url设置为包含回调函数的签名；
 * 3. 服务端返回数据：服务端返回的数据被包裹在回调函数中；
 * 4. 执行回调函数：浏览器加载并执行script标签，回调函数被调用，服务端已将数据作为参数传递给回调函数；
 * 
 * JSONP的优缺点：
 * 优点：
 * - 跨域请求：JSONP可以实现跨域请求，因为它利用了script标签的跨域特性；
 * - 兼容性好：JSONP兼容性非常好，几乎所有浏览器都支持；
 * 
 * 缺点：
 * - 安全性问题：JSONP存在安全风险，因为它依赖于script标签，可能会受到xss攻击的威胁；
 * - 只支持GET请求：JSONP只能用于GET请求，无法用于post请求；
 * - 错误处理困难：JSONP的错误处理比较困难，因为script标签的执行错误不会触发onerror；
 * 
 */

// 一个简单的json实现示例
/**
 * 客户端代码
 */
// 定义回调函数
function jsonpCallback(data) {
    document.getElementById('result').innerText = JSON.stringify(data);
}
// 创建script标签
function createJsonpResult(url) {
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}
// 发起jsonp请求
createJsonpResult('https://xxx.com?callback?=jsonpCallback');


// 服务端代码
const http = require('http');

const server = http.creatServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const callback = url.searchParams.get('callback');
    if(url.pathname === '/api/data') {
        const data = {
            message: 'Hello from the server!',
            timestamp: new Date().toISOString()
        };
        res.setHeader('Content-Type', 'application/javascript');
        res.end(`${callback}(${JSON.stringify(data)})`);

        // 服务端的逻辑其实就是将返回的data，包裹进callback后返回
        // 可简单理解为返回一个函数调用
        // res.end(`${callback}(${JSON.stringify(data)})`)
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
})
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});



// Last-Modified/If-Modified-Since
// Etag/If-None-Match


// 客户端代码封装一个jsonp
(function (window, document) {
    let jsonp = (url, data, callback) => {
        // 1. 将传入的data数据转换为url字符串的形式
        let dataString = url.includes('?') ? '?' : '&';
        for(var key in data) {
            dataString += `${key}=${data[key]}&`; 
        }
        // 2. 处理url中的回调函数
        // cbFuncName回调函数的名字，生成一个唯一名称
        const cbFuncName = `my_json_cb_` + Math.random().toString().replace('.', '');
        dataString += `callback=${cbFuncName}`;
        // 3. 创建一个script标签并插入到页面中
        let scriptEle = document.createElement('script');
        scriptEle.src = url + dataString;
        // 4. 挂载回调函数
        window[cbFuncName] = (data) => {
            callback(data);
            // 处理完回调函数的数据之后，删除jsonp的script标签
            document.body.removeChild(scriptEle);
            delete window[cbFuncName];
        }
        document.body.appendChild(scriptEle);
    }
    window.$jsonp = jsonp;
})(window, document)