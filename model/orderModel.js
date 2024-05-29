const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
      },
    },
  ],

  orderDate: {
    type: Date,
    default: Date.now,
  },

  NameOnCard: {
    type: String,
    required: [true, 'Name on card is required'],
  },

  creditCardNumber: {
    type: String,
    required: [true, 'Credit card number is required'],
  },

  ExpireDate: {
    type: String,
    required: [true, 'Expire date is required'],
  },
  CVV: {
    type: Number,
    required: [true, 'CVV is required'],
  },

  SubTotal: {
    type: Number,
    required: true,
  },

  shippingCost: {
    type: Number,
    required: true,
  },

  Total: {
    type: Number,
    required: true,
  },
});

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products.product',
  }).populate({ path: 'user' });

  next();
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
