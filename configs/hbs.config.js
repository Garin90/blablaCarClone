//requiring hbs fot use it below
const hbs = require('hbs');

//Method for create and use partial views in our page views.
hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper('isOwnedBy', (trip, user, options) => {
  if (trip.user.id == user?.id) {
    return options.fn();
  } else {
    return options.inverse();
  }
});

hbs.registerHelper('isTripComplete', (trip, options) => {
  if (trip.seats <= 0) {
    return options.fn();
  } else {
    return options.inverse();
  }
});

hbs.registerHelper('ratingAverage', (receivedRatings) => {
  console.log(`Received ratings ${receivedRatings}`);
  return Math.round(receivedRatings.map(x => x = x.rating).reduce((a, b) => a + b, 0) / receivedRatings.length);
})


