import express from "express";
import passport from "passport";
import { genPassword } from "../lib/utils.js";
import {
  getUserById,
  updateUserNameAndPassword,
  updateUserName,
} from "../models/user.model.js";
var userRouter = express.Router();

userRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);

      res.status(200).json(user.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(400).json(err.response.data);
    }
  }
);

// Edit a user
userRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.rows[0].user_id; // Id from JWT
      const { id } = req.params; // Id in the route that we want to update
      // Check if the ids match, if not, return a 401 unauthorized
      if (userId == id) {
        const { firstname, lastname, password } = req.body;
        let updatedUser = null;
        // If we have a password in the body, then update the password field
        if (password != undefined) {
          const hashedPassword = await genPassword(password);
          updatedUser = await updateUserNameAndPassword(
            firstname,
            lastname,
            hashedPassword,
            userId
          );
        } else {
          updatedUser = await updateUserName(firstname, lastname, userId);
        }

        res.status(200).json(updatedUser.rows[0]);
      } else {
        res.status(401).json("You are not authorized to update this user");
      }
    } catch (err) {
      console.log(err);
      res.status(400).json("Something went wrong updating user.");
    }
  }
);

export default userRouter;
