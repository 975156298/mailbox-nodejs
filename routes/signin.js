var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/',checkNotLogin,function(req,res,next){
    res.render('signin',{
        title:'mailbox',
        active: 0
    })
});

router.post('/',checkNotLogin,function(req,res,next){
    UserModel.getUser(req.body.email)
        .then(function(user){
            if(!user){
                return res.json({status:404,message:'用户名不存在'})
            }
            if(user.password == req.body.password){
                req.session.email = {
                    _id: user._id,
                    email: user.email
                };
                return res.json({status:200,message:'登录成功'})
            }else{
                return res.json({status:404,message:'密码错误'})
            }
        }).catch(next);
});

router.get('/signout',function(req,res,next){
    req.session.email = null;
    return res.json({status: 200,message:'成功退出'})
});

module.exports = router;
