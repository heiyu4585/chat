/**
 * Created by 王 on 2016/9/17.
 */

var express = require('express');
var router = express.Router();

router.get('/user',function(req,res,next){
    //res.send('admin-user');
    res.render('./admin/user', { title: '标题' });
});
module.exports = router;



