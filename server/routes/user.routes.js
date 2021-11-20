const router = require("express").Router();
const pool = require("../config/db");
const passport = require("passport");
const utils = require("../lib/utils");

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await pool.query(
        'SELECT user_id, firstname, lastname, email FROM "user" WHERE user_id = $1',
        [id]
      );

      res.status(200).json(user.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(400).json(err.response.data);
    }
  }
);

// Edit a user
router.put(
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
        if (password != undefined) {
          const hashedPassword = await utils.genPassword(password);
          updatedUser = await pool.query(
            'UPDATE "user" SET firstname = $1, lastname = $2, password = $3 WHERE user_id = $4 RETURNING user_id, firstname, lastname, email',
            [firstname, lastname, hashedPassword, userId]
          );
        } else {
          updatedUser = await pool.query(
            'UPDATE "user" SET firstname = $1, lastname = $2 WHERE user_id = $3 RETURNING user_id, firstname, lastname, email',
            [firstname, lastname, userId]
          );
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

module.exports = router;
