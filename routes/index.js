
module.exports = function(app){
  app.get('/',function(req,res,next){
    res.redirect('/signin');
  });

  app.use('/main', require('./main'));
  app.use('/signin', require('./signin'));
  app.use('/register', require('./register'));
};
