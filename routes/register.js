
var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/',checkNotLogin,function(req,res,next){
    res.render('register',{
        title:'mailbox',
        active: 0
    })
});

router.post('/',checkNotLogin,function(req,res,next){
    console.log(req.body);
    var user = {
        email: req.body.email,
        password: req.body.password,
        created_at: nowData()
    };
    UserModel.create(user)
        .then(function (result) {
            console.log(result);
            user = result.ops[0];
            req.session.user = user;
            return res.json({status: 200,message:'注册成功'})
        })
        .catch(function (e) {
            next(e);
        });
});

router.get('/user',checkNotLogin,function(req,res,next){
    UserModel.getUser(req.query.email)
        .then(function (user) {
            if (!user) {
                return res.json({valid:true})
            }else{
                return res.json({valid:false})
            }
        })
        .catch(next);
});

module.exports = router;

function nowData(){
    var now_date = new Date();
    var year = now_date.getFullYear();
    var month=now_date.getMonth()+1>9 ? now_date.getMonth()+1 : '0'+(now_date.getMonth()+1);
    var data=now_date.getDate()>=10 ? now_date.getDate() : '0'+now_date.getDate();
    var time = now_date.getHours()>=10 ? now_date.getHours() : '0'+now_date.getHours();
    var minutes = now_date.getMinutes() >=10 ? now_date.getMinutes() : '0'+now_date.getMinutes();
    var date =year+'-'+month+'-'+data + ' ' +time+ '-' + minutes;
    return date;
}