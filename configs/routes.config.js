//requiring express & config router funtion into router constant
const express = require('express');
const router = express.Router();
//You will need a constant for use actions defined inside controller files. 
const commonsController = require('../controllers/commons.controller');
const tripsController = require('../controllers/trips.controller');
const usersController = require('../controllers/users.controller')

//defining the actions for path requests
router.get('/', commonsController.home);

router.get('/trips', tripsController.list);
router.get('/trips/new', tripsController.create);
router.post('/trips/new', tripsController.doCreate);
router.get('/trips/:id', tripsController.detail);

router.get('/users/new', usersController.create);
router.post('/users/new', usersController.doCreate);

router.get('/login', usersController.login);
router.post('/login', usersController.doLogin);

//exporting router for app.js calling.
module.exports = router;