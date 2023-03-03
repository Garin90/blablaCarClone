const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Trip = require('../models/trip.model');

module.exports.create = (req, res, next) => {
  res.render('users/new');
}

module.exports.doCreate = (req, res, next) => {
  User.create(req.body)
  .then(() => res.redirect('/login'))
  .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        //console.log(`date format: ${req.body.birthdate}`)
        res.render("users/new", { errors: error.errors, user: req.body });
      } else {
        next(error);
      }
    });
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
  User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then(() => res.redirect('/profile'))
    .catch(next)
}

module.exports.rides = (req, res, next) => {
  res.render('users/rides');
}

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
}

module.exports.ratings = (re, res, next) => { 
  res.render('users/ratings')
}