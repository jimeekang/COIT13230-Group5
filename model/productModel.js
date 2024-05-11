const mongoose = require('mongoose');
const categoryModel = require('../model/categoryModel');

const productSchema = new mongoose.Schema(
  {
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
    category: {
      type: Object,
      required: [true, 'category Field is required..'],
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre('save', async function (next) {
  const data = this.category;

  const categoryDoc = await categoryModel.findById({ _id: data });

  this.category = categoryDoc;

  next();
});

// Virtual populate
productSchema.virtual('reviews', {
  ref: 'review',
  foreignField: 'product',
  localField: '_id',
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
