const express = require('express')
const database = require('../config/database.js')
const router = express.Router();

router.get("/get-user", async (req, res) => {
  const [users] = await database.query("SELECT * FROM User");
  res.status(200).json(users);
});

module.exports = router;
