var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;
var MailModel = require('../models/mail');
var nowDate = require('../middlewares/common').nowDate();


router.get('/',checkLogin,function(req,res,next){
   res.render('inbox',{
       title:'mailbox',
       active: 2
   })
});



router.get('/draft',checkLogin,function(req,res,next){
    res.render('draft',{
        title:'mailbox',
        active: 3
    })
});

router.post('/draft',checkLogin,function(req,res,next){
    var mailInfo = {
        inMail:'',
        toMail:'',
        title: req.body.title,
        text: req.body.text,
        state: '2',
        created_at: nowDate,
        updated_at: nowDate
    };
    MailModel.create(mailInfo)
        .then(function (result) {
           if(result.result.ok == 1){
               return res.json({status:200,message: '保存草稿成功'})
           }else{
               return res.json({status:500,message: '保存草稿失败'})
           }
        })
        .catch(function (e) {
            next(e);
        });
});


router.get('/outbox',checkLogin,function(req,res,next){
    res.render('outbox',{
        title:'mailbox',
        active: 4
    })
});


router.get('/write',checkLogin,function(req,res,next){
    res.render('write',{
        title:'mailbox',
        active: 1
    })
});



module.exports = router;