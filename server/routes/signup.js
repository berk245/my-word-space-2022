const express = require("express");

const database = require("../config/database.js");
const router = express.Router();

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    res.status(500).json({ error: "Missing required fields" });
    return;
  }

    res.status(200).json({userToken: 'TBD'});
};

router.post('/', signup)

module.exports = router;
