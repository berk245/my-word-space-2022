const jwt = require("jsonwebtoken");
const CloudWatch = require("../config/logger");
module.exports = async function getUserTokens(user) {
  try {
    const accessToken = jwt.sign(
      { userId: user.UserID },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    return { accessToken: accessToken };
  } catch (err) {
    CloudWatch.log(
      "error",
      `Error while creating user token:${err}`,
      `userId: ${user.userId}`
    );
    return false;
  }
};
