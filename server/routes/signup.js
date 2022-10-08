const express = require("express");
const validateUserInfo = require("../helpers/validateUserInfo");
const { saveUserToDatabase } = require("../config/database.js");
module.exports = function (database) {
  const router = express.Router();

  const signup = async (req, res) => {
    const errors = await validateSignupData(database, req.body);
    console.log("Errors", errors);
    if (errors) {
      res.status(500).json(errors);
      return;
    }
    try {
      await database.saveUserToDatabase(req.body);
      res.status(200).json({ signupSuccess: true });
    } catch (err) {
      res.status(500).json({ error: "Could not save the user." + err });
    }
  };

  router.post("/", signup);

  return router;
};
