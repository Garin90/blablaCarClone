require('dotenv').config();
const express = require('express');
const app = express();






const port = process.env.PORT || "3002";
app.listen(port, () => console.log(`Application running at port ${3000}`));