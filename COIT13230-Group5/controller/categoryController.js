const categoryModel = require('../model/categoryModel');
const AppError = require('../utils/AppError');

exports.getAllCategory = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();

    res.status(200).json({
      status: 'success',
      data: {
        data: categories,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const body = req.body;

    const category = await categoryModel.create(body);

    res.status(200).json({
      status: 'success',
      data: {
        data: category,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};
