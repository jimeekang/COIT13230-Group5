const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter a product name.'],
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'please provide some infromation about product.'],
    trim: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, 'please provide a price of the product.'],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, 'please provide a brand name'],
  },
  category: {
    type: String,
    required: [true, 'please peovide a valid category'],
  },
  specifications: {
    type: Object,
    required: [true, 'please provide specifications about products'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'please provide images'],
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quntity'],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be belove 5.0'],
  },

  tag: {
    type: String,
    required: [true, 'please provide some tag related to product'],
  },
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
