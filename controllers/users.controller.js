const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
  res.render('users/new');
}

module.exports.doCreate = (req, res, next) => {
  User.create(req.body)
  .then(() => res.redirect('/login'))
  .catch(next);
}