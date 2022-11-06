const createQuestionPoolQuery = require("../../helpers/createQuestionPoolQuery");
const db = require("../../config/database");

module.exports = async ({ userId, exerciseParameters }) => {
    let [pool] = await db.execute(
      createQuestionPoolQuery(userId, exerciseParameters)
    );
    return pool || [];
  };