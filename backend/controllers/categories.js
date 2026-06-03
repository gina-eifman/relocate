const Category = require('../models/category');
const BadRequestError = require('../errors/BadRequestError');
const { BAD_REQUEST } = require('../utils/constants');

module.exports.getCategories = (req, res, next) => {
  Category.find().sort({ order: 1 })
    .then((categories) => res.send(categories))
    .catch(next);
};

module.exports.createCategory = (req, res, next) => {
  const { id, name, order } = req.body;
  Category.create({ id, name, order })
    .then((category) => res.status(201).send(category))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports.updateCategory = (req, res, next) => {
  const { categoryId } = req.params;
  const { name, order } = req.body;
  Category.findByIdAndUpdate(categoryId, { name, order }, { new: true, runValidators: true })
    .then((category) => {
      if (!category) {
        throw new NotFoundError(NOT_FOUND);
      }
      res.send(category);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCategory = (req, res, next) => {
  const { categoryId } = req.params;
  Category.findByIdAndDelete(categoryId)
    .then((category) => {
      if (!category) {
        throw new NotFoundError(NOT_FOUND);
      }
      res.send({ message: 'Категория удалена' });
    })
    .catch(next);
};