const GetUser = require('../GetUser')
const db = require("../../config/database");
module.exports = async (req, res) => {

    try {
      if (!req.body.userId || !req.body.notebookName) {
        res.status(400).json(missingFieldsError);
        return;
      }
  
      let {userId, notebookName} = req.body
  
  
      let user = await GetUser.byUserId(userId);
      if (!user) {
        res.status(400).json({ error: "User cannot be found" });
        return;
      }
  
      await db.execute(
        `INSERT INTO notebook (NotebookName, CreatorID) VALUES (?, ?);`,
        [notebookName, userId]
      );
      res.status(200).json({ addNotebookSuccess: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  };