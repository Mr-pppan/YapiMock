const handler = async (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");  // 规定允许访问该资源的外域 URI
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");  // 请求方式
    ctx.set("Access-Control-Max-Age", "3600");  // 设定预检请求结果的缓存时间
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");  //  规定 CORS 请求时会额外发送的头信息字段
    ctx.set("Access-Control-Allow-Credentials", "true");  // 请求可以带 Cookie 等
    ctx.set('Content-Type', 'application/json;charset=utf-8'); // Content-Type表示具体请求中的媒体类型信息

    // 针对预检请求
    if (ctx.request.method == "OPTIONS") {
        ctx.response.stutas = "200"
    }
    try {
        await next();
        // console.log("处理通过");
    } catch (e) {
        console.log("处理错误");
        ctx.response.status = e.statusCode || err.status || 500
        ctx.response.body = {
            message: e.message
        }
    }
}
module.exports = handler