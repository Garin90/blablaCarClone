//requiring data base config
require('../configs/db.config');
//requiring the model to be able to compare and insert all the fields
const Trip = require('../models/trip.model');

//Script to delete all the content in trip data base and add new elements (10 in this case)
Trip.deleteMany()
.then(() => {
  for (let i = 0; i <= 10; i++) {
    Trip.create({
      user: `User ${i}`,
      from: `City from ${i}`,
      to: `City of destiny ${i}`,
      price: 30,
      date: `Date ${i}`,
      seats: 3,
      comments: `Comment ${i}`
    }).then((Trip) => {
      console.log(`Trip ${i} created`)
    }).catch((error) => console.error(error))
  }
})
