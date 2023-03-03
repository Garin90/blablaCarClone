//we will need to apply some methods to the model, so we require the trips model
const Trip = require('../models/trip.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');

//DEFINING ACTIOS FOR APPLY TO TRIPS DATA BASE
//Finding all trips to show it into trips list view
module.exports.list = (req, res, next) => {
  const { latFrom, lngFrom, latTo, lngTo, seats, date } = req.query;
  const criterial = {};

  criterial.seats = seats;
  criterial.date = date;
  const fromNear = {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [lngFrom, latFrom]
      },
      $maxDistance: 50000
    }
  }

  const toNear = {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [lngTo, latTo]
      },
      $maxDistance: 50000
    }
  }
  
criterial.locationFrom = fromNear


  Trip.find(criterial)
    .then((trips) => {
      return Trip.find({
        locationTo: toNear,
        _id: { $in: trips.map(x => x._id) }
      })
      .populate({
        path: 'user',
        populate: {
          path: 'receivedRatings'
        }
      })
    })
    .then(trips => {
      res.render('trips/list', { trips })
    })
    .catch(next)
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

module.exports.doCreate = (req, res, next) => {
  const { latFrom, lngFrom, latTo, lngTo } = req.body;

  const trip = req.body;
  trip.user = req.user.id;

  if ( latFrom && lngFrom && latTo && lngTo) {
    trip.locationFrom = {
      type: 'Point',
      coordinates: [lngFrom, latFrom]
    }
    trip.locationTo = {
      type: 'Point',
      coordinates: [lngTo, latTo]
    }
  }
  Trip.create(trip) 
    .then(() => {
      res.redirect('/trips')
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render("trips/new", { errors: error.errors, trip: req.body });
      } else {
        next(error);
      }
    })
}

module.exports.update = (req, res, next) => {
  Trip.findById(req.params.id)
  .then((trip) => {
    res.render('trips/edit', { trip })
  })
  .catch(next)
}

module.exports.doUpdate = (req, res, next) => {
  Trip.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
  .then((trip) => {
    res.redirect(`/trips/${req.params.id}`)
  })
  .catch((error) => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.render("trips/edit", { errors: error.errors, trip: req.body });
    } else {
      next(error);
    }
  })
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
      res.redirect('/trips');
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
  .then((trip) => {
    req.user.adquiredTrips.push(req.params.id);
    User.findByIdAndUpdate(req.user.id, req.user)
    .then(() => {
      if(trip.seats <= 0) {
        next(error);
      }
      trip.seats--;
      Trip.findByIdAndUpdate(req.params.id, { seats: trip.seats })
        .then(() => next())
        .catch((error) => console.error(`Subtract seats error: ${error}`));
      res.redirect('/profile/rides')})
    .catch(next);
  })
  .catch(next);

}

module.exports.all = (req, res,next) => {
  Trip.find()
  .populate({
    path: 'user',
      populate: {
        path: 'receivedRatings'}
  })
  .then((trips) => {
    res.render('trips/all', { trips })
  })
  .catch(next);
}

