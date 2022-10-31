const express = require("express");
const checkUserAnswers = require("../helpers/checkUserAnswers");
const router = express.Router();
const getExerciseQuestions = require("../helpers/getExerciseQuestions");

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
    if (!req.body.userId || !req.body.exerciseId || !req.body.exerciseData) {
      res.status(400).json(missingFieldsError);
      return;
    }

    let exerciseResults = checkUserAnswers(database, req.body)

    res.status(200).send(true)
  };

  router.get("/get-all", getUserExercises);
  router.get("/get", getSingleExercise);
  router.post("/begin", beginExercise);
  router.post("/complete", completeExercise);

  return router;
};
