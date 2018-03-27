var mysql = require('mysql');

// 创建数据库链接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'ithub'
});


module.exports = connection;