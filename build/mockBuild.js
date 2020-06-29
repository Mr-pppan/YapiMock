const path = require("path"); //引入path模块 
const fs = require('fs'); // 引入fs模块 

const config = {
    prop: 8888,
    path: 'mock/config.json'
}

// let files = require.context('mock/flight', true, /.json$/);
console.log(require.context('.', true, /.js$/))