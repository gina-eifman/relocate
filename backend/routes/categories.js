const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');

router.get('/', getCategories);
router.post('/', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string().required(),
    order: Joi.number().optional(),
  }),
}), createCategory);
router.patch('/:categoryId', celebrate({
  params: Joi.object().keys({
    categoryId: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    order: Joi.number(),
  }),
}), updateCategory);
router.delete('/:categoryId', celebrate({
  params: Joi.object().keys({
    categoryId: Joi.string().hex().length(24).required(),
  }),
}), deleteCategory);

module.exports = router;