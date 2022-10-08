const express = require("express");
const loginRoute = require("./routes/login.js");
const signupRoute = require("./routes/signup.js");
const bodyParser = require("body-parser");
const app = express();
module.exports = function (database) {
  app.use(express.json());
  app.use(bodyParser.json());
  app.get("/", async (req, res) => {
    res.status(200).send("This is home");
  });

  app.use("/login", loginRoute(database));

  app.use("/signup", signupRoute(database));

  return app;
};
