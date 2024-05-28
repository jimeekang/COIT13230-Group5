const express = require('express');
const authController = require('../controller/authController');
const orderController = require('../controller/orderController');

const orderRouter = express.Router();

orderRouter.get(
  '/checkout-session/:productID',
  authController.protected,
  orderController.getCheckoutSession
);

module.exports = orderRouter;
