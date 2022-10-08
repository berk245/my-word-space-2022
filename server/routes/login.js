const express = require("express");
const validateUserInfo = require("../helpers/validateUserInfo");
const {
  getUserByEmail,
  getUserByUsername
} = require("../config/database.js");
module.exports = function (database) {
  const router = express.Router();

  const login = async (req, res) => {
    const errors = await validateUserInfo(database, req.body);
    console.log('Errors', errors)
    if (errors) {
      res.status(500).json(errors);
      return;
    }
    res.status(200).json({ signupSuccess: true });

  };

  router.post("/", login);

  return router;
};