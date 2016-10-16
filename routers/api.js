/**
 * Created by 王 on 2016/9/17.
 */

var express = require('express');
var router = express.Router();

router.get('/user',function(req,res,next){
    res.send('app-user');
});
module.exports = router;
