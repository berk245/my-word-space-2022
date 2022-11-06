const db = require("../config/database");
const bcrypt = require("bcrypt");

module.exports = async ({ username, email, password }) => {
  let hashedPassword = await bcrypt.hash(password, 13); //13 refers to the amount of times the password gets rehashed. The larger the number, more secure the hashed password is. But also the algorith takes more time!
  await db.execute(
    "INSERT INTO `my-word-space`.`User` (`Username`, `Email`, `Password`) VALUES (?, ?, ?)",
    [username, email, hashedPassword]
  );
};
