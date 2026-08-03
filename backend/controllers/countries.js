const Country = require('../models/country');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { BAD_REQUEST_ERR, NOT_FOUND_COUNTRY_ERR, MANY_REQUESTS_ERR } = require('../utils/constants');
const ManyRequestsError = require('../errors/ManyRequestsError');

module.exports.getCountries = (req, res, next) => {
  Country.find()
    .then((countries) => res.send(countries))
    .catch(next);
};

module.exports.getCountryById = (req, res, next) => {
  const { id } = req.params;
  Country.findOne({ id })
    .then((country) => {
      if (!country) {
        next(new NotFoundError(NOT_FOUND_COUNTRY_ERR));
      }
      res.send(country);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERR));
      } else if (err.code === 429) {
        next(new ManyRequestsError(MANY_REQUESTS_ERR));
      } else {
        next(err);
      }
    });
};