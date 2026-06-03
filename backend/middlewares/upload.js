const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');

const MONGO_URL = process.env.MONGO_DB;

const storage = new GridFsStorage({
  url: MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const filename = buf.toString('hex') + path.extname(file.originalname);
        resolve({
          filename: filename,
          bucketName: 'avatars'
        });
      });
    });
  }
});

const upload = multer({ storage });
module.exports = upload;