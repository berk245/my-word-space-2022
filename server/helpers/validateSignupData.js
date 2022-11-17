const _ = require("lodash/core");
const getUser = require("./getUser");

module.exports = validateSignupData = async ({ username, password, email }) => {
  const errors = {};

  if (!username || !password || !email) {
    errors.missingFieldsError = true;
    return errors;
  }
  if (await isUsernameTaken(username)) errors.existingUsernameError = true;
  if (await isEmailInUse(email)) errors.existingEmailError = true;

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
