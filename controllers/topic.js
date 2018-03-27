const moment = require('moment');
const Topic = require('../models/topic');

exports.showCreate = (req,res) => {
    res.render('topic/create.html')
}


exports.create = (req,res) => {
    // res.send('create')
    const body = req.body;
    // console.log(body);
    // console.log(req.session.user.id);
    body.userId = req.session.user.id;
    body.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');

    Topic.create(body,(err,results)=>{
        if(err){
            return res.send({
                code:500,
                message:err.message
            })
        }
        res.send({
            code:200,
            message:'成功'
        })
    })
}


exports.show = (req,res) => {
    res.send('show')
}


exports.showEdit = (req,res) => {
    res.send('showEdit')
}


exports.edit = (req,res) => {
    res.send('edit')
}


exports.delete = (req,res) => {
    res.send('delete')
}

