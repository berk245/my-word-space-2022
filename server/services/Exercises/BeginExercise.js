const db = require("../../config/database");
const getExerciseQuestions = require('../../helpers/getExerciseQuestions')
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

    let exerciseQuestions = await getExerciseQuestions(req.body);
    if(exerciseQuestions.error){
        res.status(400)
        .json({ error: exerciseQuestions.error });
    }

    const exerciseId = await createNewExercise({
      userId: req.body.userId,
      amount: req.body.exerciseParameters.amount,
    });

    if (!exerciseId) {
      res
        .status(500)
        .json({ error: "Could not create exercise. Please try again later" });
    }

    res
      .status(200)
      .json({ exerciseId: exerciseId, exerciseQuestions: exerciseQuestions });
  };


  const createNewExercise = async ({ userId, amount }) => {
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