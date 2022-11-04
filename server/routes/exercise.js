const express = require("express");
const updateExerciseAndWordStats = require("../helpers/updateExerciseAndWordStats");
const router = express.Router();
const validateExercise = require("../helpers/isExerciseValid");
const isExerciseValid = require("../helpers/isExerciseValid");

const GetUserExercises = require('../services/Exercises/GetUserExercises')
const GetExerciseById = require('../services/Exercises/GetExerciseById')
const BeginExercise = require('../services/Exercises/BeginExercise')


const missingFieldsError = {
  error: "Missing required fields",
};

module.exports = function (database) {
 





  const completeExercise = async (req, res) => {
    try {
      if (!req.body.userId || !req.body.exerciseId || !req.body.exerciseData) {
        res.status(400).json(missingFieldsError);
        return;
      }
      let exerciseValid = await isExerciseValid(database, req.body.exerciseId);
      if (!exerciseValid) {
        res
          .status(400)
          .json({ error: "Exercise does not exist or is already completed" });
        return;
      }
      /*This function does two things to avoid iterating the array two times
      1st iteration to evaluate the user answer and updating the word stats
      2nd iteration to update the exercise data (how many correct answers) 
      Clean up and make it more obvious if possible */
      await updateExerciseAndWordStats(database, req.body);
      res.status(200).send({ exerciseCompletionSuccess: true });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

  router.get("/get-all", GetUserExercises);
  router.get("/get", GetExerciseById);
  router.post("/begin", BeginExercise);
  router.post("/complete", completeExercise);

  return router;
};
