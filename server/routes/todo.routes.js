const router = require("express").Router();
const pool = require("../config/db");
const passport = require("passport");

// Create todo
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.rows[0].user_id;
      const { description } = req.body;

      if (description === "") {
        res.status(400).json("Description cannot be empty.");
      }

      const newTodo = await pool.query(
        "INSERT INTO todo (user_id, description) VALUES($1, $2) RETURNING *",
        [userId, description]
      );

      res.status(200).json(newTodo.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(400).json("Something went wrong adding a new todo.");
    }
  }
);

// Get all todos
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.rows[0].user_id;
      const allTodos = await pool.query(
        "SELECT * FROM todo WHERE user_id = $1",
        [userId]
      );

      res.status(200).json(allTodos.rows);
    } catch (err) {
      console.log(err);
      res.status(400).json("Something went wrong getting all todos.");
    }
  }
);

// Get a todo
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.rows[0].user_id;
      const { id } = req.params;
      const todo = await pool.query(
        "SELECT * FROM todo WHERE todo_id = $1 AND user_id = $2",
        [id, userId]
      );

      res.status(200).json(todo.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(400).json("Something went wrong getting todo.");
    }
  }
);

// Update a todo
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.rows[0].user_id;
      const { id } = req.params;
      const { description } = req.body;

      if (description === "") {
        res.status(400).json("Description can't be empty.");
      }

      const updatedTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
        [description, id, userId]
      );

      res.status(200).json(updatedTodo.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(400).json("Something went wrong updating todo.");
    }
  }
);

// Delete a todo
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.rows[0].user_id;
      const { id } = req.params;

      const deletedTodo = await pool.query(
        "DELETE FROM todo WHERE todo_id = $1 AND user_id = $2 RETURNING *",
        [id, userId]
      );

      res.status(200).json(deletedTodo.rows[0]);
    } catch (err) {
      console.log(err);
      res.status(400).json("Something went wrong deleting todo.");
    }
  }
);

module.exports = router;
