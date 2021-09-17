const pool = require("../config/db");
const router = require("express").Router();
const utils = require("../lib/utils");
const passport = require("passport");

// http://localhost:3000/users/login
router.post("/login", async function (req, res) {
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      req.body.email,
    ]);

    if (user.rowCount == 0) {
      res.status(401).json({ success: false, msg: "could not find user" });
    } else {
      const isValid = await utils.validPassword(
        req.body.password,
        user.rows[0].password
      );

      if (isValid) {
        const tokenObject = await utils.issueJWT(user.rows[0]);
        // Remove password field before returning user object
        delete user.rows[0]["password"];

        res.status(200).json({
          user: user.rows[0],
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// http://localhost:3000/users/register
router.post("/register", async function (req, res) {
  try {
    console.log("IN REGISTER");
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

      const tokenObject = await utils.issueJWT(newUser.rows[0]);

      res.status(201).json({
        user: newUser.rows[0],
        success: true,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
        id,
      ]);

      res.json(user.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
