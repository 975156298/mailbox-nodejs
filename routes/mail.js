var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/check').checkLogin;

router.get('/',checkLogin,function(req,res,next){
   res.render('inbox',{
       title:'mailbox',
       user: req.session._id,
       active: 2
   })
});



router.get('/draft',checkLogin,function(req,res,next){
    res.render('draft',{
        title:'mailbox',
        user: req.session._id,
        active: 3
    })
});


router.get('/outbox',checkLogin,function(req,res,next){
    res.render('outbox',{
        title:'mailbox',
        user: req.session._id,
        active: 4
    })
});


router.get('/write',checkLogin,function(req,res,next){
    res.render('write',{
        title:'mailbox',
        user: req.session._id,
        active: 1
    })
});



module.exports = router;