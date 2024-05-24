const jwt = require('jsonwebtoken');

exports.tokenVerification = async (token) => {
  console.log(token);
  //   const result = await jwt.verify(
  //     token,
  //     process.env.SECRET_KEY,
  //   );

  //   return result;
};
