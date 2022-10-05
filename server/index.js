const express = require("express");
const bodyParser = require("body-parser");
const getUsers = require("./config/database");

const app = express();

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const users = await getUsers();
  res.send(users);
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
