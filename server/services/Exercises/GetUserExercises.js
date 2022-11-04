const db = require('../../config/database')
const GetUser = require('../GetUser')

module.exports = async (req, res) => {
  try {
    if (!req.body.userId) {
      res.status(400).json({ error: "Missing required fields" });
    }



    let user = await GetUser.byUserId(req.body.userId);
    if (!user) return { error: "Could not find the user" };

    let [exercises] = await db.execute(
      `SELECT * FROM Exercise WHERE UserID = ?  `,
      [req.body.userId]
    );
    res.status(200).json({ exercises: exercises });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
