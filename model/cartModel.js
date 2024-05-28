const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    require: [true, 'please add a product'],
    ref: 'product',
  },

  user: {
    type: mongoose.Types.ObjectId,
    require: [true, 'Please add a user '],
    ref: 'user',
  },

  quantity: {
    type: Number,
    require: [true, 'Please Enter a Product quantity'],
    default: 1,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const cartModel = mongoose.model('cart', cartSchema);

module.exports = cartSchema;
