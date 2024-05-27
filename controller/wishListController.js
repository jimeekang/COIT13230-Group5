const wishListModel = require('../model/wishListModel');
const AppError = require('../utils/AppError');

exports.createWishlist = async (req, res, next) => {
  try {
    const body = { ...req.body };
    body.user = req.users._id;

    const wishlist = await wishListModel.create(body);
    res.status(200).json({
      status: 'success',
      data: {
        data: wishlist,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

exports.getUserWishlist = async (req, res, next) => {
  try {
    const wishlist = await wishListModel.find({ user: req.users._id });

    res.status(200).json({
      status: 'success',
      data: {
        data: wishlist,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};
