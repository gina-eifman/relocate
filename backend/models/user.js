const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  UNAUTHORIZED, REQUIRED, INCORRECT_EMAIL, MIN_SYMBOLS, MAX_SYMBOLS,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, REQUIRED],
    unique: true,
    validate: {
      validator(email) {
        return /^\S+@\S+\.\S+$/.test(email);
      },
      message: INCORRECT_EMAIL,
    },
  },
  password: {
    type: String,
    required: [true, REQUIRED],
    select: false,
  },
  name: {
    type: String,
    required: [true, REQUIRED],
    minLength: [2, MIN_SYMBOLS],
    maxLength: [30, MAX_SYMBOLS],
  },
  phone: {
    type: Number,
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  gender: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(UNAUTHORIZED));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(UNAUTHORIZED));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);