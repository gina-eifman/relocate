const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { NOT_FOUND, BAD_REQUEST, CONFLICT } = require('../utils/constants');
const ConflictError = require('../errors/ConflictError');
const { getGridFSBucket } = require('../middlewares/gridfs');
const mongoose = require('mongoose');


module.exports.getProfileInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) return next(new NotFoundError(NOT_FOUND));
      return res.send(user);
    })
    .catch(next);
};

module.exports.getAvatar = async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const bucket = getGridFSBucket();
    
    if (!bucket) {
      return res.status(503).json({ message: 'GridFS not ready' });
    }

    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: 'Avatar not found' });
  }
};

module.exports.editProfileInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, email, phone, age, gender } = req.body;
  const updateData = { name, email, phone, age, gender };


  if (name !== undefined) updateData.name = name;
  if (email !== undefined) updateData.email = email;
  if (phone !== undefined) updateData.phone = phone;
  if (age !== undefined) updateData.age = age;
  if (gender !== undefined) updateData.gender = gender;

  
  if (req.file) {
    updateData.avatar = req.file.id; // ObjectId файла в GridFS
  }

  User.findByIdAndUpdate(userId, updateData, {
    runValidators: true,
    new: true,
  })
    .then((user) => {
      if (!user) return next(new NotFoundError(NOT_FOUND));
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST));
      } else if (err.code === 11000) {
        next(new ConflictError(CONFLICT));
      } else {
        next(err);
      }
    });
};