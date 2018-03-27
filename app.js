const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123',
    database: 'ithub'
};
 
const sessionStore = new MySQLStore(options);

const app = express();

app.use('/public',express.static('./public/'));
app.use('/node_modules',express.static('./node_modules/'))

// 
app.engine('html',require('express-art-template'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use(session({
    key: 'session_cookie_name',
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store: sessionStore,
}))

app.use(router);

app.listen(3000,()=>console.log("runing 3000..."));