const mongoose = require('mongoose');
const { REQUIRED } = require('../utils/constants');

const favouriteSchema = new mongoose.Schema({
  countryId: {
    type: String,
    required: [true, REQUIRED],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, REQUIRED],
  },
}, {
  timestamps: true,
});

// Уникальность: один пользователь не может добавить одну страну в избранное дважды
favouriteSchema.index({ owner: 1, countryId: 1 }, { unique: true });

module.exports = mongoose.model('favourite', favouriteSchema);