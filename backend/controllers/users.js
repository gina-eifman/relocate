const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { NOT_FOUND, BAD_REQUEST, CONFLICT } = require('../utils/constants');
const ConflictError = require('../errors/ConflictError');

module.exports.getProfileInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) return next(new NotFoundError(NOT_FOUND));
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
      if (!user) return next(new NotFoundError(NOT_FOUND));
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError')
        return next(new BadRequestError(BAD_REQUEST));
      if (err.code === 11000) return next(new ConflictError(CONFLICT));
      next(err);
    });
};