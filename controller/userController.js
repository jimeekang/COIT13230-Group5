const userModel = require('../model/userModel.js');
const AppError = require('../utils/AppError.js');
const Utilities = require('../utils/response.js');

// TODO -- For upadte user Profile
exports.updateProfile = async (req, res, next) => {
  try {
    if (req.body.password || req.body.confirmPassword) {
      return next(new AppError("You can't update password Here", 400));
    }

    // TODO -- Filter user updated data because i don't want user to updtae role property
    const filterBody = Utilities.filterObj(
      req.body,
      'fullName',
      'email',
      'gender',
      'address',
      'phoneNumber'
    );

    // TODO -- finally update a user and send the result

    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: req.users._id },
      filterBody,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Profile updated SuccessFully',
      data: {
        data: updatedUser,
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

exports.deleteMe = async (req, res, next) => {
  try {
    const deleteUser = await userModel.findByIdAndUpdate(req.users._id, {
      active: false,
    });

    res.status(204).json({
      status: 'success',
      json: {
        message: 'user Deleted',
        data: 'null',
      },
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

// TODO -- For Admin -  create User Handler
exports.createUser = async (req, res, next) => {
  const {
    email,
    password,
    confirmPassword,
    fullName,
    gender,
    address,
    phoneNumber,
    registrationDate,
    role,
  } = req.body;

  try {
    const user = await userModel.create({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      fullName: fullName,
      gender: gender,
      address: address,
      phoneNumber: phoneNumber,
      registrationDate: registrationDate,
      role: role,
    });

    Utilities.sendResponse(200, 'Success', user, res);
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

// TODO -- For Admin - Get All User Handler
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();

    console.log(users);
    Utilities.sendResponse(200, 'Success', users, res);
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

// TODO -- get one user
exports.getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userModel.findOne({ _id: id });

    if (!user) {
      return next(new AppError('user not exists', 404));
    }

    Utilities.sendResponse(200, 'success', user, res);
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};
