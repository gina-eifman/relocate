const Country = require('../models/country');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { BAD_REQUEST, NOT_FOUND } = require('../utils/constants');

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
        throw new NotFoundError(NOT_FOUND);
      }
      res.send(country);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};