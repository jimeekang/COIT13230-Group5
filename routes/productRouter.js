const express = require('express');
const productController = require('../controller/productController');
const authController = require('../controller/authController');

const productRouter = express.Router();

productRouter
  .route('/')
  .post(
    authController.protected,
    authController.restrictTo('admin', 'manager'),
    productController.createProduct
  )
  .get(productController.getAllproducts)
  .delete(productController.deleteAllProducts);

productRouter
  .route('/:id')
  .get(productController.getProduct)
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct);

module.exports = productRouter;
