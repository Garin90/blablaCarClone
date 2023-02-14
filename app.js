//requiring .env file
require('dotenv').config();

//requiring express & app constant creation based on express framework
const express = require('express');
const app = express();

//static files set up
app.use(express.static(`${__dirname}/public`));

//hbs config pointing to views folder
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

//requiring hbs config for call hbs partials and helpers
require('./configs/hbs.config');

//Lines for be able to use routes file every http request
const router = require('./configs/routes.config');
app.use(router);

//Conection with express server using port 3000.
const port = process.env.PORT || "3000";
app.listen(port, () => console.log(`Application running at port ${3000}`));