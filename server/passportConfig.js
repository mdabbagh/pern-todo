const bcrypt = require("bcrypt");
const pool = require("./config/db");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  console.log("THE USERNAME AND PASSWORD");
  passport.use(
    new localStrategy((email, password, done) => {
      console.log("TRYING TO PASSPORT");
      try {
        pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email],
          (err, user) => {
            if (err) throw err;
            console.log(user.rows);
            if (user.rows.length === 0) {
              console.log("NO USER FOUND");
              return done(null, false);
            }
            bcrypt.compare(password, user.password, (err, result) => {
              if (err) throw err;
              if (result === true) {
                return done(null, user);
              } else {
                return done(null, false);
              }
            });
          }
        );
      } catch (err) {
        console.log(err);
      }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.user_id);
  });

  passport.deserializeUser((user_id, cb) => {
    pool.query(
      "SELECT * FROM users WHERE user_id = $1 RETURNING user_id, email",
      [user_id],
      (err, user) => {
        cb(err, user.rows[0]);
      }
    );
  });
};
