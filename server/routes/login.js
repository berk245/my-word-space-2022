const express = require("express");

module.exports = function (LoginUser) {
  const router = express.Router();

  router.post("/", LoginUser);

  return router;
};
