// Requiring database to create the seed
require('../configs/db.config');

// Requiring model to create the seed
const Trip = require('../models/trip.model');

// Requiring model to create the seed
const User = require('../models/user.model');

//requiring faker for create faker fields
const { faker } = require('@faker-js/faker');


// Creating the seed with the User & trip
Trip.deleteMany()
.then(() => console.log('trips deleted'))
.catch((error) => console.error(error));
// citires [barcelona]
// const points = [[0,0], [0,0], [0,0]]

User.deleteMany()
.then(() => {
  for (let i = 0; i <= 10; i++) {
    User.create({
      user: `user${i}`,
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthdate: faker.date.birthdate(), //DB is not saving right this date.
      email: faker.internet.email(),
      password: `12345678`,
      image: faker.image.avatar()
    })
    .then(user => {
        Trip.create({
          user: user.id,
          from: faker.address.city(),
          to: faker.address.city(),
          price: faker.random.numeric(2),
          date: faker.date.future(),
          departureTime: `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}`,
          seats: faker.random.numeric(1),
          comments: faker.random.words(5),
          locationFrom: {
            type: 'Point',
            coordinates: [0,0]
          },
          locationTo: {
            type: 'Point',
            coordinates: [0,0]
          }
        }).then((trip) => {
          console.log(`trip ${i} created`)
        }).catch((error) => console.error(error))
      }
    ).catch((error) => console.error(error))
  }
});
