console.log('Hello');

// 使用内置模块
const os = require('os');
console.log(os.hostname());

// 安装第三方模块 (例子: 加载request包)
//npm install request --save
//--- or
//yarn add request

// 使用第三方模块
const request = require('request');

request({
    url: 'https://api.douban.com/v2/movie/top250',
    json: true
}, (error, response, body) => {
    //console.log(JSON.stringify(body, null, 2));
})

// 创建自己的模块 - (例子在greeting.js文件中)
/**
 * const hello = () => {
    console.log('Hello World');
   }

   module.exports.hello = hello;
 */

// 使用自己的模块
const greeting = require('./greeting');
greeting.hello();

// 使用nodemon 监视应用的变化
// 安装nodemon  yarn add nodemon --dev -g -(在开发环境下安装nodemon) or npm install -g nodemon
// 运行nodemon  - nodemon index.js