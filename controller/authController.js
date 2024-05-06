const userModel = require('../model/userModel');
const AppError = require('../utils/AppError');
const utils = require('../utils/response');
const Utilities = require('../utils/utils');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
exports.signUp = async (req, res, next) => {
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

    const token = await utils.createLoggedInToken(user._id);

    utils.sendResponse(200, 'success', token, res);
  } catch (err) {
    next(new AppError(err.message, 404));
  }
};

// TODO -- user login route
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Enter username and password', 404));
  }

  //TODO -- get user from the database using username
  const user = await userModel.findOne({ email: email });

  if (!user) {
    return next(new AppError('Entered username and passwrod are wrong.', 404));
  }

  console.log(password + ' ' + user.password);
  const passwordcheck = await user.comparePassword(password, user.password);
  // TODO -- check user Entered password match with the database password

  if (!passwordcheck) {
    return next(new AppError('Enterd username and password are wrong.', 404));
  }
  // TODO -- create login token
  const token = await utils.createLoggedInToken(user._id);

  // TODO -- finally send the login token to the user
  utils.sendResponse(200, 'success', token, res);
};

exports.protected = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token.startsWith('Bearer')) {
    token = token.split(' ')[1];
  }
  try {
    // TODO -- check there is token in the header or not
    if (!token) {
      return next(
        new AppError('You are not loggedIn! please login to get access', 401)
      );
    }

    // TODO -- Verify the token
    const result = await jwt.verify(token, process.env.SECRET_KEY);

    // TODO -- find user is steel exist or not

    const currunetUser = await userModel.findOne({ _id: result._id });

    if (!currunetUser) {
      return next(
        new AppError(
          "you can't access this route! please signup first to get access",
          401
        )
      );
    }
    req.users = currunetUser;
    next();
  } catch (err) {
    return next(new AppError(err.message, 401));
  }
};

//TODO -- for protection of routes for only some users
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.users.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    return next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      return next(new AppError('please enter the email', 404));
    }

    //TODO 1) -- get user based on the enterd email and generate the random token
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return next(
        new AppError(
          'user not exits with this emaill! please signup first',
          404
        )
      );
    }
    //TODO 2)-- generate the random token
    const resetToken = user.createPasswordResetToken();

    //ERROR
    // await user.save();
    // TODO 3) -- send the reset url on mail
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/user/resetPassword/${resetToken}`;

    const message = `Forgot your password submit a PATCH request with your new password and 
    passwordConfirm to: ${resetURL}. \n if you didn't then ignore this message`;

    await sendEmail({
      email: user.email,
      subject: 'your password reset token (valid upto 10 minutes)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'token sended on email ',
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

exports.resetPassword = (req, res, next) => {};

exports.updatePassword = async (req, res, next) => {
  const data = req.body;
  try {
    // TODO -- Get user from the database with ID
    const user = await userModel.findById({ _id: req.users._id });

    // TODO -- check user exists in the database or not
    if (!user) {
      return next(new AppError('You are not signup yet! Please Signup First'));
    }

    // TODO -- check user current password is match with the user Original password..
    if (!(await user.comparePassword(data.currentPassword, user.password))) {
      return next(
        new AppError(
          'looks like your password is not matched with the current password',
          401
        )
      );
    }

    // TODO -- update the fields in the user
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();

    const token = await utils.createLoggedInToken(user._id);

    res.status(200).json({
      status: 'success',
      message: 'password updated successFully',
      token,
    });
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};
