const logger = require("../../utilities/logger");

function authenticateUser(req, res, next) {
  logger.debug(req.headers["authorization"]);
  if (req.headers["authorization"] !== `Bearer ${process.env.HTTP_ADMIN}`) {
    res.status(401).send("Not authorized for this endpoint.");
    return;
  }
  next();
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}
module.exports = {
  authenticateUser,
  ensureAuthenticated,
};
