module.exports.isAuthenticated = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

//middleware for check if the role of the user is admin
module.exports.isAdmin = (req, res, next) => {
  if(req.user?.role === 'admin'){
    next();
  } else {
    res.redirect('/');
  }
}