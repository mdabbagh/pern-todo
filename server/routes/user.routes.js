const pool = require("../config/db");
const router = require("express").Router();
const utils = require("../lib/utils");
const passport = require("passport");

// http://localhost:3000/users/login
router.post("/login", async function (req, res, next) {
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      req.body.email,
    ]);

    if (!user) {
      res.status(401).json({ success: false, msg: "could not find user" });
    }

    const isValid = await utils.validPassword(
      req.body.password,
      user.rows[0].password
    );

    if (isValid) {
      const tokenObject = await utils.issueJWT(user.rows[0]);

      res.status(200).json({
        success: true,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    } else {
      res
        .status(401)
        .json({ success: false, msg: "you entered the wrong password" });
    }
  } catch (err) {
    next(err);
  }
});

// http://localhost:3000/users/register
router.post("/register", async function (req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;
    // Check if user exists, if so, send back error
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      res.status(400).json("User already exists");
    } else {
      // If user doesn't exist, create new user
      const hashedPassword = await utils.genPassword(password);
      const newUser = await pool.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING user_id, firstname, lastname, email",
        [firstname, lastname, email, hashedPassword]
      );

      res.status(201).json(newUser.rows[0]);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
  }
);

module.exports = router;
