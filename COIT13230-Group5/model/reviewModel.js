const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Please enter a rating..'],
      min: [1, 'Rating must be more then one'],
      max: [5, 'Rating must ne less then or equal to 5'],
    },
    review: {
      type: String,
      required: [true, 'Please enter a review message.'],
    },

    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'product',
      required: [true, 'Review must belong to Product'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'Review must belong to User'],
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
