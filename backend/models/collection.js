const mongoose = require('mongoose');
const { REQUIRED } = require('../utils/constants');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, REQUIRED],
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, REQUIRED],
  },
  countryIds: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('collection', collectionSchema);