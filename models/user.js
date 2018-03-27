// 把用户相关的数据库操作封装
const db = require('../controllers/db-helper');


exports.findAll = callback => {
    db.query('select * from `users`', (err, results) => {
        if (err) {
            return callback(err)
        }
        callback(null, results)
    })
}



exports.getByEmail = (email, callback) => {
    const sqlStr = 'select * from `users` where `email`=?'
    db.query(
        sqlStr,
        [email],
        (err, results) => {
            if (err) {
                return callback(err)
            }
            callback(null, results[0])
        }
    )
}


exports.getByNickname = (nickname, callback) => {
    const sqlStr = 'select * from `users` where `nickname`=?'
    db.query(
        sqlStr,
        [nickname],
        (err, results) => {
            if (err) {
                return callback(err)
            }
            callback(null, results[0])
        }
    )
}


exports.create = (user,callback) => {
    const sqlStr = 'insert into `users` set ?'
    db.query(
        sqlStr,
        user,
        (err,results) => {
            if(err){
                return callback(err)
            }
            callback(null,results)
        }
    )
}

