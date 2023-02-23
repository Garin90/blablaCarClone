//we will need to apply some methods to the model, so we require the trips model
const { findByIdAndUpdate, findById, rawListeners } = require('../models/trip.model');
const Trip = require('../models/trip.model');
const User = require('../models/user.model');

//DEFINING ACTIOS FOR APPLY TO TRIPS DATA BASE
//Finding all trips to show it into trips list view
module.exports.list = (req, res, next) => {
  Trip.find()
  .populate('user')
  .then((trips) => {
    res.render('trips/list', { trips });
  })
  .catch(next);
}

module.exports.detail = (req, res, next) => {
  Trip.findById(req.params.id)
  .populate('user')
  .then((trip) => {
    res.render('trips/detail', { trip })
  })
  .catch(next);
}

module.exports.create = (req, res, next) => {
  res.render('trips/new')
}

module.exports.doCreate = (req,res,next) => {
req.body.user = req.user.id;

  Trip.create(req.body)
  .then(() => {
    res.redirect('/trips')
  })
  .catch(next);
}

module.exports.update = (req, res, next) => {
  Trip.findById(req.params.id)
  .then((trip) => {
    res.render('trips/edit', { trip })
  })
  .catch(next)
}

module.exports.doUpdate = (req, res, next) => {
  Trip.findById(req.params.id)
    .then((trip) => {
      if(!trip){
        res.redirect('/trips')
      } else if (trip.user == req.user.id) {
        trip.update(req.body, { runValidators: true })
          .then(() => res.redirect(`/trips/${req.params.id}`))
      } else {
        next();
      }
    }).catch(next)
}

module.exports.delete = (req, res, next) => {
  Trip.findById(req.params.id)
  .then((trip) => {
    if(!trip){
      res.redirect('/trips')
    } else if (trip.user == req.user?.id){
      trip.delete()
        .then(() => res.redirect('/trips'))
        .catch(next);
    } else {
      next();
    }
  })
  .catch(next);
}

module.exports.book = (req, res, next) => {
  Trip.findById(req.params.id)
  .then((trip) => {
    res.render('trips/book', { trip })
  })
  .catch(next)
}

module.exports.doBook = (req, res, next) => {
  Trip.findById(req.params.id)
  .then(() => {
    req.user.adquiredTrips.push(req.params.id);
    User.findByIdAndUpdate(req.user.id, req.user)
      .then(() => res.redirect('/profile/rides'))
      .catch(next)
  })
  .catch(next)
}

