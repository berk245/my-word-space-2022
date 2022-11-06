const express = require("express");
const router = express.Router();

module.exports = function ({
  GetAllNotebooks,
  AddNotebook,
  EditNotebook,
  DeleteNotebook,
}) {
  router.get("/get-all", GetAllNotebooks);
  router.post("/add", AddNotebook);
  router.post("/edit", EditNotebook);
  router.delete("/delete", DeleteNotebook);

  return router;
};
