const express = require("express");
const LoginUser = require("../services/LoginUser");

module.exports = function () {
  const router = express.Router();

  router.post("/", LoginUser);

  return router;
};
