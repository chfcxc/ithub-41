const connection = require('./db-helper');

const moment = require('moment');

const User = require('../models/user')

const md5 = require('md5')

exports.showSignin = (req, res) => {
    res.render('signin.html')
}

exports.signin = (req, res) => {
    // res.send('signin')
    // 1.获取表单
    const body = req.body;
    // 2.数据验证

    //2.1 普通验证

    //2.2 业务验证
    User.getByEmail(body.email,(err,user)=>{
        if(err){
            return res.send({
                code:500,
                message:err.message
            })
        }
        // 如果用户不存在，告诉客户端
        if(!user){
            return res.send({
                code:1,
                message:"用户不存在"
            })
        }

        // 如果用户存在继续校验密码
        if(md5(body.password) !== user.password){
            return res.send({
                code:2,
                message:'密码不正确'
            })
        }

        // console.log(req.session);
        req.session.user = user;

        // 3.验证通过，保持登陆状态
        res.send({
            code:200,
            message:'登陆成功'
        })

    })
    
    // 4.发送响应成功
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
    User.getByEmail(body.email, (err, user) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            })
        }
        if (user) {
            return res.send({
                code: 1,
                message: "邮箱被占用"
            })
        }

        // 检测昵称
        User.getByNickname(
            body.nickname,
            (err, user) => {
                if (err) {
                    return res.send({
                        code: 500,
                        message: err.message
                    })
                }
                if (user) {
                    return res.send({
                        code: 2,
                        message: "昵称被占用"
                    })
                }
                // 邮箱和昵称都校验没有问题了，可以注册了
                // 3. 当数据验证都通过之后，在数据库写入一条新的用户数据
                // body.createdAt = '2018-02-13 12:00:00';
                body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
               
               body.password = md5(body.password)
                // console.log(body)
                User.create(body, (err, results) => {
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
    // 清除登录状态
    delete req.session.user;

    // 跳转到登录页
    res.redirect('/signin');
}