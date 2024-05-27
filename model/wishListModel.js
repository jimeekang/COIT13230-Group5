const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: Date,
});

wishListSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
  });
  next();
});

const wishListModel = mongoose.model('wishlist', wishListSchema);

module.exports = wishListModel;
