const db = require("../config/database");

const byUsername = async (username) => {
  const [results] = await db.execute(
    `SELECT *
      FROM User
      WHERE Username = ?
      `,
    [username]
  );
  return results[0];
};

const byUserId = async (userId) => {
  const [results] = await db.execute(
    `SELECT *
      FROM User
      WHERE UserID = ?
      `,
    [userId]
  );
  return results[0];
};

const byEmail = async (email) => {
  const [results] = await db.execute(
    `SELECT *
      FROM User
      WHERE email = ?
      `,
    [email]
  );
  return results[0];
};

module.exports = {
  byEmail,
  byUsername,
  byUserId,
};
