const Category = require('../models/category');

module.exports.getCategories = (req, res, next) => {
  Category.find().sort({ order: 1 })
    .then((categories) => res.send(categories))
    .catch(next);
};