const { celebrate, Joi } = require('celebrate');

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateEditProfileInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.number().optional().allow(null),
    age: Joi.number().optional().allow(null),
    gender: Joi.string().optional().allow(''),
    avatar: Joi.string().optional().allow(''),
  }),
});