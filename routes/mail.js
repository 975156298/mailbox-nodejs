var express = require('express');
var router = express.Router();
var async = require('async');
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
    MailModel.getDraftMail(req.session.email._id, '2')
        .then(function (result) {
            res.render('draft', {
                title: 'mailbox',
                active: 3,
                mails: result
            })
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
                    console.log(result);
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


module.exports = router;