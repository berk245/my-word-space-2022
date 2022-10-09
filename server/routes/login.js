const express = require("express");
const validateLogin = require("../helpers/validateLogin.js");
const getUserTokens = require("../helpers/getUserTokens.js");
module.exports = function (database) {
  const router = express.Router();

  const login = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).send({ error: "Missing required fields" });
        return;
      }

      let validatedUser = await validateLogin(database, username, password);
      if (!validatedUser) {
        res
          .status(422)
          .send({ error: "Username password combination does not exist." });
        return;
      }

      let { accessToken, refreshToken } = await getUserTokens(validatedUser);
      console.log(accessToken, refreshToken);

      res.status(200).json({
        loginSuccess: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      return;
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ error: err });
      return;
    }
  };

  router.post("/", login);

  return router;
};
