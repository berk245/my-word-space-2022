const express = require("express");
const router = express.Router();

module.exports = function ({
  GetUserExercises,
  GetExerciseById,
  BeginExercise,
  CompleteExercise,
}) {
  router.get("/get-all", GetUserExercises);
  router.get("/get", GetExerciseById);
  router.post("/begin", BeginExercise);
  router.post("/complete", CompleteExercise);

  return router;
};
