const router = require("express").Router();
const pool = require("../config/db");
const passport = require("passport");

// Create todo
router.post(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { description } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
      );

      res.json(newTodo.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }
);

// Get all todos
router.get(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");

      res.json(allTodos.rows);
    } catch (err) {
      console.log(err);
    }
  }
);

// Get a todo
router.get(
  "/todos/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
        id,
      ]);

      res.json(todo.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }
);

// Update a todo
router.put(
  "/todos/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updatedTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
        [description, id]
      );

      res.json(updatedTodo.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }
);

// Delete a todo
router.delete(
  "/todos/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTodo = await pool.query(
        "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
        [id]
      );

      res.json(deletedTodo.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
