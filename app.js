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
    res.send('<h1>Welcome </h1><a href="/index/login">点击登陆</a>');
});

/*
 * 根据不同的功能划分模块*/
app.use('/admin', require('./routers/admin'));
app.use('api', require('./routers/api'));
app.use('/index', require('./routers/index'));

//加载数据库模块
var mongodb = require('mongodb');
//var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
//var db = new mongodb.Db('mydb', server, {safe: true});

mongodb.connect('mongodb://localhost:27017/mydb', function (err) {
    if (err) {
        console.log('数据库连接失败!');
    } else {
        console.log('数据库连接成功');
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
app.engine('html', swig.renderFile);
////设置模板文件存放的目录,第一个参数必须是views,第二个参数是目录
app.set('views', './views');
////注册所使用的模板引擎,第一个参数必须是 view engine,第二个参数和app.engine
////定义的模板引擎(第一个参数)是一致的
app.set('view engine', 'html');
////在开发过程中,需要取消换模板缓存
swig.setDefaults({cache: false});

//http://blog.csdn.net/dszgf5717/article/details/50697686
//

/**
 * session
 * */
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('sessiontest'));
app.use(session({
    secret: 'sessiontest',//与cookieParser中的一致
    resave: true,
    saveUninitialized:true
}));

/***
 * WebSocket
 * *********************
 * */
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(8081, function () {
    console.log('listening on *:8081');
});

//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;

io.on('connection', function (socket) {


    //监听新用户加入
    socket.on('login', function (obj) {
        //console.log(obj.userName + '加入了聊天室');
        //console.log(socket.name);
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = obj.userId;
        //console.log(socket.name);
        //检查在线列表，如果不在里面就加入
        if (!onlineUsers.hasOwnProperty(obj.userId)) {
            onlineUsers[obj.userId] = obj.userName;
            //在线人数+1
            onlineCount++;
            //向所有客户端广播用户加入
            io.emit('login', {onlineUsers: onlineUsers, onlineCount: onlineCount, userName: obj.userName,userId:obj.userId});
        }else{
            console.log("重复登陆")
            socket.emit('login',{isLogin:true})
        }


    });
    //监听用户退出
    socket.on('disconnect', function () {
        //console.log(session);
        //console.log("用户退出")
        //console.log(socket.name);
        //将退出的用户从在线列表中删除
        if (onlineUsers.hasOwnProperty(socket.name)) {
            //退出用户的信息
            var obj = {userId: socket.name, userName: onlineUsers[socket.name]};
            //console.log(obj);
            //删除
            delete onlineUsers[socket.name];
            //在线人数-1
            onlineCount--;

            //向所有客户端广播用户退出
            io.emit('logout', {onlineUsers: onlineUsers, onlineCount: onlineCount, userName: obj.userName,userId:obj.userId});
            //console.log(obj.userName + '退出了聊天室');
        }
    });
    //监听用户发布聊天内容
    socket.on('message', function (obj) {
        //console.log(obj);
        //向所有客户端广播发布的消息
        io.emit('message', obj);
        //console.log(obj.userName + '说：' + obj.content);
    });

});
/***
 * WebSocket
 * *********************
 * */
//mongod -dbpath "E:/www/chat/db"
/**
 * mongodb执行方法
 *
 * 当前问题:
 * 1.login 页面  账号密码不正确时,一直在读取
 * 2.如何,让表单提交之前验证账号和密码
 * 3.是否可以ajax 提交
 * 4.ajax提交是走nodejs 还是 public内的js
 * 5.不通过js如何保存错误后的用户名   // 模板变量
 * 6.后台如何给前端弹窗提示,提示注册成功
 * 7.react.render 没有父元素怎么办
 * 8.post 如何传参  登陆时,不通过url传参  //session
 *9. socket 数据保存到 mongodb
 * 10.禁止二次登陆 session
 * */


/**
 * 技术:nodejs  mongodb session express  socket swig react
 * 1.用户的登陆.注册

 * 3.swig 模板引擎
 * 4.react 聊天区域首页
 * 5.websocket 聊天实时推送,实时在线人数
* */