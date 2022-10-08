const { getUserByUsername } = require("../config/database");
const { getUserByEmail } = require("../config/database");
const _ = require("lodash/core");

const isEmailInUse = async (email) => {
  if (!email) return false;
  const user = await getUserByEmail(email);
  return user || false;
};

const isUsernameTaken = async (username) => {
  if (!username) return false;
  const user = await getUserByUsername(username);

  return user || false;
};

module.exports = validateUseriInfo = async ({ username, password, email }) => {
  const errors = {};

  if (!username || !password || !email) errors.missingFieldsError = true;
  if (await isUsernameTaken(username)) errors.existingUsernameError = true;
  if (await isEmailInUse(email)) errors.existingEmailError = true;
  return _.isEmpty(errors) ? false : errors;
};
