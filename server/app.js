const express = require("express");
const loginRoute = require("./routes/login.js");
const signupRoute = require("./routes/signup.js");
const wordRoute = require("./routes/word");
const notebookRoute = require("./routes/notebook");
const exerciseRoute = require("./routes/exercise");
const bodyParser = require("body-parser");
const verifyToken = require("./helpers/verifyToken");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(verifyToken);

app.use("/login", loginRoute());

app.use("/signup", signupRoute());

app.use("/notebook", notebookRoute());

app.use("/word", wordRoute());

app.use("/exercise", exerciseRoute());

app.use('/*', (req,res)=>{
  res.status(404).json({error: 'Could not be found'})
})

module.exports = app;
