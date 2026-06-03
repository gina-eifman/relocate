const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');

const storage = new GridFsStorage({
  url: process.env.MONGO_DB,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: Date.now() + '-' + file.originalname,
      bucketName: 'avatars'
    };
  }
});

const upload = multer({ storage });
module.exports = upload;