const express = require("express");
const router = express.Router();
const getUserExercises = require("../services/Exercises/getUserExercises");
const GetExerciseById = require("../services/Exercises/GetExerciseById");
const BeginExercise = require("../services/Exercises/BeginExercise");
const CompleteExercise = require("../services/Exercises/CompleteExercise");
module.exports = function () {
  router.get("/get-all", getUserExercises);
  router.get("/get", GetExerciseById);
  router.post("/begin", BeginExercise);
  router.post("/complete", CompleteExercise);

  return router;
};
