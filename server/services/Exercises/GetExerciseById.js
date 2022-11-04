const db = require("../../config/database");
const GetUser = require("../GetUser");

module.exports = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.exerciseId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    let { userId, exerciseId } = req.body;
    let user = await GetUser.byUserId(userId);
    if (!user) return { error: "Could not find the user" };

    let [exercise] = await db.execute(
      `SELECT * FROM Exercise WHERE UserID = ? AND ExerciseID = ? `,
      [userId, exerciseId]
    );

    res.status(200).json({ exercise: exercise });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
