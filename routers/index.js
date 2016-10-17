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
                        res.render('./index/login', {
                            title: '登录页'
                        });
                });

                // 登陆操作
                router.get('/loginFn', function (req, res, next) {
                    console.log(222);
                    //用户名和密码 时,查询数据库
                    if (req.query.name && req.query.password) {
                        collection.find({name: req.query.name}).toArray(function (err, docs) {
                            if (docs[0] && docs[0].password && (docs[0].password == req.query.password)) {
                                res.redirect('/index?name='+req.query.name);
                            }
                        });
                    }else{
                        console.log(333);
                        res.redirect('/index/login');
                    }
                });

                //    // 用户列表
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
            }
        });
    } else {
        console.log(err);
    }
});


//var User = require('../models/user');
//exports.index = function(req, res){
//    User.find({}, function (err,users) {
//        res.render('index', { title: 'Express',users:users });
//    });
//};

module.exports = router;
