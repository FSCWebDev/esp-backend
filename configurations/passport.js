const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = () => {
  // Uses passport to create a local login strategy
  passport.use(
    new LocalStrategy((username, password, done) => {
      const user = users.find(u => u.username === username);
      if (!user) return done(null, false, { message: "Incorrect username" });

      if (password === user.password) {
        return done(null, user);
      }

      return done(null, false, { message: "Incorrect password" });
      // bcrypt.compare(password, user.password, (err, result) => {
      //   if (err) return done(err);
      //   if (!result) return done(null, false, { message: "Incorrect password." });
      //   return done(null, user);
      // });
    })
  );

  // Compresses the user credentials
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Retrieves the user details easier
  passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
  });
};
