const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required..'],
    trim: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: Date,
});

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;
