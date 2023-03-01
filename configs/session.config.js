//Requiring express session that is used for manage the sessions insdide a webpage.
//This library is able to create and manage session cookies.
const session = require('express-session');
//Requiring connect mongo. This library it's similar than mongoose but it seems more simple
// in some tasks. So is really usefull to use both.
const MongoStore = require('connect-mongo');

const User = require('../models/user.model');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blablaCar-clone";

module.exports.session = session({
  secret: process.env.SESSION_SECRET || 'super secret', //secret saved in server for create the cookie
  resave: false,
  saveUninitialized : false, //put it in false if you want that a session will be not created without information in the form 
  cookie: { 
    httpOnly: true, //If it's true, the client only can send the cookie via http & the cookies are not available for be used with javascript in client browser.
    secure: process.env.SESSION_SECURE === 'true'//If it's true, the client only be able to send the cookies to the server via https (encrypted and safety).
    // process.env.SESSION_SECURE === 'true' => this expression is used because in .env we can only save strings, and we need to defines a boolean answer here.
  },
  //It will connect with MongoDb and create/save the cookie in data base
  store: MongoStore.create({
    mongoUrl: MONGODB_URI, //where is saved the cookie
    ttl: 7 * 24 * 60 * 60 // Expiration time
  })
});

//We will create this middleware asign the cookie id founded in data base to the user ID, and get all the user information.
module.exports.loadSessionUser = (req, res, next) => {
  const { userId } = req.session
  if(userId) {
    User.findById(userId)
      .populate({
        path: 'adquiredTrips',
        populate: {
          path: 'user'
        }
      })
      .populate({
        path: 'receivedRatings',
        populate: {
          path: 'sender'
        }
      })
      .populate({
        path: 'givenRatings',
        populate: {
          path: 'user'
        }
      })
      .then((user) => {
        req.user = user
        res.locals.currentUser = user
        next()
      })
      .catch(next)
  } else {
    next()
  }
}
