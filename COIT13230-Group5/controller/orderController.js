const orderModel = require('../model/orderModel');
const AppError = require('../utils/AppError');

exports.createOrder = async (req, res, next) => {
  try {
    const body = { ...req.body };
    body.user = req.users._id;

    const order = await orderModel.create(body);
    res.status(201).json({
      status: 'Success',
      data: {
        order,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

exports.getAllOrder = async (req, res, next) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json({
      status: 'Success',
      data: {
        orders,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};
