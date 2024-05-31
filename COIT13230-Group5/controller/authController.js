const userModel = require('../model/userModel');
const AppError = require('../utils/AppError');
const utils = require('../utils/response');
const Utilities = require('../utils/utils');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
const { appendFile } = require('fs');

exports.signUp = async (req, res, next) => {
  let user = ({
    email,
    password,
    confirmPassword,
    fullName,
    gender,
    address,
    phoneNumber,
    registrationDate,
    role,
  } = req.body);

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    user = await userModel.create({
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

    res.redirect('/loginPage');
  } catch (err) {
    return next(new AppError(err.message, 404));
  }
};

// TODO -- user login route
exports.login = async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ statusCode: 400, message: 'Enter email and password' });
  }

  const user = await userModel.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ statusCode: 404, message: 'User not found' });
  }

  const passwordCheck = await user.comparePassword(password, user.password);

  if (!passwordCheck) {
    return res
      .status(401)
      .json({ statusCode: 401, message: 'Invalid password' });
  }

  if (role === 'admin' && user.role !== 'admin') {
    return res
      .status(403)
      .json({ statusCode: 403, message: 'Access denied for non-admin users' });
  }

  const token = await utils.createLoggedInToken(user._id);

  res.cookie('auth_token', token);
  const loginUser = await userModel.findOne({ email });
  res.status(200).json({
    statusCode: 200,
    message: 'Login successful',
    data: { token, user: loginUser },
  });
};

exports.logout = async (req, res, next) => {
  // Remove the auth_token cookie
  res.cookie('auth_token', '', { expires: new Date(0) });
  utils.sendResponse(200, 'Logout successful', null, res);
};

exports.protected = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.auth_token) {
    token = req.cookies.auth_token;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    const currentUser = await userModel.findById(decoded._id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    req.users = currentUser;
    next();
  } catch (err) {
    return next(new AppError('Invalid token. Please log in again!', 401));
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
