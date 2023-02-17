//requiring mongoose & call to mongoose schema method
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defining the new Trip Schema
const tripSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  comments:{
    type: String
  }
},
  { timestamps: true }
)

//Saving on Trip the model created
const Trip = mongoose.model('Trip',tripSchema);

//Exporting Trip as a model
module.exports = Trip;