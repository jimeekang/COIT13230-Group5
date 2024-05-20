const mongoose = require('mongoose');
const User = require('./userModel');
const Product = require('./productModel');

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Please enter a rating.'],
      min: [1, 'Rating must be more than one'],
      max: [5, 'Rating must be less than or equal to 5'],
    },
    reviewTitle: {
      type: String,
      required: [true, 'Please enter a review message.'],
    },
    reviewDescription: {
      type: String,
      required: [true, 'Please enter a review message.'],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: Product,
      required: [true, 'Review must belong to a Product'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: [true, 'Review must belong to a User'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
  });
  next();
});

reviewSchema.pre('findOneAndUpdate', function (next) {
  this._update.updatedAt = new Date(); // Update updatedAt field to current date/time
  next();
});

reviewSchema.methods.checkLoggedInUserReview = function (
  reviewUser,
  loggedInUser
) {
  if (JSON.stringify(reviewUser._id) === JSON.stringify(loggedInUser._id)) {
    return true;
  }

  return false;
};

const reviewModel = mongoose.model('review', reviewSchema);

module.exports = reviewModel;
