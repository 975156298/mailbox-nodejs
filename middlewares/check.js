module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session._id) {

      return res.redirect('/signin');
    }
    next();
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session._id) {
      return res.redirect('back');//返回之前的页面
    }
    next();
  }
};
