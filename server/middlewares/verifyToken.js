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
    let {userId} = jwt.verify(req.headers.token, process.env.JWT_SECRET);
    req.userId = userId
    next();
  } catch (err) {
    res.status(403).json({ error: "Not authorized" });
    return;
  }
};
