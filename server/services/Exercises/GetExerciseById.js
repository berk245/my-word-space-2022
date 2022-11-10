const db = require("../../config/database");
const GetUser = require("../GetUser");

const Exercise = require("../../models/Exercise.model");

module.exports = async (req, res) => {
  try {
    if (!req.body.userId || !req.body.exerciseId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    let { userId, exerciseId } = req.body;

    const exercise = await Exercise.findOne({
      where: {
        ExerciseID: exerciseId,
        UserID: userId,
      },
    });

    if (!exercise) res.status(400).json({ error: "Could not find the exercise" });
    else res.status(200).json({ exercise: exercise });

    return;
  } catch (err) {
    res.status(400).json({ error: err });
  }

  // try {
  //   if (!req.body.userId || !req.body.exerciseId) {
  //     res.status(400).json({ error: "Missing required fields" });
  //     return;
  //   }
  //   let { userId, exerciseId } = req.body;
  //   let user = await GetUser.byUserId(userId);
  //   if (!user){
  //     res.status(400).json({ error: "Could not find the user" });
  //     return
  //   }

  //   let [exercise] = await db.execute(
  //     `SELECT * FROM Exercise WHERE UserID = ? AND ExerciseID = ? `,
  //     [userId, exerciseId]
  //   );

  //   res.status(200).json({ exercise: exercise });
  // } catch (err) {
  //   res.status(400).json({ error: err });
  // }
};
