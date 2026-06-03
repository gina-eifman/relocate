const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { NOT_FOUND, BAD_REQUEST, CONFLICT } = require('../utils/constants');
const ConflictError = require('../errors/ConflictError');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;
const conn = mongoose.connection;

// Функция для получения gfs
const getGfs = () => {
  if (!gfs && conn.db) {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('avatars');
  }
  return gfs;
};

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
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'avatars' });
    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);
  } catch (err) {
    res.status(404).json({ message: 'Avatar not found' });
  }
};

module.exports.editProfileInfo = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, email, phone, age, gender } = req.body;
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (age !== undefined) updateData.age = age;
    if (gender !== undefined) updateData.gender = gender;

    // Если есть файл, сохраняем в GridFS
    if (req.file) {
      const gfs = getGfs();
      if (!gfs) {
        return res.status(503).json({ message: 'GridFS not ready' });
      }

      const filename = Date.now() + '-' + req.file.originalname;
      const writeStream = gfs.createWriteStream({
        filename: filename,
        bucketName: 'avatars'
      });
      
      writeStream.write(req.file.buffer);
      writeStream.end();
      
      // Ждём завершения загрузки файла
      writeStream.on('finish', async () => {
        updateData.avatar = writeStream.id;
        
        const user = await User.findByIdAndUpdate(userId, updateData, {
          runValidators: true,
          new: true,
        });
        
        if (!user) return next(new NotFoundError(NOT_FOUND));
        return res.send(user);
      });
      
      writeStream.on('error', next);
    } else {
      // Нет файла — просто обновляем пользователя
      const user = await User.findByIdAndUpdate(userId, updateData, {
        runValidators: true,
        new: true,
      });
      
      if (!user) return next(new NotFoundError(NOT_FOUND));
      return res.send(user);
    }
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError(BAD_REQUEST));
    } else if (err.code === 11000) {
      next(new ConflictError(CONFLICT));
    } else {
      next(err);
    }
  }
};