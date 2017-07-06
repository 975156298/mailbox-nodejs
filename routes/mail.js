var express = require('express');
var router = express.Router();
var async = require('async');
var nodemailer = require('nodemailer');

var checkLogin = require('../middlewares/check').checkLogin;
var MailModel = require('../models/mail');
var nowDate = require('../middlewares/common').nowDate();


router.get('/', checkLogin, function (req, res, next) {
    res.render('inbox', {
        title: 'mailbox',
        active: 2
    })
});


router.get('/draft', checkLogin, function (req, res, next) {
    var page = req.query.page || 1 ;
    MailModel.getDraftMail(req.session.email._id, '2',page)
        .then(function (result) {
            MailModel.getMailNum({inMail: req.session.email._id,state: '2'})
                .then(function(num){
                    var pageTotal = Math.ceil(JSON.parse(num) / 10);
                    res.render('draft', {
                        title: 'mailbox',
                        active: 3,
                        mails: result,
                        page: page,
                        pageTotal: pageTotal
                    })
                })
                .catch(function (e) {
                    next(e);
                });
        })
        .catch(function (e) {
            next(e);
        });
});

router.get('/draft/del', checkLogin, function (req, res, next) {
    var mailId = req.query.mailId.split(',');
    async.concat(mailId,
        function (item, callback) {
            MailModel.delMail(item)
                .then(function (result) {
                    callback(null,result);
                })
                .catch(function (e) {
                    next(e);
                });
        },
        function (err, data) {
            return res.json({status: 200,message: '删除邮件成功'})
        });
});

router.post('/draft', checkLogin, function (req, res, next) {
    var mailInfo = {
        inMail: req.session.email._id,
        toMail: req.body.toMail,
        title: req.body.title,
        text: req.body.text,
        state: '2',
        created_at: nowDate,
        updated_at: nowDate
    };
    MailModel.create(mailInfo)
        .then(function (result) {
            if (result.result.ok == 1) {
                return res.json({status: 200, message: '保存草稿成功'})
            } else {
                return res.json({status: 500, message: '保存草稿失败'})
            }
        })
        .catch(function (e) {
            next(e);
        });
});


router.get('/outbox', checkLogin, function (req, res, next) {
    res.render('outbox', {
        title: 'mailbox',
        active: 4
    })
});


router.get('/write', checkLogin, function (req, res, next) {
    res.render('write', {
        title: 'mailbox',
        active: 1
    })
});

/*router.post('/write',checkLogin, function(req,res,next){
    var transport = nodemailer.createTransport('smtps://15733112788%40163.com:a950710@smtp.163.com');
    var mailOptions = {
        from: '15733112788@163.com',  //发件人
        to: '975156298@qq.com',  //收件人，可以设置多个
        subject: 'ces',  //邮件主题
        text: 'ces',  //邮件文本
        html: ''  //html格式文本
    };
    transport.sendMail(mailOptions, function(err, info){
        if(err){
            console.log('出错');
            return console.log(err);
        }
        console.log("发送成功");
        console.log('Message sent: ' + info.response);
    });
}); 邮箱的一个发送  */


router.post('/write',checkLogin,function(req,res,next){
   console.log(req.body);
    var mailInfo = {
        toMail: req.body.toMail,
        inMail: req.session.email._id,
        title: req.body.title,
        text: req.body.text,
        state: '0',
        created_at: nowDate,
        updated_at: nowDate
    };
    console.log(mailInfo)
    MailModel.create(mailInfo)
        .then(function (result) {
            if (result.result.ok == 1) {
                return res.json({status: 200, message: '发送邮件成功'})
            } else {
                return res.json({status: 500, message: '发送邮件失败'})
            }
        })
        .catch(function (e) {
            next(e);
        });
});

module.exports = router;