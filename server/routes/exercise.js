const express = require("express");
const updateExerciseAndWordStats = require("../helpers/updateExerciseAndWordStats");
const router = express.Router();
const getExerciseQuestions = require("../helpers/getExerciseQuestions");
const validateExercise = require("../helpers/isExerciseValid");
const isExerciseValid = require("../helpers/isExerciseValid");

const missingFieldsError = {
  error: "Missing required fields",
};

module.exports = function (database) {
  const getUserExercises = async (req, res) => {
    if (!req.body.userId) {
      res.status(400).json(missingFieldsError);
      return;
    }
    const query = await database.getUserExercises(req.body.userId);

    query.success
      ? res.status(200).json({ exercises: query.result })
      : res.status(400).json({ error: query.error });
  };

  const getSingleExercise = async (req, res) => {
    if (!req.body.userId || !req.body.exerciseId) {
      res.status(400).json(missingFieldsError);
      return;
    }
    const query = await database.getSingleExercise(req.body);

    query.success
      ? res.status(200).json({ exercise: query.result })
      : res.status(400).json({ error: query.error });
  };

  const beginExercise = async (req, res) => {
    if (
      !req.body.userId ||
      !req.body.exerciseParameters?.amount ||
      !req.body.exerciseParameters?.wordTypes ||
      !req.body.exerciseParameters?.notebooks
    ) {
      res.status(400).json(missingFieldsError);
      return;
    }

    const exerciseId = await database.createNewExercise({
      userId: req.body.userId,
      amount: req.body.exerciseParameters.amount,
    });

    if (!exerciseId) {
      res
        .status(500)
        .json({ error: "Could not create exercise. Please try again later" });
      return;
    }

    let exerciseQuestions = await getExerciseQuestions(database, req.body);

    res
      .status(200)
      .json({ exerciseId: exerciseId, exerciseQuestions: exerciseQuestions });
  };

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

  router.get("/get-all", getUserExercises);
  router.get("/get", getSingleExercise);
  router.post("/begin", beginExercise);
  router.post("/complete", completeExercise);

  return router;
};
