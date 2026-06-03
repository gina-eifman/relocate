const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getFavourites,
  addFavourite,
  deleteFavourite,
} = require('../controllers/favourites');
const { auth } = require('../middlewares/auth');

router.get('/', auth, getFavourites);
router.post('/', auth, celebrate({
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), addFavourite);
router.delete('/:id', auth, celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), deleteFavourite);

module.exports = router;