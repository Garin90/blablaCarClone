//requiring .env file
require('dotenv').config();

//requiring express & app constant creation based on express framework
const express = require('express');
const app = express();

//hbs config pointing to views folder
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);


// Conection with express server using port 3000.
const port = process.env.PORT || "3000";
app.listen(port, () => console.log(`Application running at port ${3000}`));