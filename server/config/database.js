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

const getUserByUsername = async(username) => {
  const [results] = await database.query(
    `SELECT *
    FROM User
    WHERE Username = ?
    `, [username]
    )
    return results[0]
}

const getUserByEmail = async(email) => {
  const [results] = await database.query(
    `SELECT *
    FROM User
    WHERE email = ?
    `, [email]
    )
    return results[0]
}

module.exports = {
  database: database,
  getUserByEmail: getUserByEmail,
  getUserByUsername: getUserByUsername,
};
