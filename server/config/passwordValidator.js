const validator = require("password-validator");

const passwordValidator = (password) => {
  const passwordSchema = new validator()
    .is()
    .min(8)
    .is()
    .max(100)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(1)
    .has()
    .not()
    .spaces();
  return passwordSchema.validate(password);
};

module.exports = passwordValidator;
