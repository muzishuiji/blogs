// 客户端发起跨域请求
/**
 * XMLHttpRequest.withCredentials 属性是一个Boolean类型，它指示了是否使用类似cookie。quthorization headers
 * 或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制请求。在同一站点下使用withCredentials属性是无效的
 */
crossButton.onclick = function() {
    axios({
        withCredentials: true,
        method: 'get',
        url: '',
    }).then((res) => {
        console.log(res);
    })
}

// 服务端的允许跨域设置
app.all('*', (req,res,next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
    // 用于指示浏览器是否可以将凭证（如cookies、HTTP认证或客户端SSL证书）包含在跨域请求中。
    // 当设置true时，浏览器会在跨域请求中包含凭证信息
    // 同时，需要记住Access-Control-Allow-Origin必须设置为具体的域名，而不能是*，因为*不允许包含凭证信息
    // 是否允许发送cookie
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
})
