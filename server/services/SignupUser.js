const db = require("../config/database");
const bcrypt = require("bcrypt");
const validateSignupData = require("../helpers/validateSignupData");

module.exports = async (req, res) => {
  const errors = await validateSignupData(req.body);
  if (errors) {
    res.status(400).json(errors);
    return;
  }
  try {
    await saveUserToDatabase(req.body);
    res.status(200).json({ signupSuccess: true });
  } catch (err) {
    res.status(500).json({ error: "Could not save the user." + err });
  }
};

const saveUserToDatabase = async ({username, email, password}) => {
  try {
    let hashedPassword = await bcrypt.hash(password, 13); //13 refers to the amount of times the password gets rehashed. The larger the number, more secure the hashed password is. But also the algorith takes more time!

    await db.execute(
      "INSERT INTO `my-word-space`.`User` (`Username`, `Email`, `Password`) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
