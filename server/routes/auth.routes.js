const pool = require("../config/db");
const router = require("express").Router();
const utils = require("../lib/utils");

router.post("/login", async function (req, res) {
  try {
    const user = await pool.query('SELECT * FROM "user" WHERE email = $1', [
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

        const refreshToken = await utils.issueJWT(user.rows[0], "10m");

        // Create httpOnly cookie to store the refresh token
        res.cookie("refresh_token", refreshToken, {
          expiresIn: "10m",
          domain: "localhost",
          path: "/",
          httpOnly: true,
          secure: true, // False for dev, but should be true in production
          sameSite: "None",
        });

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

// TODO: Handle scenario where insert to user db fails, then don't run saving the refresh token
router.post("/register", async function (req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;
    // Check if user exists, if so, send back error
    const existingUser = await pool.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );
    if (existingUser.rows.length > 0) {
      res.status(400).json("User already exists");
    } else {
      // If user doesn't exist, create new user
      const hashedPassword = await utils.genPassword(password);
      const newUser = await pool.query(
        'INSERT INTO "user" (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING user_id, firstname, lastname, email',
        [firstname, lastname, email, hashedPassword]
      );

      // Generate new access and refresh tokens
      const accessToken = await utils.issueJWT(newUser.rows[0]);
      const refreshToken = await utils.issueJWT(newUser.rows[0], "10m");

      // Create httpOnly cookie to store the refresh token
      res.cookie("refresh_token", refreshToken, {
        expiresIn: "10m",
        domain: "localhost",
        httpOnly: true,
        secure: false, // False for dev, but should be true in production
        sameSite: "none",
      });

      // Send response with access token in the body
      res.status(201).json({
        user: newUser.rows[0],
        success: true,
        token: accessToken.token,
      });
    }
  } catch (err) {
    res.status(400).json("Something went wrong");
    console.log(err);
  }
});

router.get("/refresh_token", async function (req, res) {
  try {
    const refreshToken = req.cookies["refresh_token"];
    if (!refreshToken) {
      res.status(401).json("NO REFRESH TOKEN");
      return;
    }

    const validRefreshToken = await utils.validateJwt(refreshToken);

    if (!validRefreshToken || Date.now() > validRefreshToken.exp * 1000) {
      res.status(401).json("Unauthorized");
      return;
    }

    const existingUser = await pool.query(
      'SELECT * FROM "user" WHERE user_id = $1',
      [validRefreshToken.sub]
    );

    const accessToken = await utils.issueJWT(existingUser.rows[0]);
    res.status(200).json({
      success: true,
      token: accessToken.token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json("Unauthorized");
  }
});

module.exports = router;
