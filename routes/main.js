var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;

router.get('/',checkLogin,function(req,res,next){
    res.render('index',{
        title:'mailbox',
        active: 0
    })
});

module.exports = router;