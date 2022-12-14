const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    if (
      process.env.NODE_ENV === "test" ||
      req.path == "/login" ||
      req.path == "/signup"
    ) {
      next();
      return;
    }
    jwt.verify(req.headers.token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({ error: "Not authorized" });
    return;
  }
};
