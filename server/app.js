const express = require("express");
const loginRoute = require("./routes/login.js");
const signupRoute = require("./routes/signup.js");
const wordRoute = require('./routes/word')
const notebookRoute = require('./routes/notebook')
const exerciseRoute = require('./routes/exercise')
const bodyParser = require("body-parser");
const verifyToken = require('./helpers/verifyToken')

const cors = require('cors')
const app = express();

module.exports = function (services) {
  app.use(express.json());
  app.use(cors())
  app.use(bodyParser.json());
  app.use(verifyToken)
  app.get("/", async (req, res) => {
    res.status(200).send("This is home");
  });


  app.use("/login", loginRoute(services));

  app.use("/signup", signupRoute(services));

  app.use("/notebook", notebookRoute(services));

  app.use("/word", wordRoute(services));

  app.use("/exercise", exerciseRoute(services));


  return app;
};

