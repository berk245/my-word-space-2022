const express = require("express");

module.exports = function (SignupUser) {
  const router = express.Router();

  router.post("/", SignupUser);

  return router;
};
