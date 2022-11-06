const getExerciseQuestions = require('../../helpers/getExerciseQuestions')
const createQuestionPool = require('./CreateQuestionPool')
const GetUser = require("../GetUser");
module.exports = async (req, res) => {
  if (
      !req.body.userId ||
      !req.body.exerciseParameters?.amount ||
      !req.body.exerciseParameters?.wordTypes ||
      !req.body.exerciseParameters?.notebooks
    ) {
      res.status(400).json({error: 'Missing required fields'});
      return;
    }


    let user = await GetUser.byUserId(req.body.userId);
    if (!user) res.status(400).json({ error: "Could not find the user" });

    let exerciseQuestions = await getExerciseQuestions(req.body, createQuestionPool);
    if(exerciseQuestions.error){
        res.status(400)
        .json({ error: exerciseQuestions.error });
        return;
    }

    const exerciseId = await CreateNewExercise({
      userId: req.body.userId,
      amount: req.body.exerciseParameters.amount,
    });

    if (!exerciseId) {
      res
        .status(500)
        .json({ error: "Could not create exercise. Please try again later" });
        return
    }

    res
      .status(200)
      .json({ exerciseId: exerciseId, exerciseQuestions: exerciseQuestions });
      return
  };


