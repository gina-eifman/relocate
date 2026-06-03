const mongoose = require('mongoose');
const { REQUIRED } = require('../utils/constants');

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, REQUIRED],
    unique: true,
  },
  name: {
    type: String,
    required: [true, REQUIRED],
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('category', categorySchema);