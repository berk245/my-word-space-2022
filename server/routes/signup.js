const express = require("express");
const _ = require('lodash/core')

const {
  database,
  getUserByUsername,
  getUserByEmail,
} = require("../config/database.js");
const router = express.Router();

const isUsernameTaken = async (username) => {
  if (!username) return false;
  const user = await getUserByUsername(username);

  return user || false;
};
const isEmailInUse = async (email) => {
  if (!email) return false;
  const user = await getUserByEmail(email);
  return user || false;
};

const checkUserInfo = async (req) => {
  const errors = {};
  const { username, email, password } = req.body;

  if (!username || !password || !email) errors.missingFieldsError = true;
  if (await isUsernameTaken(username)) errors.existingUsernameError = true;
  if (await isEmailInUse(email)) errors.existingEmailError = true;
  return _.isEmpty(errors) ? false : errors;
};

const signup = async (req, res) => {
  const errors = await checkUserInfo(req);
  if (errors) {
    res.status(500).json(errors);
    return;
  }
  res.status(200).json({ userToken: "TBD" });

  //check if the email is already in use
  //check if the username is already taken

  //?hash the password
  //save the user in the database
  //send back a success message

};

router.post("/", signup);

module.exports = router;
