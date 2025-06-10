const passport = require("passport");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

function logOut(req, res) {
  req.logout(() => {
    res.redirect("/");
  });
}

module.exports = {
  authenticateUser: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  ensureAuthenticated,
  logOut,
};
