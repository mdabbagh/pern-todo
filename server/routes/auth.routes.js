import express from "express";
import {
  validPassword,
  issueJWT,
  genPassword,
  validateJwt,
} from "../lib/utils.js";
import userModel from "../models/user.model.js";

export default function authRoutes(pool) {
  const localUserModel = userModel(pool);

  var authRouter = express.Router();

  async function loginHandler(req, res) {
    try {
      const { email, password } = req.body;

      if (email === "" || password === "") {
        res.status(400).json("Missing email or password.");
      }

      const user = await localUserModel.getUserByEmail(email);

      // Check if user is found, if no then return a 401, otherwise continue
      if (user.rowCount == 0) {
        res.status(401).json("Invalid email or password.");
      } else {
        // Check if password is valid
        const isValid = await validPassword(password, user.rows[0].password);
        if (isValid) {
          // Generate new access and refresh tokens
          const accessToken = await issueJWT(user.rows[0]);
          const refreshToken = await issueJWT(user.rows[0], "1h");

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
  }

  authRouter.post("/login", loginHandler);

  async function registerHandler(req, res) {
    try {
      const { firstname, lastname, email, password } = req.body;

      if (password === "" || email === "") {
        res.status(400).json("Password or email cannot be empty.");
        return;
      }

      // Error handling for email and password
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        res.status(400).json("Invalid email format.");
        return;
      }

      // Check if user exists, if so, send back error
      const existingUser = await localUserModel.getUserByEmail(email);
      if (existingUser.rows.length > 0) {
        res.status(400).json("User already exists.");
        return;
      } else {
        // If user doesn't exist, create new user
        const hashedPassword = await genPassword(password);
        const newUser = await localUserModel.createUser(
          firstname,
          lastname,
          email,
          hashedPassword
        );

        // Generate new access and refresh tokens
        const accessToken = await issueJWT(newUser.rows[0]);
        const refreshToken = await issueJWT(newUser.rows[0], "1h");

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
  }

  authRouter.post("/register", registerHandler);

  async function refreshTokenHandler(req, res) {
    try {
      const refreshToken = req.cookies["refresh_token"];
      if (!refreshToken) {
        res.status(401).json("Missing refresh token.");
        return;
      }

      const validRefreshToken = await validateJwt(refreshToken);
      // TODO: Test this
      if (!validRefreshToken || Date.now() > validRefreshToken.exp * 1000) {
        res.status(401).json("Token expired.");
        return;
      }

      const existingUser = await localUserModel.getUserById(
        validRefreshToken.sub
      );

      const accessToken = await issueJWT(existingUser.rows[0]);
      res.status(200).json({
        success: true,
        token: accessToken.token,
        user: existingUser.rows[0],
      });
    } catch (err) {
      console.log(err);
      res.status(400).json("Unauthorized");
    }
  }

  authRouter.get("/refresh_token", refreshTokenHandler);

  async function logoutHandler(_, res) {
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
  }

  authRouter.get("/logout", logoutHandler);

  const generateRefreshTokenCookieArgs = () => {
    return {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 60 * 24 * 60000), // 24 hours
    };
  };

  return authRouter;
}
