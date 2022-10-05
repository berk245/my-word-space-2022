const express = require("express");
const router = express.Router();
const database = require("../config/database");

router.get("/get-user", async (req, res) => {
  const [users] = await database.query("SELECT * FROM User");
  res.status(200).send(users);
});

module.exports = router;
