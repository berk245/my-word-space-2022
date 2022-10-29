const express = require('express')
const router = express.Router();

module.exports = function(database){
  const findUser = async(req, res) => {
    const user = await database.getUserById(req.body.userId);
    res.status(200).json(user);
  }

  router.get("/get-user", findUser);

  return router
}




