const db = require("../../config/database");

const Notebook = require("../../models/Notebook.model");

module.exports = async (req, res) => {
  try {
    if (!req.body.userId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const notebooks = await Notebook.findAll({
      where: {
        CreatorID: req.body.userId,
      },
    });
    res.status(200).json({ notebooks: notebooks });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
