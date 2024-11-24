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
    res.header('Access-Control-Allow-Origin', 'true');
    next();
})
