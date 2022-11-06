const db = require("../../config/database");

module.exports = async ({ userId, amount }) => {
    try {
      let user = await GetUser.byUserId(userId);
      if (!user) return { error: "Could not find the user" };
  
      let exercise = await db.execute(
        "INSERT INTO `my-word-space`.`Exercise` (`UserID` , `QuestionCount`) VALUES (?, ?)",
        [userId, amount]
      );
      return exercise[0].insertId;
    } catch (err) {
        console.log(err)
      return false;
    }
  };