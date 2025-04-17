const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  boundaries: {
    type: Array,
    default: []
  },
}, { timestamps: true });

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;