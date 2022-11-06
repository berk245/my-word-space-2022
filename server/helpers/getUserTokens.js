const jwt = require("jsonwebtoken");
module.exports = async function getUserTokens(user) {
  try {
    const accessToken = jwt.sign({userId: user.UserID}, process.env.JWT_SECRET, {expiresIn :  '3d'});
    const refreshToken = jwt.sign(
      user.UserID,
      process.env.REFRESH_TOKEN_SECRET
    );

    return { accessToken: accessToken, refreshToken: refreshToken };
  } catch (err) {
    return false;
  }
};
