const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCountries,
  getCountryById,
} = require('../controllers/countries');

router.get('/', getCountries);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), getCountryById);

module.exports = router;