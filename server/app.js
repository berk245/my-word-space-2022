const express = require("express");
const loginRoute = require("./routes/login.js");
const signupRoute = require("./routes/signup.js");
const wordRoute = require("./routes/word");
const notebookRoute = require("./routes/notebook");
const exerciseRoute = require("./routes/exercise");
const bodyParser = require("body-parser");
const verifyToken = require("./middlewares/verifyToken");
const logRequestInfo = require("./middlewares/logRequestInfo");
const cors = require("cors");
const logger = require('./config/logger')
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(logRequestInfo);
app.use(verifyToken);

app.use("/login", loginRoute());

app.use("/signup", signupRoute());

app.use("/notebook", notebookRoute());

app.use("/word", wordRoute());

app.use("/exercise", exerciseRoute());

app.use("/*", (req, res) => {
  res.status(404).json({ error: "Route does not exist" });
});

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
