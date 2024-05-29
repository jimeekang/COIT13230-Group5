const express = require('express');

const orderController = require('../controller/orderController');
const authController = require('../controller/authController');
const orderRouter = express.Router();

orderRouter
  .route('/')
  .post(authController.protected, orderController.createOrder)
  .get(orderController.getAllOrder);

module.exports = orderRouter;
