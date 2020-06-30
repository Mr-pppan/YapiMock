const path = require("path"); //引入path模块 
const fs = require('fs'); // 引入fs模块 

const config = {
    prop: 8888,
    rootDiretory: path.join(__dirname, '../'),
    path: path.join(__dirname, '../') + 'mock/flight/'//目录路径 
}
fs.readFile(config.rootDiretory + 'test/api.json', 'utf-8', function (err, data) {
    if (err) {
        throw err;
    } else {
        let res = JSON.parse(data)
        let configPath = config.rootDiretory + 'mock/config.json'
        let apiArr = {}
        for (let i in res) {
            let list = res[i].list
            mkdirs(config.path + res[i].name, { recursive: true }, function () {
                console.log('一级目录创建成功')
                for (let j in list) {
                    writeFile(config.path + res[i].name + '/' + list[j].title + '.json',
                        list[j].res_body, function (err) {
                            if (err) throw err
                        })
                    let url = list[j].path
                    let path = config.path + res[i].name + '/' + list[j].title + '.json'
                    let title = list[j].title
                    let method = list[j].method
                    let data = { url, path, title, method }
                    apiArr[url] = data
                    writeFile(configPath, JSON.stringify(apiArr), function (err) {
                        if (err) throw err
                    })
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
function deleteall(path) {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};
function writeFile(dirname, body, callback) {
    // if (fs.existsSync(dirname)) {
    fs.writeFile(dirname, body, callback);
    // }
};