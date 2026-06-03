const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  addCountryToCollection,
  deleteCountryFromCollection,
} = require('../controllers/collection');
const { auth } = require('../middlewares/auth');

const validateCollectionId = Joi.string().hex().length(24).required();

router.get('/', auth, getCollections);
router.post('/', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(1),
    countryIds: Joi.array().items(Joi.string()),
  }),
}), createCollection);
router.patch('/:collectionId', auth, celebrate({
  params: Joi.object().keys({ collectionId: validateCollectionId }),
  body: Joi.object().keys({
    name: Joi.string().min(1),
    countryIds: Joi.array().items(Joi.string()),
  }),
}), updateCollection);
router.delete('/:collectionId', auth, celebrate({
  params: Joi.object().keys({ collectionId: validateCollectionId }),
}), deleteCollection);
router.post('/:collectionId/countries', auth, celebrate({
  params: Joi.object().keys({ collectionId: validateCollectionId }),
  body: Joi.object().keys({ countryId: Joi.string().required() }),
}), addCountryToCollection);
router.delete('/:collectionId/countries/:countryId', auth, celebrate({
  params: Joi.object().keys({
    collectionId: validateCollectionId,
    countryId: Joi.string().required(),
  }),
}), deleteCountryFromCollection);

module.exports = router;