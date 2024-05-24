const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true,
    lowercase: true,
    unique: [true, 'Email is alreaday used..'],
    validate: {
      validator: function () {
        return validator.isEmail(this.email);
      },
      message: 'Please provide valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'password must required...'],
    minlength: [8, 'Password should have minimum 8 charecters'],
  },

  confirmPassword: {
    type: String,
    required: [true, 'Please enter confirm Password..'],
    validate: {
      validator: function () {
        return this.password === this.confirmPassword;
      },
      message: 'password and confirm password should be same',
    },
  },
  fullName: {
    type: String,
    required: [true, 'FullName must required...'],
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
    enum: ['male', 'female', 'other'],
    lowercase: true,
  },
  address: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Phone Number Should required'],
    trim: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now().toExponential('number'),
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'staff', 'manager'],
      message: "it's is not valid role",
    },
    default: 'user',
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpire: {
    type: Date,
  },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// TODO -- check if password & confirmPassword are matched undefine Confirmpasswrod
userSchema.pre('save', function (next) {
  if (!(this.password === this.confirmPassword)) {
    return;
  }
  this.confirmPassword = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: 'false' } });

  next();
});

//TODO -- Store hashed passwrod in the Database when user signup
userSchema.pre('save', async function (next) {
  const hashPassword = await bcrypt.hash(
    this.password,
    process.env.SALT_ROUND * 1
  );
  this.password = hashPassword;
  next();
});
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
// TODO -- add Instance method in every document so we Can compare original password and hashed Password while Login
userSchema.methods.comparePassword = async function (
  userpassword,
  hashedPassword
) {
  const result = await bcrypt.compare(userpassword, hashedPassword);

  return result;
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
