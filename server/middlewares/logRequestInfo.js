const logger = require("../config/logger");

module.exports = function (req, res, next) {
  // if (process.env.NODE_ENV !== "production") {
  //   next();
  //   return;
  // }
  logger.log("info", `Requesting ${req.method} ${req.originalUrl}`, {
    tags: "https",
    additionalInfo: { body: req.body },
  });
  next();
};
