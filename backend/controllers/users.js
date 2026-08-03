const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const AvatarError = require('../errors/AvatarError');
const { NOT_FOUND_USER_ERR, BAD_REQUEST_ERR, CONFLICT_ERR, AVATAR_ERR, MANY_REQUESTS_ERR } = require('../utils/constants');
const ConflictError = require('../errors/ConflictError');
const ManyRequestsError = require('../errors/ManyRequestsError');

module.exports.getProfileInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) return next(new NotFoundError(NOT_FOUND_USER_ERR));
      return res.send(user);
    })
    .catch(next);
};

module.exports.editProfileInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, email, phone, age, gender, avatar } = req.body;
  const updateData = {};

  if (name !== undefined) updateData.name = name;
  if (email !== undefined) updateData.email = email;
  if (phone !== undefined) updateData.phone = phone;
  if (age !== undefined) updateData.age = age;
  if (gender !== undefined) updateData.gender = gender;
  if (avatar !== undefined) updateData.avatar = avatar;

  User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
    .then((user) => {
      if (!user) return next(new NotFoundError(NOT_FOUND_USER_ERR));
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError(BAD_REQUEST_ERR));
      } else if (err.code === 11000) {
        return next(new ConflictError(CONFLICT_ERR));
      } else if (err.code === 429) {
        next(new ManyRequestsError(MANY_REQUESTS_ERR));
      } else if (err.code === 413) {
        return next(new AvatarError(AVATAR_ERR));
      } else {
        next(err);
      }
    });
};