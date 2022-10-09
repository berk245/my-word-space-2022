const jwt = require("jsonwebtoken");
module.exports = async function getUserTokens(user) {
  try {
    const accessToken = jwt.sign(user.UserID, process.env.JWT_SECRET);
    const refreshToken = jwt.sign(
      user.UserID,
      process.env.REFRESH_TOKEN_SECRET
    );

    return { accessToken: accessToken, refreshToken: refreshToken };
  } catch (err) {
    console.log(err);
    return false;
  }
};
