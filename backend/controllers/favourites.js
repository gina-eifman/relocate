const Favourite = require('../models/favourite');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { BAD_REQUEST, NOT_FOUND } = require('../utils/constants');

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
    .then((favourite) => res.status(201).send(favourite))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST));
      } else if (err.code === 11000) {
        next(new BadRequestError('Страна уже в избранном'));
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
        throw new NotFoundError(NOT_FOUND);
      }
      res.send({ message: 'Страна удалена из избранного' });
    })
    .catch(next);
};