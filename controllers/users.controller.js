const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

module.exports.create = (req, res, next) => {
  res.render('users/new');
}

module.exports.doCreate = (req, res, next) => {
  User.create(req.body)
  .then(() => res.redirect('/login'))
  .catch(next);
}

module.exports.login = (req, res, next) => {
  res.render('users/login')
}

module.exports.doLogin = (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then((user) => {
    bcrypt.compare(req.body.password, user.password)
    .then((ok) => {
      req.session.userId = user.id;
      res.redirect('/trips')
    })
    .catch(next)
  })
  .catch(next)
}

module.exports.list = (req, res, next) => {
  User.find()
  .then((users) => res.render('users/list', { users }))
  .catch(next)
}

module.exports.profile = (req, res, next) => {
  res.render('users/profile');
}

module.exports.update = (req, res, next) => {
  res.render('users/edit');
}

module.exports.doUpdate = (req, res, next) => {
  if(req.file){
    req.body.image = req.file.path;
  }
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect('/profile'))
    .catch(next)
}