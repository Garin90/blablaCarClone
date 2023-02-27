const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ratingSchema = new Schema ({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  observations: {
    type: String
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});



const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;