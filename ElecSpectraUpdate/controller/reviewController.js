const reviewModel = require('../model/reviewModel');
const AppError = require('../utils/AppError');
const ApiFeatures = require('../utils/apiFeatures');
const { filterObj } = require('../utils/response');

exports.createReview = async (req, res, next) => {
  try {
    const userReview = req.body;

    const review = await reviewModel.create(userReview);

    res.status(200).json({
      status: 'success',
      data: {
        data: review,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

exports.getAllReviews = async (req, res, next) => {
  try {
    const queryObject = req.query;

    const features = new ApiFeatures(
      reviewModel.find().populate('user').populate('product'),
      queryObject
    )
      .filter()
      .sort()
      .limiting()
      .paginate();

    const reviews = await features.query;

    res.status(200).json({
      status: 'success',
      length: reviews.length,
      data: {
        data: reviews,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const id = req.params.id;

    console.log(id);
    const deleted = await reviewModel.findByIdAndDelete({ _id: id });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

exports.getReview = async (req, res, next) => {
  try {
    const id = req.params.id;

    const review = await reviewModel.findById({ _id: id });

    res.status(200).json({
      status: 'success',
      data: {
        data: review,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const filtered = filterObj(update, 'rating', 'review');

    const userCheck = await reviewModel.findById({ _id: id });

    //TODO -- Only review Written by user can Edit the review

    const check = userCheck.checkLoggedInUserReview(userCheck.user, req.users);

    console.log(check);

    if (!check) {
      return next(new AppError('You can not update this review', 400));
    }

    const review = await reviewModel.findByIdAndUpdate({ _id: id }, filtered, {
      new: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        data: review,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};
