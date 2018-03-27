
exports.showIndex = (req, res) => {
    // console.log(req.session.user); 
    res.render('index.html',{
        user:req.session.user //把会话用户信息传递到模板中，模板就可以适用当前信息
    })
}              

