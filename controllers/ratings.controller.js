const Rating = require('../models/rating.model')
const mongoose = require('mongoose');

module.exports.rate = (req, res, next) => {
  res.render('ratings/new', {userId: req.params.id});
}

module.exports.doRate = (req, res, next) => {
  Rating.create({
    user: req.params.id,
    observations: req.body.observations,
    rating: req.body.rating,
    sender: req.user.id  
  })
  .then(() => {
    res.redirect('/');
  })
  .catch(next);
}