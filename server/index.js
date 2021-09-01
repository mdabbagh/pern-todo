const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

/***** Routes *****/
// TODO: Handle unhappy paths
// TODO: Move these to their own folders/files

// Create todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err);
  }
})

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (err) {
    console.log(err);
  }
})

// Get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err);
  }
})

// Update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *", [description, id]);

    res.json(updatedTodo.rows[0]);
  } catch (err) {
    console.log(err);
  }
})

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1 RETURNING *", [id]);

    res.json(deletedTodo.rows[0]);
  } catch (err) {
    console.log(err);
  }
})

app.listen(5000, () => {
  console.log("Server running on port 5000");
});