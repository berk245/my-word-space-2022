const logger = require("../config/logger");

module.exports = function (req, res, next) {
  if (process.env.NODE_ENV === "test") {
    next();
    return;
  }
  logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
    tags: "http",
    additionalInfo: { body: req.body },
  });
  next();
};
