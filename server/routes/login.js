const express = require("express");
const validateUserInfo = require("../helpers/validateUserInfo");
const { getUserByEmail, getUserByUsername } = require("../config/database.js");
module.exports = function (database) {
  const router = express.Router();

  const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(500).json({ error: "Missing required fields" });
      return;
    }

    res.status(200).json({ login: true });
  };

  router.post("/", login);

  return router;
};
