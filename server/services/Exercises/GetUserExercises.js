const db = require("../../config/database");
const GetUser = require("../../helpers/GetUser");

const Exercise = require("../../models/Exercise.model");

module.exports = async (req, res) => {
  try {
    if (!req.body.userId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    let user = await GetUser.byUserId(req.body.userId);
    if (!user) {
      res.status(400).json({ error: "Could not find the user" });
      return;
    }
    const exercises = await Exercise.findAll({
      where: {
        UserID: req.body.userId,
      },
    });
    res.status(200).json({ exercises: exercises });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
