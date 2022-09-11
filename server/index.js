const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "webapp",
  password: "WebAppPass1!",
  database: "my-word-space",
});

app.use(bodyParser.json());
connection.connect((err) => {
  if (err) {
    return console.error("Error:" + err.message);
  }

  console.log("Connected to MySQL server");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Handle Production
if (process.env.NODE_ENV === "production") {
  //Static Folder
  app.use(express.static(__dirname + "/public"));
  //Handle SPA
  app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
