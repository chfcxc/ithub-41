// 话题相关的数据库
const db = require('../controllers/db-helper');

exports.findAll = callback => {
    const sqlStr = 'select * from `topics`';
    db.query(sqlStr, (err, results) => {
        if (err) {
            return callback(err)
        }
        callback(null, results);
    })
}

exports.create = (topic, callback) => {
    const sqlStr = 'insert into `topics` set ?';
    db.query(
        sqlStr,
        topic,
        (err, results) => {
            if (err) {
                return callback(err)
            }
            callback(null, results);
        }
    )
}


exports.updateById = (topic, callback) => {
    const sqlStr = 'update `topics` set `title`=?, `content`=? where `id`=?';
    db.query(
        sqlStr,
        [
            topic.title,
            topic.content,
            topic.id
        ],
        (err, results) => {
            if (err) {
                return callback(err)
            }
            callback(null, results);
        }
    )
}

exports.deleteById = (id, callback) => {
    const sqlStr = 'delete from `topics` where `id`=?';
    db.query(
        sqlStr,
        [
            id
        ],
        (err, results) => {
            if (err) {
                return callback(err)
            }
            callback(null, results);
        }
    )
}
