//we will need to apply some methods to the model, so we require the trips model
const Trip = require('../models/trip.model');

//DEFINING ACTIOS FOR APPLY TO TRIPS DATA BASE
//Finding all trips to show it into trips list view
module.exports.list = (req, res, next) => {
  Trip.find()
  .then((trips) => {
    res.render('trips/list', { trips });
  })
  .catch(next);
}

module.exports.detail = (req, res, next) => {
  Trip.findById(req.params.id)
  .then((trip) => {
    res.render('trips/detail', { trip })
  })
  .catch(next);
}