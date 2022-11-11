const db = require("../../config/database");

const Notebook = require("../../models/Notebook.model");
const GetUser = require("../GetUser")
module.exports = async (req, res) => {
  console.log(req)
  try {
    const user = await GetUser.byUserId(req.params.userId)
    if(!user) {
      res.status(500).json({error: 'Could not find the user'})
      return
    }
    const notebooks = await Notebook.findAll({
      where: {
        CreatorID: req.params.userId,
      },
    });
    res.status(200).json({ notebooks: notebooks });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
