const express = require("express");
const _ = require('lodash/core')

const {
  getUserByUsername,
  getUserByEmail,
  saveUserToDatabase
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
const checkUserInfo = async ({username, password, email}) => {
  const errors = {};

  if (!username || !password || !email) errors.missingFieldsError = true;
  if (await isUsernameTaken(username)) errors.existingUsernameError = true;
  if (await isEmailInUse(email)) errors.existingEmailError = true;
  return _.isEmpty(errors) ? false : errors;
};
const signup = async (req, res) => {
  const errors = await checkUserInfo(req.body);
  if (errors) {
    res.status(500).json(errors);
    return;
  }
  
  const signupSuccess = await saveUserToDatabase(req.body)

  if(signupSuccess) res.status(200).json({ signupSuccess: true });
  else res.status(500).json({error: 'Could not save the user'})

  return
};

router.post("/", signup);

module.exports = router;
