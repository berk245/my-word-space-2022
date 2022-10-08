const express = require("express");
const validateUserInfo = require("../helpers/validateUserInfo");
const {
  getUserByUsername,
  getUserByEmail,
  saveUserToDatabase,
} = require("../config/database.js");
const router = express.Router();

const signup = async (req, res) => {
  const errors = await validateUserInfo(req.body);
  if (errors) {
    res.status(500).json(errors);
    return;
  }
  const signupSuccess = await saveUserToDatabase(req.body);
  if (signupSuccess) res.status(200).json({ signupSuccess: true });
  else res.status(500).json({ error: "Could not save the user" });

  return;
};

router.post("/", signup);

module.exports = router;
