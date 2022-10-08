const _ = require("lodash/core");

const isEmailInUse = async (database, email) => {
  if (!email) return false;
  const user = await database.getUserByEmail(email);
  console.log(user)
  return user || false;
};

const isUsernameTaken = async (database, username) => {
  if (!username) return false;
  const user = await database.getUserByUsername(username);
  console.log(user)

  return user || false;
};

module.exports = validateSignupData = async (
  database,
  { username, password, email }
) => {
  const errors = {};

  console.log(database)

  if (!username || !password || !email) {
    errors.missingFieldsError = true;
    return errors;
  }
  if (await isUsernameTaken(database, username))
    errors.existingUsernameError = true;
  if (await isEmailInUse(database, email)) errors.existingEmailError = true;

  return _.isEmpty(errors) ? false : errors;
};
