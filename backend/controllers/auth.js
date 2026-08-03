const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const { BAD_REQUEST_ERR, CONFLICT_ERR, MANY_REQUESTS_ERR } = require('../utils/constants');
const { JWT_SECRET } = require('../utils/config');
const ManyRequestsError = require('../errors/ManyRequestsError');

module.exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERR));
      } else if (err.code === 11000) {
        next(new ConflictError(CONFLICT_ERR));
      } else if (err.code === 429) {
        next(new ManyRequestsError(MANY_REQUESTS_ERR));
      } else {
        next(err);
      }
    });
};

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};