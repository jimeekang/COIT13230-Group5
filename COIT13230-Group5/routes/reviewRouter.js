const express = require('express');
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');
const reviewRouter = express.Router();

reviewRouter
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protected,
    authController.restrictTo('user'),
    reviewController.createReview
  );

reviewRouter
  .route('/:id')
  .delete(
    authController.protected,
    authController.restrictTo('admin', 'manager'),
    reviewController.deleteReview
  )
  .get(reviewController.getReview)
  .patch(authController.protected, reviewController.updateReview);

module.exports = reviewRouter;
