//Requiring errors library
const createError = require('http-errors');

//Creating an error 404 for not found pages
module.exports.notFound = ((req, res, next) => {
  next(createError(404, 'Page not found'))
});

//Asigining error 500 to error status (beacuse 500 error doesn't have error status)
// and res.rendet to errors/(error code)
module.exports.statusError = ((error, req, res, next) => {
  error = !error.status ? createError(500, error) : error;
  console.error(error);

  res.status(error.status)
  .render(`errors/${error.status}`, { error })
});
