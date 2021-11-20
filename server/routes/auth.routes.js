const pool = require("../config/db");
const router = require("express").Router();
const utils = require("../lib/utils");

router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      res.status(400).json("Missing email or password.");
    }

    const user = await pool.query('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);

    // Check if user is found, if no then return a 401, otherwise continue
    if (user.rowCount == 0) {
      res.status(401).json("Invalid email or password.");
    } else {
      // Check if password is valid
      const isValid = await utils.validPassword(
        password,
        user.rows[0].password
      );
      if (isValid) {
        // Generate new access and refresh tokens
        const accessToken = await utils.issueJWT(user.rows[0]);
        const refreshToken = await utils.issueJWT(user.rows[0], "1h");

        // Remove password field before returning user object
        delete user.rows[0]["password"];

        // Create httpOnly cookie to store the refresh token
        res.cookie(
          "refresh_token",
          refreshToken,
          generateRefreshTokenCookieArgs()
        );

        res.status(200).json({
          user: user.rows[0],
          success: true,
          token: accessToken.token,
          expiresIn: accessToken.expires,
        });
      } else {
        res.status(401).json("Invalid email or password.");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json("Something went wrong.");
  }
});

router.post("/register", async function (req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Error handling for email and password
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      res.status(400).json("Invalid email format.");
    }
    if (password === "") {
      res.status(400).json("Password cannot be empty.");
    }

    // Check if user exists, if so, send back error
    const existingUser = await pool.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );
    if (existingUser.rows.length > 0) {
      res.status(400).json("User already exists.");
    } else {
      // If user doesn't exist, create new user
      const hashedPassword = await utils.genPassword(password);
      const newUser = await pool.query(
        'INSERT INTO "user" (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING user_id, firstname, lastname, email',
        [firstname, lastname, email, hashedPassword]
      );

      // Generate new access and refresh tokens
      const accessToken = await utils.issueJWT(newUser.rows[0]);
      const refreshToken = await utils.issueJWT(newUser.rows[0], "1h");

      // Create httpOnly cookie to store the refresh token
      res.cookie(
        "refresh_token",
        refreshToken,
        generateRefreshTokenCookieArgs()
      );

      // Send response with access token in the body
      res.status(201).json({
        user: newUser.rows[0],
        success: true,
        token: accessToken.token,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json("Something went wrong.");
  }
});

router.get("/refresh_token", async function (req, res) {
  try {
    const refreshToken = req.cookies["refresh_token"];
    if (!refreshToken) {
      res.status(401).json("Missing refresh token.");
      return;
    }

    const validRefreshToken = await utils.validateJwt(refreshToken);
    // TODO: Test this
    if (!validRefreshToken || Date.now() > validRefreshToken.exp * 1000) {
      res.status(401).json("Token expired.");
      return;
    }

    const existingUser = await pool.query(
      'SELECT user_id, firstname, lastname, email FROM "user" WHERE user_id = $1',
      [validRefreshToken.sub]
    );

    const accessToken = await utils.issueJWT(existingUser.rows[0]);
    res.status(200).json({
      success: true,
      token: accessToken.token,
      user: existingUser.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(400).json("Unauthorized");
  }
});

router.get("/logout", async function (req, res) {
  try {
    res.clearCookie("refresh_token");
    // Send response with access token in the body
    res.status(200).json({
      success: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something went wrong logging out.");
  }
});

const generateRefreshTokenCookieArgs = () => {
  return {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 60 * 24 * 60000), // 24 hours
  };
};

module.exports = router;
