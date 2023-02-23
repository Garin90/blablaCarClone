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
    required: true,
    min: 0
  },
  date: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  comments:{
    type: String,
    maxLength: [140, 'maximum length 140 chars']
  }
},
  { timestamps: true }
)

//Saving on Trip the model created
const Trip = mongoose.model('Trip',tripSchema);

//Exporting Trip as a model
module.exports = Trip;