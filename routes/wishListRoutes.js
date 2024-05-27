const express = require('express');
const wishlistController = require('../controller/wishListController');
const authController = require('../controller/authController');

const wishlistRouter = express.Router();

wishlistRouter
  .route('/')
  .post(authController.protected, wishlistController.createWishlist)
  .get(authController.protected, wishlistController.getUserWishlist);

module.exports = wishlistRouter;
