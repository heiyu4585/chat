/**
 * 应用程序的启动文件
 */

//加载express模块
var express = require('express');
//创建app应用 ==>nodejs中的 http.createServer()
var app = express();
//设置静态文件的托管
//当喻户访问的url以/plublic开始,那么直接返回对应的(__dirname+'/public'下的问文件
//Express 提供了内置的中间件 express.static 来设置静态文件如：图片， CSS, JavaScript 等。
//你可以使用 express.static 中间件来设置静态文件路径。例如，如果你将图片， CSS, JavaScript 文件放在 public 目录下，你可以这么写：
app.use('/public', express.static(__dirname + '/public'));

//与下面冲突,如果想要 /admin显示内容怎么办
app.get('/', function (req, res) {
    res.send('index');
});

/*
 * 根据不同的功能划分模块*/
app.use('/admin',require('./routers/admin'));
app.use('api',require('./routers/api'));
app.use('/index',require('./routers/index'));

//加载数据库模块
var  mongodb =  require('mongodb');
//var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
//var db = new mongodb.Db('mydb', server, {safe: true});

mongodb.connect('mongodb://localhost:27017/mydb',function(err){
    if(err){
        console.log('数据库连接失败!');
    }else{
        console.log('数据库连接成功');
        app.listen(8081);
    }
});
//连接db
//db.open(function (err, db) {
//    if (!err) {
//        //console.log('connect db');
//        // 连接Collection（可以认为是mysql的table）
//        // 第1种连接方式
//        // db.collection('mycoll',{safe:true}, function(err, collection){
//        //     if(err){
//        //         console.log(err);
//        //     }
//        // });
//        // 第2种连接方式
//        db.createCollection('users', {safe: true}, function (err, collection) {
//            if (err) {
//                console.log(err);
//            } else {
//                //新增数据
//                // var tmp1 = {id:'1',title:'hello',number:1};
//                //          collection.insert(tmp1,{safe:true},function(err, result){
//                //              console.log(result);
//                //          });
//                //更新数据
//                // collection.update({title:'hello'}, {$set:{number:3}}, {safe:true}, function(err, result){
//                //     console.log(result);
//                // });
//                // 删除数据
//                // collection.remove({title:'hello'},{safe:true},function(err,result){
//                //                   console.log(result);
//                //               });
//
//                // console.log(collection);
//
//                //collection.findOne(function(err,doc){
//                //    console.log('findOne');
//                //    console.log(doc);
//                //});
//                ////写入数据
//                //var tmp1 = {name: 'heiyu',password:"123"};
//                //var tmp2 = {name: '小明',password:"123"};
//                //collection.insert([tmp1, tmp2], {safe: true}, function (err, result) {
//                //    //console.log(result);
//                //});
//
//                // 查询数据
//                //collection.find() .toArray(function(err,docs){
//                //        console.log(docs);
//                //});
//                //collection.find({ "id" : 3 }) .toArray(function(err,docs){
//                //    console.log('find');
//                //    console.log(docs);
//                //});
//                var server = app.listen(8081, function () {
//                    //var host = server.address().address;
//                    //var port = server.address().port;
//                    //console.log("应用实例，访问地址为 http://%s:%s", host, port)
//
//                })
//            }
//
//        });
//        // console.log('delete ...');
//        // //删除Collection
//        //db.dropCollection('ceshi', {safe: true}, function (err, result) {
//        //    if (err) {
//        //        console.log('err:');
//        //        console.log(err);
//        //    } else {
//        //        console.log('ok:');
//        //        console.log(result);
//        //    }
//        //});
//    } else {
//        console.log(err);
//    }
//});

////加载模板处理模块
var swig = require('swig');
//
//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数,模板引擎的名称,同时也是模板文件的后缀,
// 第二个参数标示用户解析处理模板内容的方法
app.engine('html',swig.renderFile);
////设置模板文件存放的目录,第一个参数必须是views,第二个参数是目录
app.set('views','./views');
////注册所使用的模板引擎,第一个参数必须是 view engine,第二个参数和app.engine
////定义的模板引擎(第一个参数)是一致的
app.set('view engine','html');
////在开发过程中,需要取消换模板缓存
swig.setDefaults({cache:false});

//http://blog.csdn.net/dszgf5717/article/details/50697686
//

/**
 * 当前问题:
 * 1.login 页面  账号密码不正确时,一直在读取
 * 2.如何,让表单提交之前验证账号和密码
 * 3.是否可以ajax 提交
 * 4.ajax提交是走nodejs 还是 public内的js
 * 5.不通过js如何保存错误后的用户名   // 模板变量
 * 6.后台如何给前端弹窗提示,提示注册成功
 * 7.react.render 没有父元素怎么办
 * */