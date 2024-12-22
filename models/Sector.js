// models/Sector.js
const mongoose = require('mongoose');

const sectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  backgroundImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  pdf: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Sector', sectorSchema);
