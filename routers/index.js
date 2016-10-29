/**
 * Created by 王 on 2016/9/17.
 */

var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');

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
                    if (req.query && req.query.name && req.query.password) {
                        collection.find({name: req.query.name}).toArray(function (err, docs) {
                            if (docs[0] && docs[0].password && (docs[0].password == req.query.password)) {
                                session.user={
                                    name: req.query.name,
                                    id:docs[0]._id
                                };
                                res.redirect('/index');
                            } else {
                                res.render('./index/login', {
                                    title: '登录页',
                                    err: '用户名或密码错误',
                                    userName: req.query.name

                                });
                            }
                        });
                    } else {
                        res.render('./index/login', {
                            title: '登录页'
                        });
                    }
                });

                //注册
                router.get('/register', function (req, res, next) {
                    //用户名和密码 时,查询数据库
                    if (req.query && req.query.name && req.query.password) {
                        collection.find({name: req.query.name}).toArray(function (err, docs) {
                            //如果没有返回值
                            if (!docs[0]) {
                                // 写入数据
                                var tmp1 = {name: req.query.name, password: req.query.password};
                                collection.insert([tmp1], {safe: true}, function (err, result) {
                                    session.user={
                                        name: req.query.name,
                                        id: result.insertedIds[0].toString()
                                    };
                                });

                                res.redirect('/index');
                            } else {
                                res.render('./index/register', {
                                    title: '注册页',
                                    err: '有相同的用户名'
                                });
                            }
                        });
                    } else {
                        res.render('./index/register', {
                            title: '注册页'
                        });
                    }
                });

                // 首页
                router.get('/', function (req, res, next) {
                    if(!session.user) {
                        res.redirect('/index/login');
                    } else {
                            res.render('index', {
                                title: '首页-聊天室',
                                //authors: docs,
                                author: session.user.name,
                                id: session.user.id.toString()
                            });
                        //});
                    }
                });
            }
        });

        //留言表
        db.createCollection('chat', {safe: true}, function (err, collection) {
            if (err) {
                console.log(err);
            } else {

                //  留言列表
                router.get('/chatList', function (req, res, next) {
                    if (req.query && req.query.userId && req.query.content) {
                        //getchuancan
                        //新增
                        var tmp1 = {chat: req.query.content,userId:req.query.userId ,name:req.query.userName,parentId:"7"};
                        collection.insert(tmp1, {safe: true}, function (err, result) {
                            console.log(result);
                        });
                    }
                        //console.log(1);
                        collection.find().toArray(function (err, docs) {
                            res.send(docs);
                            res.end();
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
