const db = require("../../config/database");

module.exports = async (req, res) => {
  try {
    if (!req.body.userId) {
      res.status(400).json({error: 'Missing required fields'});
      return;
    }

    let [words] = await db.execute(
      `SELECT * FROM Word WHERE CreatorID = ? AND Status = 'active'`,
      [req.body.userId]
    );
    res.status(200).json({ words: words });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
