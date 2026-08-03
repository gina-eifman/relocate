const rateLimit = require('express-rate-limit');
const Joi = require('joi');

module.exports.REQUIRED = 'Required field.';
module.exports.MIN_SYMBOLS = 'Minimum length - 2.';
module.exports.MAX_SYMBOLS = 'Maximum length - 30.';
module.exports.INCORRECT_EMAIL = 'Incorrect email.';
module.exports.CONFLICT_ERR = "The user with this email already exists.";
module.exports.INTERNAL_SERVER_ERR = "Server error. Try again later.";
module.exports.UNAUTHORIZED_ERR = "You are not authorized. Please log in.";
module.exports.NOT_FOUND_ERR = 'Not found. Please try again.';
module.exports.NOT_FOUND_USER_ERR = 'User not found. Please try again.';
module.exports.NOT_FOUND_COLLECTION_ERR = 'Collection not found. Please try again.';
module.exports.NOT_FOUND_FAVOURITE_ERR = 'Favourite not found. Please try again.';
module.exports.BAD_REQUEST_ERR = 'Bad request error. Check the data you sent.';
module.exports.FORBIDDEN_ERR = 'Access denied. You are not authorized to access this resource.';
module.exports.MANY_REQUESTS_ERR = 'Too many requests. Please try again later.';
module.exports.AVATAR_ERR = 'Avatar file is too large. Maximum size is 2 MB.';

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});
module.exports.protocols = {
  protocols: ['http', 'https'],
};
module.exports.regex = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/i;
module.exports.validateId = Joi.string().hex().alphanum();