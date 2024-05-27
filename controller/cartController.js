const AppError = require('../utils/AppError');
const cartModel = require('../model/cartModel');

exports.getAllCart = async (req, res, next) => {
  try {
    const cart = await cartModel.find();

    res.status(200).json({
      status: 'success',
      data: {
        data: cart,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

exports.createCart = async (req, res, next) => {
  try {
    const body = req.body;

    const cart = await cartModel.create(body);

    res.status(200).json({
      status: 'success',
      data: {
        data: cart,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};
