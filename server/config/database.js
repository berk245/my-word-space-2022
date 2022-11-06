const mysql = require("mysql2");
const path = require('path')

require("dotenv").config({path: path.join(__dirname, '..', '.env')})

module.exports = mysql
  .createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();



