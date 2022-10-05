const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();
const database = mysql
  .createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

database.connect((err) => {
  if (err) {
    return console.error("Error:" + err.message);
  }
  console.log("Connected to MySQL server");
});

module.exports = database;
