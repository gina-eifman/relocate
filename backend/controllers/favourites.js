const Favourite = require('../models/favourite');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { BAD_REQUEST_ERR, NOT_FOUND_FAVOURITE_ERR, MANY_REQUESTS_ERR } = require('../utils/constants');
const ManyRequestsError = require('../errors/ManyRequestsError');

module.exports.getFavourites = (req, res, next) => {
  const owner = req.user._id;
  Favourite.find({ owner })
    .then((favourites) => res.send(favourites))
    .catch(next);
};

module.exports.addFavourite = (req, res, next) => {
  const owner = req.user._id;
  const { id: countryId } = req.body;
  Favourite.create({ owner, countryId })
    .then((favourite) => {
      if (!favourite) {
        next(new NotFoundError(NOT_FOUND_FAVOURITE_ERR));
      }
      res.status(201).send(favourite);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERR));
      } else if (err.code === 11000) {
        next(new BadRequestError('Country is already in favourites'));
      } else if (err.code === 429) {
        next(new ManyRequestsError(MANY_REQUESTS_ERR));
      } else {
        next(err);
      }
    });
};

module.exports.deleteFavourite = (req, res, next) => {
  const { id } = req.params;
  const owner = req.user._id;

  Favourite.findOneAndDelete({ _id: id, owner })
    .then((favourite) => {
      if (!favourite) {
        next(new NotFoundError(NOT_FOUND_FAVOURITE_ERR));
      }
      res.send();
    })
    .catch(next);
};