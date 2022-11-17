const getUser = require("../../helpers/getUser");
const Exercise = require("../../models/Exercise.model");
const CloudWatch = require("../../config/logger");

module.exports = async (req, res) => {
  try {
    if (!req.body.userId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    let user = await getUser.byUserId(req.body.userId);
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
    CloudWatch.log(
      "error",
      "error in /exercise/get",
      `Error details: ${err}`,
      `Request body: ${req.body}`
    );
    res.status(500).send("Server error");
  }
};
