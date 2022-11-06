const db = require("../../config/database");
module.exports = async ({ userId, amount }) => {
    try {
      let exercise = await db.execute(
        "INSERT INTO `my-word-space`.`Exercise` (`UserID` , `QuestionCount`) VALUES (?, ?)",
        [userId, amount]
      );
      return exercise[0].insertId;
    } catch (err) {
        return false;
    }
  };