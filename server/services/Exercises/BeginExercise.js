const getExerciseQuestions = require("../../helpers/getExerciseQuestions");
const createQuestionPool = require("../../helpers/createQuestionPool");
const createNewExercise = require("../../helpers/createNewExercise");
const getUser = require("../../helpers/getUser");
const CloudWatch = require("../../config/logger");
module.exports = async (req, res) => {
  try {
    if (requestHasMissingFields(req)) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    let user = await getUser.byUserId(req.body.userId);
    if (!user) {
      res.status(400).json({ error: "Could not find the user" });
      return;
    }

    let exerciseQuestions = await getExerciseQuestions(
      req.body,
      createQuestionPool
    );
    if (exerciseQuestions.error) {
      res.status(400).json({ error: exerciseQuestions.error });
      return;
    }

    const exerciseId = await createNewExercise({
      userId: req.body.userId,
      amount: req.body.exerciseParameters.amount,
    });

    if (!exerciseId) {
      res
        .status(500)
        .json({ error: "Could not create exercise. Please try again later" });
      return;
    }
    res
      .status(200)
      .json({ exerciseId: exerciseId, exerciseQuestions: exerciseQuestions });
    return;
  } catch (err) {
    CloudWatch.log(
      "error",
      "error in /exercise/begin",
      `Error details: ${err}`,
      `Request body: ${req.body}`
    );
    res.status(500).send("Server error");
  }
};

const requestHasMissingFields = (req) => {
  return (
    !req.body.userId ||
    !req.body.exerciseParameters?.amount ||
    !req.body.exerciseParameters?.wordTypes ||
    !req.body.exerciseParameters?.notebooks
  );
};
