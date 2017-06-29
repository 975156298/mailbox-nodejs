
var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/',checkNotLogin,function(req,res,next){
    res.render('register',{
        title:'mailbox',
        user:''
    })
});

router.post('/',checkNotLogin,function(req,res,next){
    console.log(req.body);
    var user = {
        email: req.body.email,
        password: req.body.password
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
