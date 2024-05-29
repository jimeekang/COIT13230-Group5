const JWT = require('jsonwebtoken');

// exports.sendResponse = (statusCode, statusMessage, data, user, res) => {
//   res.status(statusCode).send({
//     statusCode,
//     status: statusMessage,
//     data: {
//       data,
//     },
//     user,
//     res,
//   });
// };
exports.sendResponse = (statusCode, statusMessage, data, res) => {
  res.status(statusCode).send({
    statusCode,
    status: statusMessage,
    data,
  });
};

exports.sendError = (statusCode, statusMessage, message, res) => {
  res.status(statusCode).json({
    status: statusMessage,
    message: message,
  });
};

//TODO -- For Generate the Login token

exports.createLoggedInToken = async (id) => {
  const token = await JWT.sign({ _id: id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRE_IN,
  });

  return token;
};

exports.filterObj = function (data, ...allowed) {
  const filteredObj = {};
  Object.keys(data).forEach((el) => {
    if (allowed.includes(el)) {
      filteredObj[el] = data[el];
    }
  });
  console.log(filteredObj);
  return filteredObj;
};
