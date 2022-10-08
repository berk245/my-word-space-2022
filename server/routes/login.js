const express = require("express");

const database = require("../config/database.js");
const router = express.Router();

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(500).json({ error: "Missing required fields" });
    return;
  }

  res.status(200).json({ user_token: "TBD" });
};

router.post("/", loginUser);

module.exports = router;
