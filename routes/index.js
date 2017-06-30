
module.exports = function(app){
  app.get('/',function(req,res,next){
    if(req.session.email){
      res.redirect('/main');
    }else{
      res.redirect('/signin');
    }

  });

  app.use('/main', require('./main'));
  app.use('/signin', require('./signin'));
  app.use('/register', require('./register'));
  app.use('/mail', require('./mail'))
};
