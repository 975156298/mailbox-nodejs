var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var MailModel = require('../models/mail');
var nowDate = require('../middlewares/common').nowDate();

router.get('/',checkLogin,function(req,res,next){
    MailModel.getMailNum({toMail: req.session.email.email,isread: '1',state:'3'})
        .then(function(num){
            console.log(num);
            res.render('index',{
                title:'mailbox',
                active: 0,
                text:'邮件发送成功',
                num: num
            })
        })
        .catch(function (e) {
            next(e);
        });
});

module.exports = router;