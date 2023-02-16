//similar coments in trip.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  user: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
    unique: true
  }
  password: {
    type: String,
    required: true
  }

})

const User = mongoose.model('User', userSchema);
module.exports = User;