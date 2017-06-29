
module.exports = function(app){
  app.get('/',function(req,res,next){
    res.redirect('/sigin');
  });

  app.use('/main', require('./main'));
  app.use('/sigin', require('./signin'));
  app.use('/register', require('./register'));
};
