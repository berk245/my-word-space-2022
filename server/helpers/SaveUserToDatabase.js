const bcrypt = require("bcrypt");
const User = require("../models/User.model");

module.exports = async ({ username, email, password }) => {
  let hashedPassword = await bcrypt.hash(password, 13); //13 refers to the amount of times the password gets rehashed. The larger the number, more secure the hashed password is. But also the algorith takes more time!

  await User.create({
    Username: username,
    Email: email,
    Password: hashedPassword,
  });
};
