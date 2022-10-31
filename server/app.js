const express = require("express");
const loginRoute = require("./routes/login.js");
const signupRoute = require("./routes/signup.js");
const wordRoute = require('./routes/word')
const notebookRoute = require('./routes/notebook')
const exerciseRoute = require('./routes/exercise')
const bodyParser = require("body-parser");

const cors = require('cors')
const app = express();
module.exports = function (database) {
  app.use(express.json());
  app.use(cors())
  app.use(bodyParser.json());
  app.get("/", async (req, res) => {
    res.status(200).send("This is home");
  });


  app.use("/login", loginRoute(database));

  app.use("/signup", signupRoute(database));

  app.use("/notebook", notebookRoute(database));

  app.use("/word", wordRoute(database));

  app.use("/exercise", exerciseRoute(database));


  return app;
};
