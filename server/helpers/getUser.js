const db = require("../config/database");
const User = require('../models/User.model')


const byUsername = async (username) => {
  const result = await User.findOne({
    where: {
      Username: username
    }
  })
  return result
};

const byUserId = async (userId) => {
  const result = await User.findOne({
    where: {
      UserID: userId
    }
  })
  return result
};

const byEmail = async (email) => {
  const result = await User.findOne({
    where: {
      Email: email
    }
  })
  return result
};

module.exports = {
  byEmail,
  byUsername,
  byUserId,
};
