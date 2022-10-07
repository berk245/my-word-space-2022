import express from 'express';
import database from '../config/database.js'
const router = express.Router();

router.get("/get-user", async (req, res) => {
  const [users] = await database.query("SELECT * FROM User");
  res.status(200).json(users);
});

export default router;
