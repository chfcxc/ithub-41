
var mysql = require('mysql');

// 创建数据库链接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'ithub'
});

const moment = require('moment');



exports.showSignin = (req, res) => {
    res.render('signin.html')
}

exports.signin = (req, res) => {
    res.send('signin')
}

exports.showSignup = (req, res) => {
    res.render('signup.html')
}

exports.signup = (req, res) => {
    // 1. 接收获取客户端提交的表单数据
    //    配置 body-parser 插件用来解析获取表单 POST 请求体数据
    const body = req.body;
    console.log(body)

    // 2. 数据验证
    //    普通数据校验，例如数据有没有，格式是否正确
    //    业务数据校验，例如校验用户名是否被占用
    //    这里校验邮箱和昵称是否被占用
    connection.query('select * from `users` where `email`=?', [body.email], (err, results) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            })
        }
        if (results[0]) {
            return res.send({
                code: 1,
                message: "邮箱被占用"
            })
        }

        // 检测昵称
        connection.query('select * from `users` where `nickname`=?', [body.nickname], (err, results) => {
            if (err) {
                return res.send({
                    code: 500,
                    message: err.message
                })
            }
            if (results[0]) {
                return res.send({
                    code: 2,
                    message: "昵称被占用"
                })
            }
            // 邮箱和昵称都校验没有问题了，可以注册了
            // 3. 当数据验证都通过之后，在数据库写入一条新的用户数据
            // body.createdAt = '2018-02-13 12:00:00';
            body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
            console.log(body)
            const sql = 'insert into `users` set ?'
            connection.query(sql, body, (err, results) => {
                if (err) {
                    // console.log('失败了')
                    return res.send({
                        code: 500,
                        message: err.message
                    })
                }
                // console.log('成功');
                res.send({
                    code: 200,
                    message: 'ok'
                })
            })

        })
    })





    // 4. 注册成功，发送成功响应
    // res.send('signup')
}

exports.signout = (req, res) => {
    res.send('signout')
}