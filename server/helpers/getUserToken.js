const bcrypt = require("bcrypt");

module.exports = async function getUserToken(database, { username, password }) {
  try {
    const user = await database.getUserByUsername(username);
    if (!user) return false;

    let isPasswordMatching = await bcrypt.compare(password, user.password);
    if(!isPasswordMatching) return false
  } catch (err) {
    return false;
  }
};
