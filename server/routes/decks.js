const express = require("express");
const router = express.Router();

const missingFieldsError = {
  error: "Missing required fields",
};

module.exports = function (database) {
  const getAllDecks = async (req, res) => {
    if (!req.body.userId) {
      res.status(400).json(missingFieldsError);
      return;
    }
    res.status(500).json("test");

    // const decks = await database.getUserDecks();
    // res.status(200).json(decks);
  };

  const addNewDeck = async (req, res) => {
    if (!req.body.userId || !req.body.deckName) {
        res.status(400).json(missingFieldsError);
        return;
      }
  };

  const editDeck = async (req, res) => {
    if (!req.body.userId || !req.body.deckId || !req.body.newDeckName) {
        res.status(400).json(missingFieldsError);
        return;
      }
    //parse the request
    // pass it to the db function
    //return result
  };

  const deleteDeck = async (req, res) => {
    if (!req.body.userId || !req.body.deckId) {
        res.status(400).json(missingFieldsError);
        return;
      }
    //parse the request
    // pass it to the db function
    //return result
  };

  router.get("/get-all", getAllDecks);
  router.post("/add", addNewDeck);
  router.post("/edit", editDeck);
  router.delete("/delete", deleteDeck);

  return router;
};
