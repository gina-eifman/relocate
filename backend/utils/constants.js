const rateLimit = require('express-rate-limit');
const Joi = require('joi');

module.exports.CREATED_STATUS = 201;
module.exports.INTERNAL_SERVER = 'internal server';
module.exports.UNAUTHORIZED = 'authorization problem';
module.exports.NOT_FOUND = 'not found';
module.exports.BAD_REQUEST = 'bad request';
module.exports.FORBIDDEN = 'forbidden';
module.exports.CONFLICT = 'user exists';
module.exports.REQUIRED = 'required field';
module.exports.MIN_SYMBOLS = 'minimal length - 2';
module.exports.MAX_SYMBOLS = 'maximal length - 30';
module.exports.INCORRECT_EMAIL = 'incorrect email';
module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});
module.exports.protocols = {
  protocols: ['http', 'https'],
};
module.exports.regex = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/i;
module.exports.validateId = Joi.string().hex().alphanum();