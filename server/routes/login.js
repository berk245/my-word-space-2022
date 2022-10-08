const express = require("express");
const validateUserInfo = require("../helpers/validateUserInfo");
const  getUserToken  = require("../helpers/getUserToken.js");
module.exports = function (database) {
  const router = express.Router();

  const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(500).json({ error: "Missing required fields" });
      return;
    }

    let token = await getUserToken(database, req.body)

    if(!token) {
      res.status(500).json({ error: "Username password combination does not exist." });
      return;
    }
    res.header("token", token)
    res.status(200).json({ loginSuccess: true });
  };

  router.post("/", login);

  return router;
};
