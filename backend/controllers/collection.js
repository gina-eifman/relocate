const Collection = require('../models/collection');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const { BAD_REQUEST, NOT_FOUND, FORBIDDEN } = require('../utils/constants');

module.exports.getCollections = (req, res, next) => {
  const owner = req.user._id;
  Collection.find({ owner }).then((collections) => {
      res.send(collections);
    })
    .catch(next);
};

module.exports.createCollection = (req, res, next) => {
  const owner = req.user._id;
  const { name, countryIds = [] } = req.body;
  Collection.create({ name, owner, countryIds })
    .then((collection) => res.send(collection))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports.updateCollection = (req, res, next) => {
  const { collectionId } = req.params;
  const userId = req.user._id;
  const { name, countryIds } = req.body;

  Collection.findById(collectionId)
    .then((collection) => {
      if (!collection) {
        throw new NotFoundError(NOT_FOUND);
      }
      if (collection.owner.toString() !== userId) {
        throw new ForbiddenError(FORBIDDEN);
      }
      if (name !== undefined) collection.name = name;
      if (countryIds !== undefined) collection.countryIds = countryIds;
      return collection.save();
    })
    .then((updatedCollection) => res.send(updatedCollection))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCollection = (req, res, next) => {
  const { collectionId } = req.params;
  const userId = req.user._id;

  Collection.findById(collectionId)
    .then((collection) => {
      if (!collection) {
        throw new NotFoundError(NOT_FOUND);
      }
      if (collection.owner.toString() !== userId) {
        throw new ForbiddenError(FORBIDDEN);
      }
      return Collection.findByIdAndDelete(collectionId);
    })
    .then(() => res.send({ message: 'Коллекция удалена' }))
    .catch(next);
};

module.exports.addCountryToCollection = async (req, res, next) => {
    try {
        const { collectionId } = req.params;
        const { countryId } = req.body;
        const userId = req.user._id;

        const collection = await Collection.findById(collectionId);
        if (!collection) throw new NotFoundError(NOT_FOUND);
        if (collection.owner.toString() !== userId.toString()) throw new ForbiddenError(FORBIDDEN);
        console.log('Добавляем страну:', countryId, 'в коллекцию:', collectionId);
        const updated = await Collection.findByIdAndUpdate(
            collectionId,
            { $addToSet: { countryIds: countryId } },
            { returnDocument: 'after', runValidators: true }
        );
        console.log('Результат обновления:', updated);
        res.send(updated);
    } catch (err) {
        next(err);
    }
};

module.exports.deleteCountryFromCollection = (req, res, next) => {
  console.log('=== Бэкенд deleteCountryFromCollection ===');
  console.log('req.params:', req.params);
  const { collectionId, countryId } = req.params;
  const userId = req.user._id;

  Collection.findById(collectionId)
    .then((collection) => {
      if (!collection) {
        throw new NotFoundError(NOT_FOUND);
      }
      if (collection.owner.toString() !== userId) {
        throw new ForbiddenError(FORBIDDEN);
      }
      collection.countryIds = collection.countryIds.filter(id => id !== countryId);
      return collection.save();
    })
    .then((updatedCollection) => res.send(updatedCollection))
    .catch(next);
};