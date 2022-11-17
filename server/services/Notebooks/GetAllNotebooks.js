const Notebook = require("../../models/Notebook.model");
const getUser = require("../../helpers/getUser");
const CloudWatch = require("../../config/logger");

module.exports = async (req, res) => {
  try {
    const user = await getUser.byUserId(req.params.userId);
    if (!user) {
      res.status(404).json({ error: "Could not find the user" });
      return;
    }
    const notebooks = await Notebook.findAll({
      where: {
        CreatorID: req.params.userId,
      },
    });
    res.status(200).json({ notebooks: notebooks });
  } catch (err) {
    CloudWatch.log(
      "error",
      "error in /notebook/get-all",
      `Error details: ${err}`,
      `Request params: ${req.params}`
    );
    res.status(500).send("Server error");
  }
};
