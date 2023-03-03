module.exports.googleApiKey = (req, res, next) => {
  res.locals.googleApiKey = process.env.GOOGLE_API_KEY
  next();
}

module.exports.query = (req, res, next) => {
  res.locals.query = req.query
  next();
} 