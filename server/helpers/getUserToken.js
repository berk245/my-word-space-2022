const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
module.exports = async function getUserToken(database, { username, password }) {
  try {
    const user = await database.getUserByUsername(username);
    if (!user) return false;

    let isPasswordMatching = await bcrypt.compare(password, user.password);
    if(!isPasswordMatching) return false

    const token = jwt.sign(user.UserID, process.env.JWT_SECRET)
    return token

  } catch (err) {
    return false;
  }
};
