const express = require("express");
const router = express.Router();
const getRandomQuestions = require('../helpers/getRandomQuestions')

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
  }

  const beginExercise = async(req,res) => {
    if (!req.body.userId || !req.body.exerciseParameters.amount) {
        res.status(400).json(missingFieldsError);
        return;
      }
    
      const exerciseId = await database.createNewExercise({userId: req.body.userId})
      
      if(!exerciseId){
        res.status(500).json({error: 'Could not create exercise. Please try again later'});
        return;
      }

    //Create word pool
    let questionPool = await database.createQuestionPool(req.body)
    let exerciseQuestions = getRandomQuestions(questionPool, req.body.exerciseParameters.amount)
    //Create a random question list for the exercise
    //Return the question list 

    console.log(exerciseQuestions)

    res.status(200).json(exerciseQuestions)
  }

  const completeExercise = async(req,res) => {
    if (!req.body.userId || !req.body.exerciseId || !req.body.exerciseData) {
        res.status(400).json(missingFieldsError);
        return;
      }
  }

  router.get("/get-all", getUserExercises);
  router.get("/get", getSingleExercise);
  router.post("/begin", beginExercise);
  router.post('/complete', completeExercise )

  return router;
};
