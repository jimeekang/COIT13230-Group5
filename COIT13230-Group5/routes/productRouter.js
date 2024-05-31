const express = require('express');
const productController = require('../controller/productController');

const productRouter = express.Router();

productRouter
  .route('/')
  .post(productController.createProduct)
  .get(productController.getAllproducts)
  .delete(productController.deleteAllProducts);

productRouter
  .route('/:id')
  .get(productController.getProduct)
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct);

productRouter.post('/add', productController.createProduct);

productRouter
  .route('/category/:categoryName')
  .get(productController.getAllCategoryProducts);

productRouter
  .route('/brand/:brandName')
  .get(productController.getAllBrandProducts);

module.exports = productRouter;
