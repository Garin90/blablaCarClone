const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blablaCar-clone";

mongoose.connect(MONGODB_URI)
.then(() => console.info(`Successfully connected to data base ${MONGODB_URI}`))
.catch((error) => console.error(`The application has not been able to connect to database ${MONGODB_URI} because the error: ${error}`));