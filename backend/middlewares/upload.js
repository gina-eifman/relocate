const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');

let storage = null;
let upload = null;

const initUpload = () => {
  if (storage) return upload;
  
  storage = new GridFsStorage({
    db: mongoose.connection.db,
    file: (req, file) => {
      return {
        filename: Date.now() + '-' + file.originalname,
        bucketName: 'avatars'
      };
    }
  });
  
  upload = multer({ storage });
  return upload;
};

module.exports = { initUpload };