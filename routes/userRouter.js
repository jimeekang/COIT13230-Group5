const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const userRouter = express.Router();

userRouter.post('/signup', authController.signUp);
userRouter.post('/login', authController.login);

// TODO -- these Funtionality still not added beacuse of some issue
userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.post('/resetPassword', authController.resetPassword);

// TODO -- for updatepassword
userRouter.patch(
  '/updatePassword',
  authController.protected,
  authController.updatePassword
);

//TODO -- update userProfile
userRouter.patch(
  '/updateProfile',
  authController.protected,
  userController.updateProfile
);
userRouter.patch(
  '/deleteMe',
  authController.protected,
  userController.deleteMe
);

userRouter
  .route('/')
  .post(authController.protected, userController.createUser)
  .get(
    authController.protected,
    authController.restrictTo('admin', 'manager'),
    userController.getAllUsers
  );

userRouter.route('/:id').get(userController.getUser);

module.exports = userRouter;
