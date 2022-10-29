const express = require('express')
const router = express.Router();

module.exports = function(database){
  const getAllDecks = async(req, res) => {
    const decks = await database.getUserDecks();
    res.status(200).json(decks);
  }

  const getDeck = async(req, res) => {
    const deck = await database.getDeck();
    res.status(200).json(deck);
  }

  router.get("/get-all", getAllDecks);
  router.get("/get", getAllDecks);


  return router
}




