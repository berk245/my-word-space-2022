const _ = require("lodash/core");
const getUser = require("./getUser");
const passwordValidator = require('../config/passwordValidator')

module.exports = validateSignupData = async ({ username, password, email }) => {
  const errors = {};

  if (!username || !password || !email) {
    errors.missingFieldsError = true;
    return errors;
  }
  else{
    if (await isUsernameTaken(username)) errors.existingUsernameError = true;
    if(!isEmailAddressValid(email)) errors.inValidemailError = true;
    if (await isEmailInUse(email)) errors.existingEmailError = true;
    if (isPasswordWeak(password)) errors.weakPasswordError = true
  }
  
  return _.isEmpty(errors) ? false : errors;
};

const isEmailInUse = async (email) => {
  if (!email) return false;

  const user = await getUser.byEmail(email);
  return user || false;
};

const isUsernameTaken = async (username) => {
  if (!username) return false;
  const user = await getUser.byUsername(username);

  return user || false;
};

function isEmailAddressValid(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function isPasswordWeak(password){
  return !(passwordValidator(password))
}