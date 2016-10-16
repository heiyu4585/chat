var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongodb.Db('mydb', server, {safe: true});

//连接db
db.open(function (err, db) {
    if (!err) {
        console.log('connect db');
        // 连接Collection（可以认为是mysql的table）
        // 第1种连接方式
        // db.collection('mycoll',{safe:true}, function(err, collection){
        //     if(err){
        //         console.log(err);
        //     }
        // });
        // 第2种连接方式
        db.createCollection('users', {safe: true}, function (err, collection) {
            if (err) {
                console.log(err);
            } else {
                //新增数据
                // var tmp1 = {id:'1',title:'hello',number:1};
                //          collection.insert(tmp1,{safe:true},function(err, result){
                //              console.log(result);
                //          });
                //更新数据
                // collection.update({title:'hello'}, {$set:{number:3}}, {safe:true}, function(err, result){
                //     console.log(result);
                // });
                // 删除数据
                // collection.remove({title:'hello'},{safe:true},function(err,result){
                //                   console.log(result);
                //               });

                // console.log(collection);


                //collection.findOne(function(err,doc){
                //    console.log('findOne');
                //    console.log(doc);
                //});
                //写入数据
                var tmp1 = {id: 2, name: 'hello'};
                var tmp2 = {id: 3, name: 'world'};
                collection.insert([tmp1, tmp2], {safe: true}, function (err, result) {
                    //console.log(result);
                });

                // 查询数据
                collection.find() .toArray(function(err,docs){
                    var html ='';
                    for(var x in docs){
                        if(x==0){
                            html+='<a href="#" class="list-group-item active">'+docs[x]+'</a>';
                        }else{
                            html+='<a href="#" class="list-group-item">'+docs[x]+'</a>';
                        }
                    }

                    $("#EV-userList").html(html);
                });
                //collection.find({ "id" : 3 }) .toArray(function(err,docs){
                //    console.log('find');
                //    console.log(docs);
                //});

            }

        });

        // console.log('delete ...');
        // //删除Collection
        //db.dropCollection('ceshi', {safe: true}, function (err, result) {
        //    if (err) {
        //        console.log('err:');
        //        console.log(err);
        //    } else {
        //        console.log('ok:');
        //        console.log(result);
        //    }
        //});
    } else {
        console.log(err);
    }
});