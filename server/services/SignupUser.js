const validateSignupData = require("../helpers/validateSignupData");
const saveUserToDatabase = require('../helpers/saveUserToDatabase')
const CloudWatch = require("../config/logger");

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
    CloudWatch.log(
      "error",
      "error in /signup",
       err
    );
    res.status(500).send("Server error");
  }
};

