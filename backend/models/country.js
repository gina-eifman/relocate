const mongoose = require('mongoose');
const { REQUIRED } = require('../utils/constants');

const sectionItemSchema = new mongoose.Schema({
  header: { type: String, required: [true, REQUIRED] },
  text: { type: String, required: [true, REQUIRED] },
});

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: [true, REQUIRED] },
  items: [sectionItemSchema],
});

const countrySchema = new mongoose.Schema({
  id: { type: String, required: [true, REQUIRED], unique: true },
  name: { type: String, required: [true, REQUIRED] },
  sections: [sectionSchema],
  backgroundImage: { type: String, required: [true, REQUIRED] },
  icon: { type: String, required: [true, REQUIRED] },
  shortDescription: { type: String, required: [true, REQUIRED] },
  flag: { type: String, required: [true, REQUIRED] },
  categories: [{ type: String }],
  keywords: [{ type: String }],
  continent: { type: String },
  region: { type: String },
  climate: { type: String },
  costOfLiving: { type: String },
  safety: { type: Number, min: 1, max: 5 },
  digitalization: { type: Number, min: 1, max: 5 },
}, {
  timestamps: true,
});

module.exports = mongoose.model('country', countrySchema);