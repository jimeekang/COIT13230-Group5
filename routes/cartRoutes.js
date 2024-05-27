const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controller/cartController');

cartRouter
  .route('/')
  .get(cartController.getAllCart)
  .post(cartController.createCart);

module.exports = cartRouter;
