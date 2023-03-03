//requiring express & config router funtion into router constant
const express = require('express');
const router = express.Router();
//You will need a constant for use actions defined inside controller files. 
const commonsController = require('../controllers/commons.controller');
const tripsController = require('../controllers/trips.controller');
const usersController = require('../controllers/users.controller');
const ratingController = require('../controllers/ratings.controller');
const messageController = require('../controllers/message.controller')
//We are requiring cloudinary config for be able to play with a profile picture
const storage = require('./storage.config');

//Requiring this to be able to use the isAuthenticated middleware
const secure = require('../middlewares/secure.mid')

//defining the actions for path requests
router.get('/', commonsController.home);

router.get('/trips', tripsController.list);
router.get('/trips/all', secure.isAuthenticated, secure.isAdmin, tripsController.all);
router.get('/trips/new', secure.isAuthenticated, tripsController.create);
router.post('/trips/new', secure.isAuthenticated, tripsController.doCreate);
router.get('/trips/edit/:id', secure.isAuthenticated, tripsController.update);
router.post('/trips/edit/:id', secure.isAuthenticated, tripsController.doUpdate);
router.post('/trips/delete/:id', secure.isAuthenticated, tripsController.delete);
router.get('/trips/:id', tripsController.detail);
router.get('/trips/book/:id', tripsController.book);
router.post('/trips/book/:id', secure.isAuthenticated, tripsController.doBook);

router.get('/users/new', usersController.create);
router.post('/users/new', usersController.doCreate);
router.get('/users', secure.isAuthenticated, secure.isAdmin, usersController.list);
router.get('/profile', secure.isAuthenticated, usersController.profile);
router.get('/profile/ratings', secure.isAuthenticated, usersController.ratings)
router.get('/profile/edit', secure.isAuthenticated, usersController.update);
router.post('/profile/edit/:id', secure.isAuthenticated, storage.single('image'), usersController.doUpdate);
router.get('/profile/rides', secure.isAuthenticated, usersController.rides)

router.get('/login', usersController.login);
router.post('/login', usersController.doLogin);

router.get('/logout', secure.isAuthenticated, usersController.logout);

router.get('/users/rating/:id', secure.isAuthenticated, ratingController.rate);
router.post('/users/rating/:id', secure.isAuthenticated, ratingController.doRate);

router.get('/users/chat/:id', secure.isAuthenticated, messageController.list);
router.post('/users/chat/:id', secure.isAuthenticated, messageController.doCreate);
router.get('/profile/inbox', secure.isAuthenticated, messageController.inbox);




//exporting router for app.js calling.
module.exports = router;