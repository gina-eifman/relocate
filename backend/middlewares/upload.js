const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;
const conn = mongoose.connection;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('avatars');
});

const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = { upload, gfs, conn };