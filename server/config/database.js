const mysql = require("mysql2");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

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

const getUserByUsername = async (database, username) => {
  const [results] = await database.query(
    `SELECT *
    FROM User
    WHERE Username = ?
    `,
    [username]
  );
  return results[0];
};

const getUserByEmail = async (database, email) => {
  const [results] = await database.query(
    `SELECT *
    FROM User
    WHERE email = ?
    `,
    [email]
  );
  return results[0];
};

const saveUserToDatabase = async (database, { username, email, password }) => {
  try{
    let hashedPassword = await bcrypt.hash(password, 13); //13 refers to the amount of times the password gets rehashed. The larger the number, more secure the hashed password is. But also the algorith takes more time!

    await database.query(
      "INSERT INTO `my-word-space`.`User` (`Username`, `Email`, `password`) VALUES (?, ?, ?)",[username, email, hashedPassword]
    );
    return true
  }catch(err){
    console.log(err)
    return false
  }

};

module.exports = {
  database: database,
  getUserByEmail: getUserByEmail,
  getUserByUsername: getUserByUsername,
  saveUserToDatabase: saveUserToDatabase,
};
