const mongoose = require('mongoose');
let gridFSBucket;

const initGridFS = () => {
  if (!gridFSBucket && mongoose.connection.db) {
    gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'avatars'
    });
  }
  return gridFSBucket;
};

const getGridFSBucket = () => {
  if (!gridFSBucket) {
    return initGridFS();
  }
  return gridFSBucket;
};

module.exports = { getGridFSBucket };