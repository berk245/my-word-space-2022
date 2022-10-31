const express = require("express");
const router = express.Router();

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
    
    query.success ? 
    res.status(200).json({ exercises: query.result }):
    res.status(400).json({error: query.error})

    
  };

  

  router.get("/get-all", getUserExercises);
  router.post("/add", addNewNotebook);
  router.post("/update", editNotebook);
  router.delete("/delete", deleteNotebook);

  return router;
};
