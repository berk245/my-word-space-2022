const _ = require("lodash/core");

const isEmailInUse = async (database, email) => {
  if (!email) return false;
  const user = await database.getUserByEmail(email);
  return user || false;
};

const isUsernameTaken = async (database, username) => {
  if (!username) return false;
  const user = await database.getUserByUsername(username);

  return user || false;
};

module.exports = validateUseriInfo = async (
  database,
  { username, password, email }
) => {
  const errors = {};

  if (!username || !password || !email) errors.missingFieldsError = true;
  else {
    if (await isUsernameTaken(database, username))
      errors.existingUsernameError = true;
    if (await isEmailInUse(database, email)) errors.existingEmailError = true;
  }

  return _.isEmpty(errors) ? false : errors;
};
