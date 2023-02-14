//requiring express & config router funtion into router constant
const express = require('express');
const router = express.Router();
//You will need a constant for use actions defined inside controller files. 
const commonsController = require('../controllers/commons.controller');
const tripsController = require('../controllers/trips.controller')

//defining the actions for path requests
router.get('/', commonsController.home);

router.get('/trips', tripsController.list);

//exporting router for app.js calling.
module.exports = router;