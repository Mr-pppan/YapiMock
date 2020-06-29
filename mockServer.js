// const express = require('express'); //引入express模块
const Mock = require('mockjs'); //引入mock模块
// const app = express(); //实例化express
const path = require("path"); //引入path模块 
const fs = require('fs'); // 引入fs模块 
const Koa = require('koa')
const router = require('koa-router')();
const handler = require('./build/koaConfig')
const cors = require('koa2-cors')

const app = new Koa()

const config = {
    prop: 3000,
}

fs.readFile(__dirname + '/mock/config.json', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        let dataObject = JSON.parse(data).data;
        for (let key in dataObject) {
            // app.all(dataObject[key].url, function (req, res) {
            //     fs.readFile(dataObject[key].path, 'utf-8', function (err, data) {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             let _d = JSON.parse(data).properties ? JSON.parse(data).properties : JSON.parse(data)
            //             _d.code = '000000'
            //             _d.msg = 'success'
            //             res.json(Mock.mock(_d))
            //         }
            //     })
            // });
            let method = dataObject[key].method
            let path = dataObject[key].path
            let url = dataObject[key].url
            fs.readFile(path, 'utf-8', function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    request(method, url, (ctx, next) => {
                        let _d = JSON.parse(data).properties ? JSON.parse(data).properties : JSON.parse(data)
                        _d.code = '000000'
                        _d.msg = 'success'
                        ctx.response.body = Mock.mock(_d);
                    })

                }
            })
        }

    }
});
function request(method, url, callBack) {
    if (method == 'POST') {
        router.post(url, callBack);
    } else if (method == 'GET') {
        router.get(url, callBack);
    }
    app.use(router.routes()); //作用：启动路由
    app.use(router.allowedMethods());
    /* 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配
    router.routes()之后,目的在于：根据ctx.status 设置response 响应头
    */
}
// router.get('/', async (ctx, next) => {
//     ctx.body = '<h1>hellow word</h1>'

// })
// router.get('/simulate/change', async (ctx, next) => {
//     ctx.body = { data: router }
// })

app.use(cors())
// app.use(handler)
app.listen(config.prop, function (req, res) {
    // if (req.url == '/favicon.ico') {
    //     return;
    // }
    console.log('run server: http://localhost:' + config.prop)

});

