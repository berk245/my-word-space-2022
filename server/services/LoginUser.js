const validateLogin = require("../helpers/validateLogin.js");
const getUserTokens = require("../helpers/getUserTokens.js");
const CloudWatch = require("../config/logger");
module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send({ error: "Missing required fields" });
      return;
    }

    let validatedUser = await validateLogin(username, password);
    if (!validatedUser) {
      res
        .status(422)
        .send({ error: "Username password combination does not exist." });
      return;
    }

    let accessToken = await getUserTokens(validatedUser);
    res.status(200).json({
      loginSuccess: true,
      token: accessToken,
      userId: validatedUser.dataValues.UserID,
      username: username,
    });
    return;
  } catch (err) {
    CloudWatch.log(
      "error",
      `Error in login:${err}`,
      `userId: ${userId}`,      
    );
    res.status(500).send({ error: err.message });
    return;
  }
};
