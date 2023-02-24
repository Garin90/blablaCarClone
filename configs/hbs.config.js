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

hbs.registerHelper('isTripComplete', (seats) => {
  return true;
  // console.log(seats);
  // if(seats <= 0){
  //   return true;
  // } else {
  //   return false;
  // }
  // return seats <= 0 ? true : false
});
