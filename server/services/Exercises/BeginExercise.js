const getExerciseQuestions = require("../../helpers/getExerciseQuestions");
const createQuestionPool = require("../../helpers/createQuestionPool");
const createNewExercise = require("../../helpers/createNewExercise");
const getUser = require("../../helpers/getUser");
const CloudWatch = require("../../config/logger");
module.exports = async (req, res) => {
  try {
    let {exerciseParameters} = req.body

    if (requestHasMissingFields(exerciseParameters)) {
      res.status(400).json({ error: "Missing or invalid required fields" });
      return;
    }

    let user = await getUser.byUserId(req.userId);
    if (!user) {
      res.status(404).json({ error: "Could not find the user" });
      return;
    }

    let exerciseQuestions = await getExerciseQuestions(
      exerciseParameters,
      req.userId,
      createQuestionPool
    );
    if (exerciseQuestions.error) {
      res.status(500).json({ error: exerciseQuestions.error });
      return;
    }

    const exerciseId = await createNewExercise({
      userId: req.userId,
      amount: exerciseParameters.amount,
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

const requestHasMissingFields = (params) => {
  return (
    !params.amount ||
    +params.amount < 0 ||
    !params.wordTypes ||
    !params.notebooks
  );
};


