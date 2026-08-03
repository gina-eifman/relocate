const Collection = require('../models/collection');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const { BAD_REQUEST_ERR, NOT_FOUND_COLLECTION_ERR, FORBIDDEN_ERR, MANY_REQUESTS_ERR } = require('../utils/constants');
const ManyRequestsError = require('../errors/ManyRequestsError');

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
        next(new BadRequestError(BAD_REQUEST_ERR));
      } else if (err.code === 429) {
        next(new ManyRequestsError(MANY_REQUESTS_ERR));
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
        next(new NotFoundError(NOT_FOUND_COLLECTION_ERR));
      }
      if (collection.owner.toString() !== userId) {
        next(new ForbiddenError(FORBIDDEN_ERR));
      }
      if (name !== undefined) collection.name = name;
      if (countryIds !== undefined) collection.countryIds = countryIds;
      return collection.save();
    })
    .then((updatedCollection) => res.send(updatedCollection))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERR));
      } else if (err.code === 429) {
        next(new ManyRequestsError(MANY_REQUESTS_ERR));
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
        return next(new NotFoundError(NOT_FOUND_COLLECTION_ERR));
      }
      if (collection.owner.toString() !== userId) {
        return next(new ForbiddenError(FORBIDDEN_ERR));
      }
      return Collection.findByIdAndDelete(collectionId);
    })
    .then(() => res.status(204).send())
    .catch(next);
};

module.exports.addCountryToCollection = async (req, res, next) => {
    try {
        const { collectionId } = req.params;
        const { countryId } = req.body;
        const userId = req.user._id;

        const collection = await Collection.findById(collectionId);
        if (!collection) throw new NotFoundError(NOT_FOUND_COLLECTION_ERR);
        if (collection.owner.toString() !== userId.toString()) throw new ForbiddenError(FORBIDDEN_ERR);

        if (!collection.countryIds.includes(countryId)) {
            collection.countryIds.push(countryId);
            await collection.save();
        }
        res.send(collection);
    } catch (err) {
        next(err);
    }
};

module.exports.deleteCountryFromCollection = async (req, res, next) => {
    try {
        const { collectionId, countryId } = req.params;
        const userId = req.user._id;

        const collection = await Collection.findById(collectionId);
        if (!collection) throw new NotFoundError(NOT_FOUND_COLLECTION_ERR);
        if (collection.owner.toString() !== userId.toString()) throw new ForbiddenError(FORBIDDEN_ERR);

        collection.countryIds = collection.countryIds.filter(id => id !== countryId);
        await collection.save();
        res.send(collection);
    } catch (err) {
        next(err);
    }
};