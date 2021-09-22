const router = require("express").Router();
const pool = require("../config/db");
const passport = require("passport");

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await pool.query('SELECT * FROM "user" WHERE user_id = $1', [
        id,
      ]);

      res.json(user.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
