const express = require("express");
const SignupUser = require("../services/SignupUser");

module.exports = function () {
  const router = express.Router();

  router.post("/", SignupUser);

  return router;
};
