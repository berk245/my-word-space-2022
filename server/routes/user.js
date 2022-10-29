const express = require('express')
const router = express.Router();

module.exports = function(database){
  const getUser = async(req, res) => {
    const users = await database.getAllUsers();
    res.status(200).json(users);
  }

  router.get("/get-user", getUser);

  return router
}




