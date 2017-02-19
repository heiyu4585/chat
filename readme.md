




*开启方法:

一.开启mongodb:

1.运行cmd.exe进入dos命令界面，执行下列命令

    `> cd d:mongodb>bin`
    `> d:mongodb bin>mongod -dbpath "E:/www/chat/db"`
    
2.在robomongo中选择链接数据库

    新建方法 create  localhost:27017

二. 运行

`node app.js`

进入 :http://localhost:8081/ 查看

三 .技术栈

 * 技术:nodejs  mongodb session express  socket swig react bootstrap
 * 1.用户的登陆.注册
 * 2.禁止二次登陆
 * 3.swig 模板引擎
 * 4.react 聊天区域首页
 * 5.websocket 聊天实时推送,实时在线人数
















待开发:

/**
* 注册用户名
* 记住登录密码
* 密码MD5加密
* 进入聊天室
* 退出聊天室
* 发送聊天文字
* 发送表情
* 发送图片
* 发送音乐
* 发送FLASH
* 发送链接
* 手写输入
* 截屏
* 保存聊天记录
* 在线聊天人员列表
* 分屏
* 清屏
* 刷新屏幕
* 滚屏
* 对所有人聊天
* 对某某人聊天
* 私聊
* 字体颜色
* 用户管理
* 管理员权限
* 查看用户IP
* 踢出用户
* 加入黑名单
* 普通聊天用户权限
* 加为好友
* 屏蔽某人
*/