// 0.加载express

const express = require('express');

// 加载所有
const index = require('./controllers/index');
const topic = require('./controllers/topic');
const user = require('./controllers/user');

// 1.调用 express.Router() 创建一个路由实例

const router = express.Router();

// 2.配置路由规则
// router.get('/',(req,res)=>{
//     res.send('inde page')
// })

// 首页路由
router
    .get('/', index.showIndex)

// 用户路由
router
    .get('/signin', user.showSignin)
    .post('/signin', user.signin)
    .get('/signup', user.showSignup)
    .post('/signup', user.signup)
    .get('/signout', user.signout)

// 话题相关
router
    .get('/topic/create',topic.showCreate)
    .post('/topic/create',topic.create)
    .get('/topic/:topicID',topic.show)
    .get('/topic/:topicID/edit',topic.showEdit)
    .post('/topic/:topicID/edit',topic.edit)
    .post('/topic/:topicID/delete',topic.delete)



// 3.导出路由规则
module.exports = router;

// 4.在app.js中用app.use