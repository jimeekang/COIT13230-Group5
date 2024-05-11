const express = require('express');
const categoryController = require('../controller/categoryController');

const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .get(categoryController.getAllCategory)
  .post(categoryController.createCategory);

module.exports = categoryRouter;
