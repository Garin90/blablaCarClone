//similar coments in trip.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Requiring bcrypt to encrypt the password
const bcrypt = require('bcryptjs');

//method convert an string to an emails array
const ADMIN_USERS = (process.env.ADMIN_USERS || 'admin@example.org')
.split(',')
.map(email => email.trim());

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
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  role: {
    type: String,
    enum: ['guest', 'admin'],
    default: 'guest'
  }
})

//This lines are for encrypting the password before save or post the form.
//Also, if the user edit the profile and not the password, we ensure that 
// the password is not hashed again (2 times, 20 loops)
userSchema.pre('save', function(next) {
  const user = this;

  if(ADMIN_USERS.includes(user.email)){
    user.role = 'admin';
  }


  if(this.isModified('password')){
    bcrypt
    .hash(this.password, 10)
    .then((encryptedPassword) => {
      this.password = encryptedPassword;
      next()
    })
    .catch(next);
  } else {
    next();
  }
})

const User = mongoose.model('User', userSchema);
module.exports = User;