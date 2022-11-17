const jwt = require("jsonwebtoken");
module.exports = async function getUserTokens(user) {
  const accessToken = jwt.sign(
    { userId: user.UserID },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
  return accessToken;
};
