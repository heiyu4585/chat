/**
 * Created by 王 on 2016/9/17.
 */

var express = require('express');
var router = express.Router();

//加载数据库模块
var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('mydb', server, {safe: true});
//连接db
db.open(function (err, db) {
    if (!err) {
        //console.log('connect db');
        db.createCollection('users', {safe: true}, function (err, collection) {
            if (err) {
                console.log(err);
            } else {

                //登陆页面
                router.get('/login', function (req, res, next) {
                    //用户名和密码 时,查询数据库
                    console.log(1);
                    if (req.query.name && req.query.pass) {
                        console.log(2);
                        collection.find({name: req.query.name}).toArray(function (err, docs) {
                            console.log(3);
                            if (docs[0] && docs[0].password && (docs[0].password == req.query.pass)) {

                                console.log(5);
                                res.redirect('/');
                            }
                        });
                    } else {
                        console.log(4);
                        res.render('./index/login', {
                            title: '登录页'
                        });
                    }
                });


            }
        });
    } else {
        console.log(err);
    }
});
// 用户列表

router.get('/', function (req, res, next) {
    collection.find().toArray(function (err, docs) {
        //res.send('首页');
        res.render('index', {
            title: '首页-聊天室',
            authors: docs,
            author: req.query.name
        });
    });
});


//var User = require('../models/user');
//exports.index = function(req, res){
//    User.find({}, function (err,users) {
//        res.render('index', { title: 'Express',users:users });
//    });
//};

module.exports = router;
