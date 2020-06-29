const path = require("path"); //引入path模块 
const fs = require('fs'); // 引入fs模块 

const config = {
    prop: 8888,
    path: 'mock/flight/'
}
fs.readFile('test/api.json', 'utf-8', function (err, data) {
    if (err) {
        throw err;
    } else {
        let res = JSON.parse(data)
        let apiArr = {}
        for (let i in res) {
            let list = res[i].list
            mkdirs(config.path + res[i].name, { recursive: true }, function () {
                // console.log('一级目录创建成功')
                for (let j in list) {
                    fs.writeFile(config.path + res[i].name + '/' + list[j].title + '.json',
                        list[j].res_body, function (err) {
                            // console.log('创建文件')
                            if (err) {
                                throw err;
                            }
                        })
                    let url = list[j].path
                    let path = config.path + res[i].name + '/' + list[j].title + '.json'
                    let title = list[j].title
                    let method = list[j].method
                    let data = { url, path, title, method }
                    apiArr[url] = data
                    fs.writeFile(__dirname + '/mock/config.json', JSON.stringify({ data: apiArr }))
                }
            })
        }
    }
})

function mkdirs(dirname, mode, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            mkdirs(path.dirname(dirname), mode, function () {
                fs.mkdir(dirname, mode, callback);
            });
        }
    });
}
